import { useConnectors } from "@starknet-react/core";

export default function Connect() {
  const { connect, connectors } = useConnectors();

  return (
    <div className="connector-row">
      {connectors.map((connector) => (
        <button onClick={() => connect(connector)} key={connector.id()}>
          Connect {connector.id()}
        </button>
      ))}
    </div>
  );
}
