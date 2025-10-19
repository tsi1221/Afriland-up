import React, { useState } from "react";

function Connectwallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("Welcome to my dApp!");
  const [signature, setSignature] = useState("");

  const connectWallet = async () => {
    try {
      if (!window.cardano || !window.cardano.nami) {
        alert("Please install Nami Wallet first!");
        return;
      }

      // 1️⃣ Enable wallet connection
      const nami = await window.cardano.nami.enable();

      // 2️⃣ Get user's used addresses (array of hex)
      const usedAddresses = await nami.getUsedAddresses();
      const firstAddr = usedAddresses[0];

      setWalletAddress(firstAddr);
      alert("Wallet connected!");
    } catch (err) {
      console.error(err);
      alert("Error connecting wallet");
    }
  };

  const signMessage = async () => {
    try {
      if (!walletAddress) {
        alert("Connect your wallet first!");
        return;
      }

      const nami = await window.cardano.nami.enable();
      const msgHex = Array.from(message, c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');

      // 3️⃣ Ask wallet to sign the message
      const signed = await nami.signData(walletAddress, msgHex);

      console.log("Signed data:", signed);
      setSignature(signed.signature);
      alert("Message signed successfully!");
    } catch (err) {
      console.error(err);
      alert("Error signing message");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>🔐 Connect Wallet Demo</h2>
      <button onClick={connectWallet}>Connect Nami Wallet</button>

      {walletAddress && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Wallet Address:</strong> {walletAddress}</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            cols={40}
          />
          <br />
          <button onClick={signMessage}>Sign Message</button>

          {signature && (
            <>
              <p><strong>Signature:</strong> {signature}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Connectwallet;
