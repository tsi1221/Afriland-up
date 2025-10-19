import React, { useState } from "react";
import { askGemini } from "../../services/geminiService";
import "./AIChat.css";

function AIChat() {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [listening, setListening] = useState(false);

  // 🧠 Ask Gemini
  const handleAsk = async () => {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    setResponses((prev) => [...prev, userMsg]);
    setInput("");

    // Show "thinking..." placeholder
    const thinkingMsg = { type: "ai", text: "Thinking..." };
    setResponses((prev) => [...prev, thinkingMsg]);

    const prompt = `
You are AfriLand's professional AI assistant. 
You are a professional AI assistant for AfriLand, a blockchain-based land registry in Africa. Answer user questions clearly, structured, and in no more than 70 words. Only use AfriLand features:
 - Users register with Cardano wallets and DIDs. - Inspectors (local chiefs, surveyors, officers) verify users and approve land transfers.
  - Land titles are tokenized as NFTs on Cardano/Avalanche, stored on IPFS.
   - Payments, listings, requests, and transfers are on the blockchain. 
  - Dashboards, AI fraud detection, and dispute resolution exist. -url http://localhost:5173 
  -we are passionate about land ownership and blockchain technology. -we prioritize security, transparency, and user empowerment.
   -we operate in multiple African countries.
   -my name is AfriLand.
   -team members: Tsehaynesh biruh(tsi), Sadik Tofik(sadi). -simon is organizer name.
    -Tsehaynesh biruh is CEO. -location: Addis Ababa, Ethiopia.
    -love to help people own land securely. -Always respond in English. - very important: If you don't know the answer, say "I don't know" or "I am not sure", do not make up an answer. -keep answers under minmum 30 words maximum 70 words.
 -Cardano is a blockchain platform used to build secure, scalable, and decentralized applications.
 - Its main uses include: -Digital Transactions: Sending and receiving its cryptocurrency ADA securely.
  -Smart Contracts: Running decentralized applications (dApps) like AfriLand for land registry. 
  -Tokenization: Representing real-world assets (like land titles) as tokens or NFTs. 
  -Immutable Records: Storing data permanently, preventing fraud or tampering. 
  -tsehaynesh biruh you can contact her on telegram@ts_e_ha_y_nesh  contact him on telegram
  -tsehaynesh phone number +251928505904
  -Decentralized Identity: Using DIDs to verify users without relying on a central authority.
Answer clearly, concisely (30–70 words max), and in English.
If unsure, say "I don't know".
User question: "${input}"
    `;

    try {
      const answer = await askGemini(prompt);

      // Replace the last AI message (thinking) with the answer
      setResponses((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1 ? { type: "ai", text: answer } : msg
        )
      );

      // 🗣 Speak Gemini’s answer
      speak(answer);
    } catch (error) {
      console.error("Gemini Error:", error);
      setResponses((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1
            ? { type: "ai", text: "⚠️ Oops! Something went wrong." }
            : msg
        )
      );
    }
  };

  // 🎤 Voice input
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  // 🔊 Text-to-speech (AI replies)
  const speak = (text) => {
    if (!window.speechSynthesis) return;

    // Stop any ongoing speech first
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1; // Speed
    utterance.pitch = 1; // Tone
    utterance.volume = 1; // Loudness
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="ai-chat-container">
      <h2>Ask Gemini AI about AfriLand</h2>

      <div className="chat-box">
        {responses.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.type === "user" ? "user" : "ai"}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="input-bar">
        <button
          className={`mic-btn ${listening ? "listening" : ""}`}
          onClick={startListening}
          title="Speak to Gemini"
        >
          🎤
        </button>

        <textarea
          placeholder="Ask anything about AfriLand..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleAsk}>Send</button>
      </div>
    </div>
  );
}

export default AIChat;
