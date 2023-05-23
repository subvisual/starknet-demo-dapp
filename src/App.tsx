import { useAccount } from "@starknet-react/core";
import Connect from "./components/Connect";
import Info from "./components/Info";
import TokenForm from "./components/TokenForm";

function App() {
  const { address, isConnected } = useAccount();

  return (
    <div className="h-full p-4 flex flex-col">

      <Info />
      {/* <div className="flex-1 items-center justify-center h-full">
         <h1 className="title text-4xl shadowed mb-8">
          Le better starknet dapp
        </h1> 
        {isConnected ? (
          <>
            <p>Hello, {address}</p>
            <TokenForm />
          </>
        ) : (
          <Connect />
        )}
      </div> */}
    </div>
  );
}

export default App;
