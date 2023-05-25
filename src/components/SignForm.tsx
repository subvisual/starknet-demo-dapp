import { useAccount, useNetwork, useSignTypedData } from "@starknet-react/core";
import { FormEvent, useState } from "react";
import { shortString, typedData } from "starknet";

export default function SignForm() {
  const [showSign, setShowSign] = useState(false);
  const [message, setMessage] = useState("The message");

  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  // Signed message must follow EIP712
  // https://www.starknetjs.com/docs/guides/signature
  const typedMessage: typedData.TypedData = {
    types: {
      StarkNetDomain: [
        { name: "name", type: "felt" },
        { name: "version", type: "felt" },
        { name: "chainId", type: "felt" },
      ],
      Message: [{ name: "message", type: "felt" }],
    },
    primaryType: "Message",
    domain: {
      name: "Starknet demo app",
      version: "1",
      chainId: shortString.decodeShortString(chain?.id as string),
    },
    message: {
      message,
    },
  };

  // Hook returns function to trigger signature and signed message
  const { data, signTypedData } = useSignTypedData(typedMessage);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    signTypedData();
  }

  if (!isConnected) {
    return null;
  }

  return (
    <div className="ml-auto">
      <button type="button" onClick={() => setShowSign(!showSign)}>
        Sign a message
      </button>
      {showSign && (
        <div className="w-64 px-8 py-6 absolute top-20 right-4 bg-offblack border border-offwhite box-shadow">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              placeholder="Sign this"
              defaultValue={message}
              required
              onChange={(evt) => setMessage(evt.target.value)}
            />
            <button type="submit" className="btn">
              Sign
            </button>
            <button
              type="button"
              className="underline"
              onClick={() => setShowSign(!showSign)}
            >
              Close
            </button>
            {data && (
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(data)}
              </pre>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
