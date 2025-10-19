import React, { useState } from "react";
import {
  Globe,
  User,
  MapPin,
  Ruler,
  Eye,
  X,
  ListChecks,
  Pencil,
  Trash2,
  ShieldCheck,
  XCircle,
  Search as SearchIcon,
  Filter,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Plus
} from "lucide-react";
import logo from "../../assets/image.png";
import "./Landlist.css";

const LandList = () => {
  const [landParcels, setLandParcels] = useState([
    {
      id: "001",
      owner: "Jane K. Smith",
      location: "Nairobi Central",
      area: "1.5",
      areaUnit: "Hectares",
      status: "Verified",
      imageUrls: [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=250&fit=crop"
      ],
    },
    {
      id: "002",
      owner: "Dr. Kwame Adu",
      location: "Accra West",
      area: "0.8",
      areaUnit: "sq Km",
      status: "Pending",
      imageUrls: [
        "https://images.unsplash.com/photo-1464822759849-deb9df8c6b41?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop"
      ],
    },
    {
      id: "003",
      owner: "Michael Johnson",
      location: "Cape Town South",
      area: "2.5",
      areaUnit: "Hectares",
      status: "Verified",
      imageUrls: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=400&h=250&fit=crop"
      ],
    },
    {
      id: "004",
      owner: "Sarah Chen",
      location: "Lagos Island",
      area: "1.2",
      areaUnit: "sq Km",
      status: "Rejected",
      imageUrls: [
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?w=400&h=250&fit=crop"
      ],
    },
    {
      id: "005",
      owner: "David Brown",
      location: "Kampala Hills",
      area: "3.0",
      areaUnit: "Hectares",
      status: "Pending",
      imageUrls: [
        "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=400&h=250&fit=crop"
      ],
    },
    {
      id: "006",
      owner: "Emma Wilson",
      location: "Dakar Coastal",
      area: "1.8",
      areaUnit: "sq Km",
      status: "Verified",
      imageUrls: [
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=250&fit=crop"
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    area: "",
    location: "",
    status: "",
    areaUnit: ""
  });
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // Filter parcels based on search term and filters
  const filteredParcels = landParcels.filter((parcel) => {
    const matchesSearch = 
      parcel.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArea = !filters.area || parcel.area >= parseFloat(filters.area);
    const matchesLocation = !filters.location || 
      parcel.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesStatus = !filters.status || parcel.status === filters.status;
    const matchesAreaUnit = !filters.areaUnit || parcel.areaUnit === filters.areaUnit;

    return matchesSearch && matchesArea && matchesLocation && matchesStatus && matchesAreaUnit;
  });

  // Status Pill Component
  const StatusPill = ({ status }) => {
    const statusConfig = {
      Verified: { class: "verified", gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)" },
      Pending: { class: "pending", gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" },
      Rejected: { class: "rejected", gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)" }
    };
    
    const config = statusConfig[status] || { class: "unknown", gradient: "#6B7280" };
    
    return (
      <span 
        className={`status-pill ${config.class}`}
        style={{ background: config.gradient }}
      >
        {status}
      </span>
    );
  };

  // Image Gallery Component
  const ImageGallery = ({ urls, onImageClick }) => {
    const handleImageError = (parcelId, index) => {
      setImageErrors(prev => ({
        ...prev,
        [`${parcelId}-${index}`]: true
      }));
    };

    return (
      <div className="image-gallery">
        {urls.slice(0, 3).map((url, index) => (
          <div key={index} className="image-container">
            {imageErrors[`${urls}-${index}`] ? (
              <div className="image-placeholder">
                <ImageIcon size={20} />
                <span>Image {index + 1}</span>
              </div>
            ) : (
              <img
                src={url}
                alt={`Parcel view ${index + 1}`}
                onClick={() => onImageClick(urls, index)}
                onError={() => handleImageError(urls, index)}
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Filter Dropdown Component
  const FilterDropdown = () => (
    <div className={`filter-dropdown ${isFilterOpen ? 'open' : ''}`}>
      <div className="filter-section">
        <h4>Area Size</h4>
        <div className="filter-row">
          <input
            type="number"
            placeholder="Min area"
            value={filters.area}
            onChange={(e) => setFilters(prev => ({ ...prev, area: e.target.value }))}
          />
          <select 
            value={filters.areaUnit} 
            onChange={(e) => setFilters(prev => ({ ...prev, areaUnit: e.target.value }))}
          >
            <option value="">All Units</option>
            <option value="Hectares">Hectares</option>
            <option value="sq Km">Square Km</option>
          </select>
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Location</h4>
        <input
          type="text"
          placeholder="Filter by location"
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
        />
      </div>
      
      <div className="filter-section">
        <h4>Verification Status</h4>
        <select 
          value={filters.status} 
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
        >
          <option value="">All Status</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      
      <div className="filter-actions">
        <button 
          className="clear-filters"
          onClick={() => setFilters({ area: "", location: "", status: "", areaUnit: "" })}
        >
          Clear All
        </button>
      </div>
    </div>
  );

  // Image Viewer Modal Component
  const ImageViewerModal = ({ isOpen, onClose, images, currentIndex }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(currentIndex);

    const nextImage = () => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!isOpen) return null;

    return (
      <div className="image-viewer-modal" onClick={onClose}>
        <div className="image-viewer-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
          <button className="nav-button prev" onClick={prevImage}>
            ‹
          </button>
          <img 
            src={images[currentImgIndex]} 
            alt={`View ${currentImgIndex + 1}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%236b7280'%3EImage Not Available%3C/text%3E%3C/svg%3E";
            }}
          />
          <button className="nav-button next" onClick={nextImage}>
            ›
          </button>
          <div className="image-counter">
            {currentImgIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    );
  };

  // Detail Modal Component
  const DetailModal = ({ isOpen, onClose, parcel }) => {
    if (!isOpen || !parcel) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>
              <ListChecks className="icon" /> Parcel Details #{parcel.id}
            </h3>
            <button onClick={onClose} className="close-modal-btn">
              <X className="icon" />
            </button>
          </div>
          <div className="modal-body">
            <div className="detail-grid">
              <div className="detail-item">
                <strong>Owner:</strong> {parcel.owner}
              </div>
              <div className="detail-item">
                <strong>Location:</strong> {parcel.location}
              </div>
              <div className="detail-item">
                <strong>Area:</strong> {parcel.area} {parcel.areaUnit}
              </div>
              <div className="detail-item">
                <strong>Status:</strong> <StatusPill status={parcel.status} />
              </div>
            </div>
            <div className="modal-gallery">
              <h4>Property Images</h4>
              <ImageGallery 
                urls={parcel.imageUrls} 
                onImageClick={(images, index) => {
                  setCurrentImages(images);
                  setCurrentImageIndex(index);
                  setIsImageViewerOpen(true);
                }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <div className="action-buttons">
              <button className="btn-edit" onClick={() => handleEdit(parcel.id)}>
                <Pencil className="icon" /> Edit
              </button>
              <button className="btn-delete" onClick={() => handleDelete(parcel.id)}>
                <Trash2 className="icon" /> Delete
              </button>
              {parcel.status !== "Verified" && (
                <button className="btn-verify" onClick={() => handleVerify(parcel.id)}>
                  <ShieldCheck className="icon" /> Verify
                </button>
              )}
              <button className="btn-cancel" onClick={onClose}>
                <XCircle className="icon" /> Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handlers
  const handleViewDetails = (parcel) => {
    setSelectedParcel(parcel);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (id) => {
    alert(`Edit parcel ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this parcel?")) {
      setLandParcels((prev) => prev.filter((p) => p.id !== id));
      setIsDetailModalOpen(false);
    }
  };
  
  const handleVerify = (id) => {
    setLandParcels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Verified" } : p))
    );
  };

  const handleImageClick = (images, index) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
  };

  return (
    <div className="landlist-container">
      <div className="landlist-content">
        {/* Header */}
        <header className="landlist-header">
          <div className="header-content">
            <div className="logo-title">
              <img className="logo" src={logo} alt="Afriland Logo" />
              <h1>My Properties</h1>
            </div>
            <p className="header-subtitle">Manage your land parcels efficiently</p>
          </div>
        </header>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-container">
            <div className="search-bar">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search by owner, location, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-container">
            <button 
              className="filter-toggle"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="icon" />
              Filters
              {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <FilterDropdown />
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>Showing {filteredParcels.length} of {landParcels.length} properties</p>
        </div>

        {/* Properties Grid */}
        <div className="properties-grid">
          {filteredParcels.length === 0 ? (
            <div className="no-results">
              <div className="no-results-content">
                <p>No properties found matching your criteria.</p>
                <button 
                  className="clear-filters-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({ area: "", location: "", status: "", areaUnit: "" });
                  }}
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            filteredParcels.map((parcel) => (
              <div className="property-card" key={parcel.id}>
                <ImageGallery 
                  urls={parcel.imageUrls} 
                  onImageClick={handleImageClick}
                />
                <div className="property-info">
                  <div className="property-header">
                    <h3>Property #{parcel.id}</h3>
                    <StatusPill status={parcel.status} />
                  </div>
                  <div className="property-details">
                    <div className="detail-row">
                      <User className="icon" />
                      <span>{parcel.owner}</span>
                    </div>
                    <div className="detail-row">
                      <MapPin className="icon" />
                      <span>{parcel.location}</span>
                    </div>
                    <div className="detail-row">
                      <Ruler className="icon" />
                      <span>{parcel.area} {parcel.areaUnit}</span>
                    </div>
                  </div>
                  <div className="property-actions">
                    <button 
                      className="view-details-btn"
                      onClick={() => handleViewDetails(parcel)}
                    >
                      <Eye className="icon" /> View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Property Button */}
        <a href="/buyerrequestform" className="add-property-link">
          <button className="add-property-btn">
            <Plus className="icon" />
            Add New Property
          </button>
        </a>

        {/* Modals */}
        <DetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          parcel={selectedParcel}
        />

        <ImageViewerModal
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
          images={currentImages}
          currentIndex={currentImageIndex}
        />
      </div>
    </div>
  );
};

export default LandList;