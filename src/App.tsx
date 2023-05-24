import { useAccount } from "@starknet-react/core";
import Connect from "./components/Connect";
import Info from "./components/Info";
import SignForm from "./components/SignForm";
import TokenForm from "./components/TokenForm";

function App() {
  const { isConnected, address } = useAccount();

  return (
    <div className="h-full p-4 flex flex-col">
      <Info />
      <SignForm />

      <div className="flex-1 flex items-center text-center justify-center h-full">
        {isConnected ? (
          <div>
            <h1 className="title text-4xl shadowed mb-8">
              Demo starknet dapp
            </h1>
            <p>Hello, {address}</p>
            <TokenForm />
          </div>
        ) : (
          <Connect />
        )}
      </div>
    </div>
  );
}

export default App;
