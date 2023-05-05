import { useBlock } from "@starknet-react/core";

export default function Info() {
  const { data } = useBlock({
    refetchInterval: 10_000,
    blockIdentifier: "latest"
  });

  return (
    <div className="info">
      <p>
        Current block: {data?.block_number}, {data?.transactions.length} txs
      </p>
    </div>
  );
}
