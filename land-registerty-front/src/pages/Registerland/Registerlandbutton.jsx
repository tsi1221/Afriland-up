import React, { useState } from "react";
import RegisterLand from "../../pages/RegisterLand/RegisterLand";
import "./Registerlandbutton.css";
import { Map } from "lucide-react";

const RegisterLandButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Trigger Button */}
      <button className="btn blue" onClick={toggleModal}>
        <Map /> Register New Land
      </button>

      {/* Floating Modal Card */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            {/* Close Button */}
            <button className="modal-close" onClick={toggleModal}>
              ✖
            </button>

            {/* Form */}
            <RegisterLand onSuccess={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterLandButton;
