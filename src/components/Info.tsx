import { useAccount, useConnectors, useStarkName } from "@starknet-react/core";
import Sign from "./Sign";
import { useState } from "react";

export default function Info() {
  const [showSign, setShowSign] = useState(false);

  const { disconnect } = useConnectors();
  const { address, isConnected } = useAccount();
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
        <button type="button" onClick={() => setShowSign(!showSign)}>
          Sign a message
        </button>
        <button type="button" onClick={disconnect} className="font-bold">
          Disconnect
        </button>
      </div>
      <Sign />
    </>
  );
}
