import { useConnectors } from "../../../../starknet/starknet-react/packages/core/src";

export default function Connect() {
  const { connect, connectors } = useConnectors();

  return (
    <div className="flex justify-center">
      {connectors.map((connector) => (
        <button
          className="btn"
          onClick={() => connect(connector)}
          key={connector.id()}
        >
          Connect {connector.id()}
        </button>
      ))}
    </div>
  );
}
