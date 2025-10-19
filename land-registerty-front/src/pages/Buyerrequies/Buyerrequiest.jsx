import React, { useState, useMemo } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  DollarSign,
  FileText,
  BarChart,
  Zap,
  Eye,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Download,
  Calendar
} from "lucide-react";
import "./Buyerrequiest.css";

// --- MOCK DATA ---
const mockBuyerRequests = [
  { id: "req_001", buyerName: "Alice Johnson", landRequested: "Residential Plot ID: P129", maxPrice: 8500, documentCount: 5, verificationStatus: "Pending Review", date: "2024-01-15", location: "Nairobi" },
  { id: "req_002", buyerName: "Bob Smith", landRequested: "Farm Land Zone F", maxPrice: 12000, documentCount: 7, verificationStatus: "Verified", date: "2024-01-14", location: "Accra" },
  { id: "req_003", buyerName: "Charity Kweli", landRequested: "Commercial Land - Lot C", maxPrice: 25000, documentCount: 2, verificationStatus: "Rejected", date: "2024-01-13", location: "Lagos" },
  { id: "req_004", buyerName: "David Miller", landRequested: "Industrial Plot Zone 3", maxPrice: 40000, documentCount: 4, verificationStatus: "Pending Review", date: "2024-01-12", location: "Cape Town" },
  { id: "req_005", buyerName: "Evelyn Parker", landRequested: "Residential Plot ID: P131", maxPrice: 9500, documentCount: 3, verificationStatus: "Verified", date: "2024-01-11", location: "Nairobi" },
  { id: "req_006", buyerName: "Franklin Tate", landRequested: "Commercial Lot - Lot D", maxPrice: 30000, documentCount: 6, verificationStatus: "Pending Review", date: "2024-01-10", location: "Accra" },
  { id: "req_007", buyerName: "Grace Li", landRequested: "Farm Land Zone B", maxPrice: 18000, documentCount: 5, verificationStatus: "Rejected", date: "2024-01-09", location: "Lagos" },
  { id: "req_008", buyerName: "Hannah Lee", landRequested: "Residential Plot ID: P140", maxPrice: 15000, documentCount: 4, verificationStatus: "Pending Review", date: "2024-01-08", location: "Cape Town" },
  { id: "req_009", buyerName: "Ian Wong", landRequested: "Industrial Plot Zone 5", maxPrice: 42000, documentCount: 3, verificationStatus: "Verified", date: "2024-01-07", location: "Nairobi" },
];

// --- Status Pill Component ---
const StatusPill = ({ status }) => {
  let colorClass = "pill-default";
  let Icon = Zap;

  switch (status) {
    case "Verified": 
      colorClass = "pill-verified"; 
      Icon = CheckCircle; 
      break;
    case "Rejected": 
      colorClass = "pill-rejected"; 
      Icon = XCircle; 
      break;
    case "Pending Review": 
      colorClass = "pill-pending"; 
      Icon = FileText; 
      break;
    default: break;
  }

  return (
    <span className={`status-pill ${colorClass}`}>
      <Icon className="pill-icon" size={14} />
      {status}
    </span>
  );
};

