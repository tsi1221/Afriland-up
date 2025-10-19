import React, { useState } from "react";
import {
  User,
  MapPin,
  Ruler,
  Eye,
  X,
  ListChecks,
  Search as SearchIcon,
  Filter,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import "./LandlistB.css";

const LandlistB = () => {
  const [landParcels] = useState([
    {
      id: "001",
      owner: "Jane K. Smith",
      location: "Nairobi Central",
      area: "1.5",
      areaUnit: "Hectares",
      status: "Verified",
      price: "$150,000",
      imageUrls: [
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop",
      ],
    },
    {
      id: "002",
      owner: "Dr. Kwame Adu",
      location: "Accra West",
      area: "0.8",
      areaUnit: "sq Km",
      status: "Pending",
      price: "$85,000",
      imageUrls: [
        "https://images.unsplash.com/photo-1464822759849-deb9df8c6b41?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=200&fit=crop",
      ],
    },
    {
      id: "003",
      owner: "Michael Johnson",
      location: "Cape Town South",
      area: "2.5",
      areaUnit: "Hectares",
      status: "Verified",
      price: "$250,000",
      imageUrls: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=200&fit=crop",
      ],
    },
    {
      id: "004",
      owner: "Sarah Chen",
      location: "Lagos Island",
      area: "1.2",
      areaUnit: "sq Km",
      status: "Verified",
      price: "$120,000",
      imageUrls: [
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
      ],
    },
    {
      id: "005",
      owner: "David Brown",
      location: "Kampala Hills",
      area: "3.0",
      areaUnit: "Hectares",
      status: "Verified",
      price: "$300,000",
      imageUrls: [
        "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=300&h=200&fit=crop",
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
        {urls.slice(0, 2).map((url, index) => (
          <div key={index} className="image-container">
            {imageErrors[`${urls}-${index}`] ? (
              <div className="image-placeholder">
                <ImageIcon size={16} />
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
            <X size={20} />
          </button>
          <button className="nav-button prev" onClick={prevImage}>
            ‹
          </button>
          <img 
            src={images[currentImgIndex]} 
            alt={`View ${currentImgIndex + 1}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%236b7280'%3EImage Not Available%3C/text%3E%3C/svg%3E";
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
              <ListChecks size={20} /> Property #{parcel.id}
            </h3>
            <button onClick={onClose} className="close-modal-btn">
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            <div className="detail-grid">
              <div className="detail-item">
                <User size={18} />
                <div className="detail-content">
                  <strong>Owner</strong>
                  <span>{parcel.owner}</span>
                </div>
              </div>
              <div className="detail-item">
                <MapPin size={18} />
                <div className="detail-content">
                  <strong>Location</strong>
                  <span>{parcel.location}</span>
                </div>
              </div>
              <div className="detail-item">
                <Ruler size={18} />
                <div className="detail-content">
                  <strong>Area</strong>
                  <span>{parcel.area} {parcel.areaUnit}</span>
                </div>
              </div>
              <div className="detail-item">
                <DollarSign size={18} />
                <div className="detail-content">
                  <strong>Price</strong>
                  <span className="price-value">{parcel.price}</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-content">
                  <strong>Status</strong>
                  <StatusPill status={parcel.status} />
                </div>
              </div>
            </div>
            <div className="modal-gallery">
              <h4>Property Images</h4>
              <div className="modal-image-gallery">
                {parcel.imageUrls.map((url, index) => (
                  <div key={index} className="modal-image-container">
                    <img
                      src={url}
                      alt={`Property view ${index + 1}`}
                      onClick={() => handleImageClick(parcel.imageUrls, index)}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="modal-actions">
              <button 
                className="btn-buy-now" 
                onClick={() => handleBuyNow(parcel)}
              >
                <ShoppingCart size={18} /> Buy Now - {parcel.price}
              </button>
              <button className="btn-cancel" onClick={onClose}>
                <X size={18} /> Close
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

  const handleBuyNow = (parcel) => {
    alert(`Proceeding to purchase Property #${parcel.id} for ${parcel.price}`);
    // Add your purchase logic here
  };

  const handleImageClick = (images, index) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
  };

  return (
    <div className="landlist-buyer-container">
      <div className="landlist-content">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>Available Properties</h1>
            <p className="header-subtitle">Browse and purchase verified land parcels</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-container">
            <div className="search-bar">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search properties by owner, location, or ID..."
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
              <Filter size={18} />
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
                <div className="property-header">
                  <h3>Property #{parcel.id}</h3>
                  <div className="header-actions">
                    <button 
                      className="view-details-btn"
                      onClick={() => handleViewDetails(parcel)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <StatusPill status={parcel.status} />
                  </div>
                </div>
                
                <ImageGallery 
                  urls={parcel.imageUrls} 
                  onImageClick={handleImageClick}
                />
                
                <div className="property-info">
                  <div className="property-details">
                    <div className="detail-row">
                      <User size={14} />
                      <span>{parcel.owner}</span>
                    </div>
                    <div className="detail-row">
                      <MapPin size={14} />
                      <span>{parcel.location}</span>
                    </div>
                    <div className="detail-row">
                      <Ruler size={14} />
                      <span>{parcel.area} {parcel.areaUnit}</span>
                    </div>
                  </div>
                  
                  <div className="price-section">
                    <DollarSign size={16} />
                    <span className="price">{parcel.price}</span>
                  </div>
                  
                  <div className="property-actions">
                    <button 
                      className={`buy-now-btn ${parcel.status !== "Verified" ? "disabled" : ""}`}
                      onClick={() => parcel.status === "Verified" && handleBuyNow(parcel)}
                      disabled={parcel.status !== "Verified"}
                    >
                      <ShoppingCart size={16} />
                      {parcel.status === "Verified" ? "BUY NOW" : "UNAVAILABLE"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

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

export default LandlistB;