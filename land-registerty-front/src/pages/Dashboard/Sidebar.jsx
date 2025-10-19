import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.css";
import RegisterLandButton from "../Registerland/Registerlandbutton";

// --- Icons ---
const Wallet = () => <i className="afri-icon">👛</i>;
const LogOut = () => <i className="afri-icon">🚪</i>;
const ListChecks = () => <i className="afri-icon">📋</i>;
const DollarSign = () => <i className="afri-icon">💰</i>;

const Sidebar = () => {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState({ email: "", walletAddress: "" });
  const [lands, setLands] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Watch for token changes
  useEffect(() => {
    const checkTokenChange = () => {
      const newToken = localStorage.getItem("token");
      if (newToken !== token) setToken(newToken || "");
    };
    window.addEventListener("storage", checkTokenChange);
    return () => window.removeEventListener("storage", checkTokenChange);
  }, [token]);

  // Decode token
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          email: payload.email || "user@example.com",
          walletAddress: payload.walletAddress || "addr_test...",
        });
      } catch {
        setUser({ email: "", walletAddress: "" });
      }
    } else setUser({ email: "", walletAddress: "" });
  }, [token]);

  // Fetch data
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [landsRes, txRes] = await Promise.all([
          axios.get("http://localhost:5000/api/lands", config),
          axios.get("http://localhost:5000/api/transactions", config),
        ]);
        setLands(landsRes.data);
        setTransactions(txRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    window.location.href = "/";
  };

  return (
    <div className="afri-dashboard-full">
      <header className="afri-header-full">
        <h3>Dashboard Overview</h3>
        <div className="afri-header-actions-full">
          {!connected ? (
            <button className="afri-connect-btn-full" onClick={() => setConnected(true)}>
              <Wallet /> Connect Wallet
            </button>
          ) : (
            <span className="afri-connected-full">Wallet Connected</span>
          )}
          <button className="afri-logout-btn-full" onClick={handleLogout}>
            <LogOut /> Logout
          </button>
        </div>
      </header>

      <main className="afri-content-full">
        <section className="afri-user-profile-full">
          <h2>Welcome, {user.email || "Guest"}</h2>
          <p>
            <strong>Wallet Address:</strong> {user.walletAddress || "Not Connected"}
          </p>
        </section>

        <section className="afri-stats-section-full">
          <h2>Key Metrics</h2>
          <div className="afri-stats-full">
            <div className="afri-stat-card-full">
              <p className="afri-stat-name-full">Properties Owned</p>
              <h3>{lands.length}</h3>
              <span>plots</span>
            </div>
            <div className="afri-stat-card-full">
              <p className="afri-stat-name-full">Pending Approvals</p>
              <h3>{lands.filter((l) => l.status === "Pending").length}</h3>
              <span>items</span>
            </div>
            <div className="afri-stat-card-full">
              <p className="afri-stat-name-full">Transactions</p>
              <h3>{transactions.length}</h3>
              <span>records</span>
            </div>
          </div>
        </section>

        <div className="afri-dashboard-sections-full">
          <div className="afri-activity-full">
            <h3>Recent Transactions</h3>
            {loading ? (
              <p>Loading...</p>
            ) : transactions.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              transactions.map((tx) => (
                <div
                  key={tx._id}
                  className={`afri-activity-item-full ${
                    tx.status === "Completed" ? "completed" : "pending"
                  }`}
                >
                  <div>
                    <strong>
                      {tx.type}: {tx.property}
                    </strong>
                    <p>{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                  <span className="status">{tx.status}</span>
                  <span className="amount">{tx.amount} ADA</span>
                </div>
              ))
            )}
          </div>

          <div className="afri-actions-full">
            <h3>Quick Actions</h3>
            <RegisterLandButton
              onSuccess={() => {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                axios.get("http://localhost:5000/api/lands", config).then((res) => setLands(res.data));
              }}
            />
            <a href="/landlist">
              <button className="afri-btn-full yellow">
                <DollarSign /> List Property for Sale
              </button>
            </a>
            <a href="/buyerrequiest">
              <button className="afri-btn-full gray">
                <ListChecks /> Check Verifications
              </button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
