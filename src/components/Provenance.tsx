import { truncate } from "../lib/utils";

export default function Provenance({
  asset,
  close,
}: {
  asset: Asset;
  close: () => void;
}) {
  const mintedAt = asset.transfers[0].transaction.timestamp;

  return (
    <section className="text-left w-[300px] h-fit border border-white p-4">
      <h2 className="font-bold text-2xl mb-4">Asset {asset.assetId}</h2>

      <p>Minted by {truncate(asset.minter.address)}</p>
      <p className="text-sm">
        {new Date(mintedAt * 1000).toLocaleDateString()}
      </p>

      {asset.transfers.slice(1).map((tr, ind) => (
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
