import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";

export default function ConnectToMetaMask() {
  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <div className="App">
      <button
        className="bg-blue-500 shadow-md text-white rounded-full px-8 py-2 hover:bg-blue-700 active:bg-blue-900"
        onClick={connect}
      >
        Connect to MetaMask
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </div>
  );
}