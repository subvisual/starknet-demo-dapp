import { useBlock, useNetwork } from "@starknet-react/core";

export default function NetworkInfo() {
  const { data } = useBlock({
    refetchInterval: 10_000,
    blockIdentifier: "latest",
  });
  const { chain } = useNetwork();

  return (
    <div className="absolute bottom-4 left-4 flex gap-8">
      {chain && <p>Connected to {chain.name}</p>}
      <p>
        Current block: {data?.block_number}, {data?.transactions.length}{" "}
        transactions
      </p>
    </div>
  );
}
