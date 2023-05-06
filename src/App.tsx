import { useAccount } from "@starknet-react/core";
import Connect from "./components/Connect";
import Info from "./components/Info";
import TokenForm from "./components/TokenForm";

function App() {
  const { address, isConnected } = useAccount();

  return (
    <div className="App flex flex-col items-center justify-center h-full">
      <h1 className="title text-4xl shadowed mb-8">Le better starknet dapp</h1>

      {isConnected ? (
        <div>
          <p>Hello, {address}</p>
          <Info />
          <TokenForm />
        </div>
      ) : (
        <Connect />
      )}
    </div>
  );
}

export default App;
