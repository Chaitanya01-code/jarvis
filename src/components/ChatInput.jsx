import { useState } from "react";
import { FiSend, FiMic, FiPlus } from "react-icons/fi";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const send = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const voiceInput = () => {
    const recognition =
      new (
        window.SpeechRecognition ||
        window.webkitSpeechRecognition
      )();

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      setMessage(event.results[0][0].transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div style={styles.inputContainer}>
      <div style={styles.inputWrapper}>
        <div style={styles.inputInner}>
          <button
            style={{
              ...styles.iconBtn,
              color: isListening ? "#3b82f6" : "#94a3b8",
            }}
            onClick={() => {}}
            title="Add attachment"
          >
            <FiPlus size={20} />
          </button>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Jarvis anything..."
            style={styles.textarea}
            rows={1}
          />

          <button
            style={{
              ...styles.iconBtn,
              color: isListening ? "#ef4444" : "#94a3b8",
              animation: isListening ? "pulse 1s infinite" : "none",
            }}
            onClick={voiceInput}
            title={isListening ? "Listening..." : "Voice input"}
          >
            <FiMic size={20} />
          </button>

          <button
            style={{
              ...styles.sendBtn,
              opacity: message.trim() ? 1 : 0.5,
              pointerEvents: message.trim() ? "auto" : "none",
            }}
            onClick={send}
            title="Send message"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
      <p style={styles.hint}>
        Jarvis can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}

const styles = {
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "20px",
    background: "linear-gradient(to top, #0f172a, rgba(15, 23, 42, 0.7))",
  },
  inputWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  inputInner: {
    display: "flex",
    alignItems: "flex-end",
    gap: "12px",
    width: "100%",
    maxWidth: "900px",
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "12px",
    transition: "all 0.2s ease",
  },
  textarea: {
    flex: 1,
    background: "transparent",
    border: "none",
    color: "#f1f5f9",
    padding: "8px",
    fontFamily: "inherit",
    fontSize: "14px",
    lineHeight: "1.5",
    resize: "none",
    maxHeight: "200px",
    scrollbarWidth: "thin",
  },
  iconBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    transition: "all 0.2s ease",
  },
  sendBtn: {
    background: "#0ea5e9",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    transition: "all 0.2s ease",
  },
  hint: {
    fontSize: "12px",
    color: "#64748b",
    margin: 0,
    textAlign: "center",
  },
};