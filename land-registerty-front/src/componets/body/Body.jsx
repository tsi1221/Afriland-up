import React from "react";
import { ArrowRight } from "lucide-react";
import "./Body.css"; // import external CSS file
import { Link } from 'react-router-dom';
import imageUrl from "../../assets/body.png"; // Ensure the image is in the specified path
const Body = () => {


  return (
    <div className="body-container">
      <div className="body-card">
        <div className="body-grid">
          {/* Left - Image Section */}
          <div className="body-image-wrapper">
            <img
              src={imageUrl}
              alt="Community, secure, transparent land ownership in Africa"
              className="body-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/1200x800/4F46E5/ffffff?text=Image+Unavailable";
              }}
            />
          </div>

          {/* Right - Text and CTA */}
          <div className="body-text-section">
            <p className="body-description">
              Leveraging blockchain technology to ensure verifiable, immutable,
              and accessible land records for a stronger future.
            </p>

            <button
              className="get-started-btn"
              onClick={() => console.log("Get Started Clicked!")}
              aria-label="Start securing your land records"
            >
                <Link to="/login"><span className="getstarted">Get Started</span></Link>
              <ArrowRight className="icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
