import React, { useState } from "react";
import { Lucid, Blockfrost } from "lucid-cardano";

const WalletAuth = () => {
  const [address, setAddress] = useState("");

  // Step 1: Connect wallet
  const connectWallet = async () => {
    if (!window.cardano || !window.cardano.nami) {
      alert("Please install Nami Wallet!");
      return;
    }

    try {
      // Enable the Nami wallet
      const nami = await window.cardano.nami.enable();

      // Initialize Lucid
      const lucidInstance = await Lucid.new(
        new Blockfrost(
          "https://preprod.blockfrost.io/api/v0",
          "preprod443jkAmQROr3kEezCh1N3tvhbB9qFo0X"
        ),
        "Preprod"
      );

      lucidInstance.selectWallet(nami);

      // Get user address
      const userAddress = await lucidInstance.wallet.address();
      setAddress(userAddress);

      console.log("Wallet connected:", userAddress);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        margin: "50px auto",
        maxWidth: "400px",
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Cardano Wallet Authentication</h2>
      {address ? (
        <p style={{ wordBreak: "break-all", margin: "20px 0" }}>
          Connected Address: {address}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#3b82f6",
            color: "#fff",
          }}
        >
          Connect Nami Wallet
        </button>
      )}
    </div>
  );
};

export default WalletAuth;
