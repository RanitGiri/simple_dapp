import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MetaMaskProvider } from "@metamask/sdk-react";

createRoot(document.getElementById('root')).render(
  <MetaMaskProvider
    debug={true}
    sdkOptions={{
      dappMetadata: {
        name: "MyDapp",
        url: window.location.href,
      },
    }}
  >
    <App />
  </MetaMaskProvider>
)
