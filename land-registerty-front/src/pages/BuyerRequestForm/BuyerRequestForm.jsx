// src/components/BuyerRequestForm.jsx
import React, { useState } from "react";
import {
  ShoppingBag,
  DollarSign,
  MapPin,
  Loader2,
  Zap,
  AlertTriangle,
  CheckCircle,
  Wallet,
  Send,
} from "lucide-react";
import "./BuyerRequestForm.css";

// --- CONSTANTS ---
const PLUTUS_CONTRACT_ADDRESS = "addr_test1qr4...[MOCK_CONTRACT_ADDRESS]...v6420";
const REQUIRED_ADA_DEPOSIT = 5;

const BuyerRequestForm = () => {
  const [formData, setFormData] = useState({
    assetType: "",
    maxPrice: "",
    location: "",
    notes: "",
  });
  const [walletApi, setWalletApi] = useState(null);
  const [walletName, setWalletName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: null, text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Connect Wallet (Mock) ---
  const connectWallet = async () => {
    setStatusMessage({ type: "info", text: "Connecting to wallet..." });
    const cardano = window.cardano;

    if (cardano && cardano.nami) {
      try {
        const api = { enable: true }; // Mock API
        setWalletApi(api);
        setWalletName("Nami");
        setStatusMessage({ type: "success", text: "Wallet connected successfully!" });
      } catch {
        setStatusMessage({
          type: "error",
          text: "Connection failed. Ensure wallet is installed and unlocked.",
        });
      }
    } else {
      const api = { enable: true }; // Mock fallback
      setWalletApi(api);
      setWalletName("MockWallet");
      setStatusMessage({
        type: "info",
        text: "No Cardano wallet detected. Using mock wallet for testing.",
      });
    }
  };

  // --- Mock Submit Transaction ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!walletApi) return setStatusMessage({ type: "error", text: "Please connect your wallet first." });
    if (!formData.assetType || !formData.maxPrice)
      return setStatusMessage({ type: "error", text: "Asset Type and Max Price are required." });

    setLoading(true);
    setStatusMessage({ type: "info", text: "Preparing transaction for smart contract..." });

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const mockTxHash = `TxHash_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
      setStatusMessage({
        type: "success",
        text: `Request submitted successfully! Tx Hash: ${mockTxHash.substring(0, 20)}...`,
      });
      setFormData({ assetType: "", maxPrice: "", location: "", notes: "" });
    } catch (error) {
      setStatusMessage({ type: "error", text: `Transaction failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  // --- Status Alert ---
  const StatusAlert = ({ type, text }) => {
    if (!text) return null;
    const icons = {
      success: <CheckCircle className="icon" />,
      error: <AlertTriangle className="icon" />,
      info: <Zap className="icon" />,
    };
    return <div className={`status-alert ${type}`}>{icons[type]}<span>{text}</span></div>;
  };

  return (
    <div className="buyer-container">
      <div className="buyer-card">
        <h2 className="buyer-title">
          <ShoppingBag className="icon blue" />
          Submit Buyer Request
        </h2>
        <p className="buyer-subtitle">
          Lock your request on-chain via our Plutus Smart Contract.
          <strong> {REQUIRED_ADA_DEPOSIT} ADA </strong> deposit required.
        </p>

        <StatusAlert type={statusMessage.type} text={statusMessage.text} />

        {/* Wallet Section */}
        <div className="wallet-box">
          <span className="wallet-label">
            <Wallet className="icon" />
            Wallet Status:
          </span>
          {walletApi ? (
            <span className="wallet-connected">Connected ({walletName})</span>
          ) : (
            <button className="wallet-btn" onClick={connectWallet}>
              <Wallet className="icon" />
              Connect Wallet
            </button>
          )}
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="buyer-form">
          <div className="form-group">
            <label>Asset Type</label>
            <div className="input-wrapper">
              <ShoppingBag className="input-icon" />
              <input
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
                placeholder="e.g., Land Title 12345"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Maximum ADA Price</label>
            <div className="input-wrapper">
              <DollarSign className="input-icon" />
              <input
                name="maxPrice"
                type="number"
                value={formData.maxPrice}
                onChange={handleChange}
                placeholder="e.g., 5000 ADA"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Location</label>
            <div className="input-wrapper">
              <MapPin className="input-icon" />
              <textarea
                name="location"
                rows="2"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., near water or specific zone"
              ></textarea>
            </div>
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Specify closing date or details..."
            ></textarea>
          </div>

          <button
            type="submit"
            className={`submit-btn ${loading || !walletApi ? "disabled" : ""}`}
            disabled={loading || !walletApi}
          >
            {loading ? <Loader2 className="icon spin" /> : <Send className="icon" />}
            {loading ? "Submitting to Cardano..." : "Submit Request"}
          </button>

          <p className="contract-info">
            Smart Contract Address:{" "}
            <span className="address">{PLUTUS_CONTRACT_ADDRESS}</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default BuyerRequestForm;
