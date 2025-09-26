import "./App.css";
import ConnectToMetaMask from "./components/ConnectToMetaMask";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { useSDK } from "@metamask/sdk-react";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { provider, connected } = useSDK();

  const contractAddress = "0xE216d5139B8ffcDbe3895c4efc8285d6F5cB8348";

  const abi = [
    {
      inputs: [{ internalType: "string", name: "_message", type: "string" }],
      name: "createMessage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_owner", type: "address" }],
      name: "getMessage",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "messages",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  useEffect(() => {
    if (!provider || !connected) return;
    const initWeb3 = async () => {
      
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);
        const contractInstance = new web3Instance.eth.Contract(
          abi,
          contractAddress
        );
        setContract(contractInstance);
        provider.on("accountsChanged", (accs) => setAccounts(accs));
        provider.on("chainChanged", () => window.location.reload());
      
    };

    initWeb3();
  }, [provider, connected]);

  const sendMessage = async () => {
    if (!contract || accounts.length === 0) return alert("Connect wallet first!");
    await contract.methods
      .createMessage(String(messageValue))
      .send({ from: accounts[0] });
    setMessageValue("");

    console.log("Message Sent", messageValue);
  };

  const getMessage = async () => {
    if (!contract || accounts.length === 0) return;
    const message = await contract.methods.getMessage(accounts[0]).call();
    console.log("Message Received", message);
    setMessage(message);
  };

  /**return (
    <div className="p-10">
      <ConnectToMetaMask />
      <div className="my-4">
        <input
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          className="bg-gray-100 px-2 py-2 rounded-md shadow-md"
          type="text"
          placeholder="Enter Message Here..."
        />
        <button
          onClick={sendMessage}
          className="bg-red-500 p-2 rounded-md text-white shadow-md ml-2 active:scale-90 transition"
        >
          Create
        </button>
      </div>
      <button
        onClick={getMessage}
        className="bg-blue-500 p-2 rounded-md text-white shadow-md ml-2 active:scale-90 transition"
      >
        Get Message
      </button>
      {message}
    </div>
  ); */

  return (
  
          <div className="container">
              <ConnectToMetaMask />

          <div className="input-section">
          <input
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              type="text"
              placeholder="Enter Your Message Here..."
              className="custom-input"
          />

          <button onClick={sendMessage} className="btn btn-create">
          Create Message
          </button>
         </div>

         <button onClick={getMessage} className="btn btn-get">
         Retrieve Message
        </button>

        <div className="message-box">{message}</div>
       </div>
  
);

}

export default App;