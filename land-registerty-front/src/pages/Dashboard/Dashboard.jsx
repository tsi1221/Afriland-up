import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import logo from "../../assets/image.png";
import RegisterLandButton from "../Registerland/Registerlandbutton";
import LandList from "../Landlist/Landlist";
import LandlistB from "../BuyersSide/LandlistB";

import Buyerrequiest from "../Buyerrequies/Buyerrequiest";
// --- Icons ---
const Home = () => <i className="afri-icon">🏠</i>;
const Map = () => <i className="afri-icon">🗺️</i>;
const Settings = () => <i className="afri-icon">⚙️</i>;
const ListChecks = () => <i className="afri-icon">📋</i>;
const DollarSign = () => <i className="afri-icon">💰</i>;
const Wallet = () => <i className="afri-icon">👛</i>;
const LogOut = () => <i className="afri-icon">🚪</i>;
const MenuIcon = () => <i className="afri-icon">☰</i>;
const CloseIcon = () => <i className="afri-icon">✕</i>;
const LandRequest = () => <i className="afri-icon">🏗️</i>;

// Sidebar navigation items
const navItems = [
  { name: "Overview", icon: Home, page: "overview" },
  { name: "My Properties", icon: Map, page: "landlist" },
  { name: "Land Requested", icon: LandRequest, page: "landrequest" },
  { name: "Transactions", icon: ListChecks, page: "buyerrequiest" },
  { name: "Settings", icon: Settings, page: "settings" },
];

const Dashboard = () => {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState({ email: "", walletAddress: "" });
  const [lands, setLands] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [activePage, setActivePage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleNavClick = (page) => {
    setActivePage(page);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Render main content based on activePage
  const renderMainContent = () => {
    switch (activePage) {
      case "overview":
        return (
          <div className="dashboard-overview">
            <section className="user-welcome">
              <h2>Welcome, {user.email || "Guest"}</h2>
              <p>
                <strong>Wallet Address:</strong> {user.walletAddress || "Not Connected"}
              </p>
            </section>

            <section className="metrics-section">
              <h2>Key Metrics</h2>
              <div className="metrics-grid">
                <div className="metric-card">
                  <p className="metric-name">Properties Owned</p>
                  <h3>{lands.length}</h3>
                  <span>plots</span>
                </div>
                <div className="metric-card">
                  <p className="metric-name">Pending Approvals</p>
                  <h3>{lands.filter((l) => l.status === "Pending").length}</h3>
                  <span>items</span>
                </div>
                <div className="metric-card">
                  <p className="metric-name">Transactions</p>
                  <h3>{transactions.length}</h3>
                  <span>records</span>
                </div>
              </div>
            </section>

            <div className="dashboard-content-grid">
              <div className="activity-section">
                <h3>Recent Transactions</h3>
                <div className="activity-list">
                  {loading ? (
                    <p>Loading...</p>
                  ) : transactions.length === 0 ? (
                    <p>No transactions found.</p>
                  ) : (
                    transactions.map((tx) => (
                      <div
                        key={tx._id}
                        className={`activity-item ${
                          tx.status === "Completed" ? "completed" : "pending"
                        }`}
                      >
                        <div className="activity-details">
                          <strong>
                            {tx.type}: {tx.property}
                          </strong>
                          <p>{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                        <div className="activity-meta">
                          <span className="status">{tx.status}</span>
                          <span className="amount">{tx.amount} ADA</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="actions-section">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  <RegisterLandButton
                    onSuccess={() => {
                      const config = { headers: { Authorization: `Bearer ${token}` } };
                      axios.get("http://localhost:5000/api/lands", config).then((res) => setLands(res.data));
                    }}
                  />
                  <button className="action-btn secondary">
                    <DollarSign /> List Property for Sale
                  </button>
                  <button className="action-btn tertiary">
                    <ListChecks /> Check Verifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "landlist":
        return (
          <div className="page-content-wrapper">
            <LandList/>
          </div>
        );
      case "landrequest":
        return (
          <div className="page-content-wrapper">
            <div className="land-request-redirect">
              <div className="redirect-content">
                <h2>Land Request Management</h2>
                <p>You are being redirected to the land request management page...</p>
                <div className="redirect-actions">
                  <button 
                    className="primary-btn"
                    onClick={() => window.location.href = "/buyerrequestform"}
                  >
                    Continue to Land Request Form
                  </button>
                  <button 
                    className="secondary-btn"
                    onClick={() => setActivePage("overview")}
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "buyerrequiest":
        return (
          <div className="page-content-wrapper">
            <Buyerrequiest />
          </div>
        );
      case "settings":
        return (
          <div className="page-content-wrapper">
            <div className="settings-page">
              <h2>Settings</h2>
              <p>Settings page coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="page-content-wrapper">
            <div className="page-not-found">
              <h2>Page Not Found</h2>
              <p>The requested page does not exist.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Header */}
      {isMobile && (
        <div className="mobile-header">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <div className="mobile-title">
            {navItems.find((i) => i.page === activePage)?.name || "Dashboard"}
          </div>
          <button className="logout-btn mobile" onClick={handleLogout}>
            <LogOut />
          </button>
        </div>
      )}

      {/* Sidebar Overlay for Mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} className="sidebar-logo" alt="Afriland Logo" />
          <h2>Afriland</h2>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activePage === item.page ? "active" : ""}`}
              onClick={() => handleNavClick(item.page)}
            >
              <item.icon /> 
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <p className="user-email">
              <strong>Email:</strong> {user.email || "Not Logged In"}
            </p>
            <p className="user-wallet">
              <strong>Wallet:</strong> {user.walletAddress || "Not Connected"}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${isMobile ? 'mobile' : ''}`}>
        {!isMobile && (
          <header className="content-header">
            <h1>{navItems.find((i) => i.page === activePage)?.name || "Dashboard"}</h1>
            <div className="header-actions">
              {!connected ? (
                <button className="connect-wallet-btn" onClick={() => setConnected(true)}>
                  <Wallet /> Connect Wallet
                </button>
              ) : (
                <span className="wallet-connected">Wallet Connected</span>
              )}
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut /> Logout
              </button>
            </div>
          </header>
        )}

        <div className="content-area">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;