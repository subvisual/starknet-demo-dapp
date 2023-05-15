import { truncate } from "../lib/utils";

export default function Provenance({
  asset,
  close,
}: {
  asset: Asset;
  close: () => void;
}) {
  const sorted = asset.transfers.sort((a, b) =>
    a.transaction.timestamp > b.transaction.timestamp ? 1 : -1
  );

  return (
    <section className="text-left w-[300px] h-fit border border-white p-4">
      <h2 className="font-bold text-2xl mb-4">Asset {asset.assetId}</h2>

      <p>Minted by {truncate(asset.minter.address)}</p>
      <p className="text-sm">
        {new Date(
          sorted?.[0].transaction.timestamp * 1000
        ).toLocaleDateString()}
      </p>

      {sorted.slice(1).map((tr, ind) => (
        <div key={ind} className="my-2">
          <p>Transferred to {truncate(tr.to.address)}</p>
          <p className="text-sm">
            {new Date(tr.transaction.timestamp * 1000).toLocaleDateString()}
          </p>
        </div>
      ))}
      <button type="button" onClick={close} className="font-bold mt-4">
        close
      </button>
    </section>
  );
}
