import { useBlock } from "@starknet-react/core";

export default function Info() {
  const { data } = useBlock({
    refetchInterval: 10_000,
    blockIdentifier: "latest"
  });

  return (
    <div className="absolute bottom-4 left-0 right-0 m-auto text-center">
      <p>
        Current block: {data?.block_number}, {data?.transactions.length} txs
      </p>
    </div>
  );
}
