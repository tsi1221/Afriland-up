import React, { useState } from "react";
import "./TalkToGeminiButton.css";
import AIChat from "../../pages/AIChat/AIChat"; // ✅ make sure this path is correct

const TalkToGeminiButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="gemini-container">
      {isOpen && (
        <div className="gemini-chat-panel">
          {/* Fixed close button */}
          <button className="close-btn" onClick={toggleChat}>✖</button>

          {/* Chat content area */}
          <div className="gemini-chat-body">
            <AIChat />
          </div>
        </div>
      )}

      {/* Floating circular button */}
      <button className="gemini-button" onClick={toggleChat} title="Talk to Gemini">
        💬
      </button>
    </div>
  );
};

export default TalkToGeminiButton;
