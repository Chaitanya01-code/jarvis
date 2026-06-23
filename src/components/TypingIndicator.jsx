import "./TypingIndicator.css";

export default function TypingIndicator() {
  return (
    <div style={styles.typingContainer}>
      <div style={styles.messageBubble}>
        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p style={styles.typingText}>Jarvis is thinking...</p>
      </div>
    </div>
  );
}

const styles = {
  typingContainer: {
    display: "flex",
    marginBottom: "20px",
    alignItems: "center",
  },
  messageBubble: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    background: "#1e3a5f",
    borderLeft: "4px solid #3b82f6",
    borderRadius: "12px",
  },
  typingText: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: 0,
  },
};