// --- Request Card for Mobile ---
const RequestCard = ({ request, handleAction, handleViewDocs }) => (
  <div className="request-card">
    <div className="card-header">
      <div className="card-title-section">
        <h3>{request.landRequested}</h3>
        <span className="location-badge">{request.location}</span>
      </div>
      <StatusPill status={request.verificationStatus} />
    </div>
    
    <div className="card-content">
      <div className="info-grid">
        <div className="info-item">
          <Users size={16} />
          <span className="label">Buyer:</span>
          <span className="value">{request.buyerName}</span>
        </div>
        <div className="info-item">
          <DollarSign size={16} />
          <span className="label">Price:</span>
          <span className="value price">{request.maxPrice.toLocaleString()} ADA</span>
        </div>
        <div className="info-item">
          <FileText size={16} />
          <span className="label">Documents:</span>
          <span className="value">{request.documentCount} files</span>
        </div>
        <div className="info-item">
          <Calendar size={16} />
          <span className="label">Date:</span>
          <span className="value">{new Date(request.date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>

    <div className="card-actions">
      <button 
        className="btn view-docs"
        onClick={() => handleViewDocs(request)}
      >
        <Eye size={16} />
        View Documents
      </button>
      <div className="action-buttons">
        <button 
          onClick={() => handleAction(request.id, "Verify")} 
          className="btn verify"
          disabled={request.verificationStatus === "Verified"}
        >
          <CheckCircle size={16} />
          Verify
        </button>
        <button 
          onClick={() => handleAction(request.id, "Reject")} 
          className="btn reject"
          disabled={request.verificationStatus === "Rejected"}
        >
          <XCircle size={16} />
          Reject
        </button>
      </div>
    </div>
  </div>
);

// --- Filter Component ---
const FilterDropdown = ({ filters, setFilters, isFilterOpen, setIsFilterOpen }) => (
  <div className={`filter-dropdown ${isFilterOpen ? 'open' : ''}`}>
    <div className="filter-section">
      <label>Status</label>
      <select 
        value={filters.status} 
        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
      >
        <option value="">All Status</option>
        <option value="Verified">Verified</option>
        <option value="Pending Review">Pending Review</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
    
    <div className="filter-section">
      <label>Price Range (ADA)</label>
      <div className="price-inputs">
        <input
          type="number"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
        />
        <span className="price-separator">to</span>
        <input
          type="number"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
        />
      </div>
    </div>

    <div className="filter-section">
      <label>Location</label>
      <select 
        value={filters.location} 
        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
      >
        <option value="">All Locations</option>
        <option value="Nairobi">Nairobi</option>
        <option value="Accra">Accra</option>
        <option value="Lagos">Lagos</option>
        <option value="Cape Town">Cape Town</option>
      </select>
    </div>
    
    <div className="filter-actions">
      <button 
        className="btn clear-filters"
        onClick={() => setFilters({ status: "", minPrice: "", maxPrice: "", location: "" })}
      >
        Clear All
      </button>
    </div>
  </div>
);

// --- Main Component ---
const Buyerrequiest = () => {
  const [requests, setRequests] = useState(mockBuyerRequests);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    minPrice: "",
    maxPrice: "",
    location: ""
  });

  // Filter requests by search term and filters
  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      const matchesSearch = 
        request.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.landRequested.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.maxPrice.toString().includes(searchTerm);

      const matchesStatus = !filters.status || request.verificationStatus === filters.status;
      const matchesMinPrice = !filters.minPrice || request.maxPrice >= parseInt(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || request.maxPrice <= parseInt(filters.maxPrice);
      const matchesLocation = !filters.location || request.location === filters.location;

      return matchesSearch && matchesStatus && matchesMinPrice && matchesMaxPrice && matchesLocation;
    });
  }, [searchTerm, requests, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const currentRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAction = (id, action) => {
    setRequests(prev =>
      prev.map(request => 
        request.id === id ? { 
          ...request, 
          verificationStatus: action === "Verify" ? "Verified" : "Rejected" 
        } : request
      )
    );
  };

  const handleViewDocs = (request) => {
    alert(`Viewing documents for ${request.buyerName}\n\nLocation: ${request.location}\nLand: ${request.landRequested}\nDocuments: ${request.documentCount} files available`);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Stats
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.verificationStatus === "Pending Review").length,
    verified: requests.filter(r => r.verificationStatus === "Verified").length,
    rejected: requests.filter(r => r.verificationStatus === "Rejected").length
  };

  return (
    <div className="buyer-requests-page">
      <div className="buyer-requests-container">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-main">
            <div className="header-title">
              <BarChart className="header-icon" size={28} />
              <div>
                <h1>Buyer Requests</h1>
                <p className="header-subtitle">
                  Manage and review buyer land purchase requests in the Cardano Smart Contract escrow
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card total">
            <div className="stat-info">
              <h3>Total Requests</h3>
              <div className="stat-number">{stats.total}</div>
            </div>
            <div className="stat-icon">
              <Users size={24} />
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-info">
              <h3>Pending Review</h3>
              <div className="stat-number">{stats.pending}</div>
            </div>
            <div className="stat-icon">
              <FileText size={24} />
            </div>
          </div>
          <div className="stat-card verified">
            <div className="stat-info">
              <h3>Verified</h3>
              <div className="stat-number">{stats.verified}</div>
            </div>
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-info">
              <h3>Rejected</h3>
              <div className="stat-number">{stats.rejected}</div>
            </div>
            <div className="stat-icon">
              <XCircle size={24} />
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="controls-section">
          <div className="search-container">
            <div className="search-box">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search by buyer, location, land, or price..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="filter-wrapper">
            <button 
              className={`filter-toggle ${isFilterOpen ? 'active' : ''}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={16} className={`chevron ${isFilterOpen ? 'open' : ''}`} />
            </button>
            <FilterDropdown 
              filters={filters}
              setFilters={setFilters}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <span className="results-count">
            Showing {filteredRequests.length} of {requests.length} requests
          </span>
          {filteredRequests.length > 0 && (
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="table-view">
          <div className="table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th className="col-number">#</th>
                  <th className="col-buyer">Buyer</th>
                  <th className="col-land">Land Requested</th>
                  <th className="col-location">Location</th>
                  <th className="col-price">Price (ADA)</th>
                  <th className="col-docs">Docs</th>
                  <th className="col-date">Date</th>
                  <th className="col-status">Status</th>
                  <th className="col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.length === 0 ? (
                  <tr className="no-requests-row">
                    <td colSpan="9">
                      <div className="no-requests">
                        <FileText size={48} />
                        <h3>No requests found</h3>
                        <p>Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentRequests.map((request, index) => (
                    <tr key={request.id} className="request-row">
                      <td className="col-number">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="col-buyer">
                        <div className="buyer-info">
                          <Users size={16} />
                          {request.buyerName}
                        </div>
                      </td>
                      <td className="col-land">{request.landRequested}</td>
                      <td className="col-location">
                        <span className="location-tag">{request.location}</span>
                      </td>
                      <td className="col-price">
                        <span className="price-tag">
                          {request.maxPrice.toLocaleString()} ADA
                        </span>
                      </td>
                      <td className="col-docs">
                        <button 
                          className="btn docs-btn"
                          onClick={() => handleViewDocs(request)}
                          title="View Documents"
                        >
                          <Eye size={16} />
                          <span>{request.documentCount}</span>
                        </button>
                      </td>
                      <td className="col-date">
                        {new Date(request.date).toLocaleDateString()}
                      </td>
                      <td className="col-status">
                        <StatusPill status={request.verificationStatus} />
                      </td>
                      <td className="col-actions">
                        <div className="action-buttons">
                          <button 
                            className={`btn action-btn verify ${request.verificationStatus === "Verified" ? "disabled" : ""}`}
                            onClick={() => handleAction(request.id, "Verify")}
                            disabled={request.verificationStatus === "Verified"}
                            title="Verify Request"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            className={`btn action-btn reject ${request.verificationStatus === "Rejected" ? "disabled" : ""}`}
                            onClick={() => handleAction(request.id, "Reject")}
                            disabled={request.verificationStatus === "Rejected"}
                            title="Reject Request"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="mobile-view">
          {currentRequests.length === 0 ? (
            <div className="no-requests-mobile">
              <FileText size={48} />
              <h3>No requests found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            currentRequests.map((request) => (
              <RequestCard 
                key={request.id} 
                request={request} 
                handleAction={handleAction} 
                handleViewDocs={handleViewDocs} 
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination">
              <button 
                className="pagination-btn prev"
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
              >
                ‹ Previous
              </button>
              
              <div className="pagination-pages">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-btn page ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button 
                className="pagination-btn next"
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buyerrequiest;