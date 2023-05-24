import { useAccount, useConnectors, useStarkName } from "@starknet-react/core";

export default function Info() {
  const { disconnect } = useConnectors();
  const { address, isConnected } = useAccount();

  // Uses the Starknet.id contract by default, 
  // but a different contract can be specified
  // To do the reverse operation (get address from stark name)
  // you can use the useAddressFromStarkName hook
  const { data: starkName } = useStarkName({
    address: address || "",
  });  

  const truncated = `${address?.substring(0, 6)}...${address?.slice(-2)}`;

  if (!isConnected) {
    return null;
  }

  return (
    <>
      <div className="flex gap-8 align-baseline">
        <p className="underline">{starkName || truncated}</p>
        <button type="button" onClick={disconnect} className="font-bold">
          Disconnect
        </button>
      </div>
    </>
  );
}
