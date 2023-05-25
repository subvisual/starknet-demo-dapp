import {
  useAccount,
  useBalance,
  useContractWrite,
} from "@starknet-react/core";
import { FormEvent, useMemo, useState } from "react";
import { uint256, stark } from "starknet";
import {  truncate } from "../lib/utils";
import { parseFixed } from "@ethersproject/bignumber";

// ERC20 token
const CONTRACT_ADDRESS =
  "0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10";

export default function TokenForm() {
  const { address } = useAccount();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  // Convenience hook for getting
  // formatted ERC20 balance
  const { data: balance } = useBalance({
    address,
    token: CONTRACT_ADDRESS,
    // watch: true <- refresh at every block
  });

  /* 
  For other read functions, we can use this:
  const { data: balance } = useContractRead({
    abi: abi_erc20,
    address: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [address],
  }); 
  */

  const calls = useMemo(() => {
    if (!amount || !to) return;

    // format the amount from a string into a Uint256
    const amountFormatted = {
      type: "struct",
      ...uint256.bnToUint256(parseFixed(amount, 18).toString()),
    } as const;

    // compile the calldata to send
    const calldata = stark.compileCalldata({
      recipient: to,
      amount: amountFormatted,
    });

    // return a single object for single transaction,
    // or an array of objects for multicall
    return {
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: "transfer",
      calldata,
    };
  }, [to, amount]);

  // Hook returns function to trigger transaction
  // and state of tx after being sent
  const { write, isLoading, data } = useContractWrite({
    calls,
  });

  async function send(event: FormEvent) {
    event.preventDefault();
    write();
  }

  /* 
  This also works - it creates a single instance of the
  contract, and you can directly call methods on it:
  
  const { contract } = useContract({
    address: CONTRACT_ADDRESS,
    abi: abi_erc20,
  });
  contract.transfer(...)
  */

  return (
    <div className=" my-8 px-8 py-6 bg-offblack border border-offwhite box-shadow text-center max-w-[600px] mx-auto">
      <h3 className="text-md font-bold">
        ERC29 token{" "}
        <a
          href="https://goerli.voyager.online/contract/0x07394cbe418daa16e42b87ba67372d4ab4a5df0b05c6e554d158458ce245bc10"
          target="_blank"
          referrerPolicy="no-referrer"
          className="underline"
        >
          {truncate(CONTRACT_ADDRESS)} ↗
        </a>
      </h3>
      <strong>
        Balance: {balance?.formatted} {balance?.symbol}
      </strong>
      <form onSubmit={send} className="flex flex-col gap-4 my-4">
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
        <button type="submit" className="btn">
          Send
        </button>
      </form>
      {isLoading && <p>tx pending...</p>}
      {data && <p>Tx: {data.transaction_hash}</p>}
    </div>
  );
}
