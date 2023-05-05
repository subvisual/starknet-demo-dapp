import {
  useAccount,
  useContractRead,
  useContractWrite,
} from "@starknet-react/core";
import abi_erc20 from "../lib/abi_erc20";
import { FormEvent, useMemo, useState } from "react";
import { uint256, stark } from "starknet";
import { format } from "../lib/utils";
import { parseFixed } from "@ethersproject/bignumber";

const CONTRACT_ADDRESS =
  "0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10";

export default function TokenForm() {
  const { address } = useAccount();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const { data: balance } = useContractRead({
    abi: abi_erc20,
    address: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [address],
    // watch: false <- refresh at every block
  });

  const calls = useMemo(() => {
    if (!amount || !to) return;

    const amountFormatted = {
      type: "struct" as const,
      ...uint256.bnToUint256(parseFixed(amount, 18).toString()),
    };

    const calldata = stark.compileCalldata({
      recipient: to,
      amount: amountFormatted,
    });

    return {
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: "transfer",
      calldata,
    };
  }, [address, to, amount]);

  const { write, isLoading, data } = useContractWrite({
    calls,
  });

  async function send(event: FormEvent) {
    event.preventDefault();
    write();
  }

  /* 
  This also works:
  const { contract } = useContract({
    address: CONTRACT_ADDRESS,
    abi: abi_erc20,
  });
  contract.transfer(...)  
  */

  return (
    <div className="token-section">
      <h3>USDC (wink wink)</h3>
      <strong>Balance: {format(balance, "balance", 18) || "..."}</strong>
      <form onSubmit={send}>
        <input
          type="text"
          name="to"
          placeholder="Recipient"
          required
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          required
          step="any"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <p>{isLoading && "tx pending..."}</p>
      <p>{data && data.transaction_hash}</p>
    </div>
  );
}
