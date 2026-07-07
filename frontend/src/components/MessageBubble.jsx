import ReactMarkdown from "react-markdown";
import { FiCopy, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { useState } from "react";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        ...styles.messageContainer,
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          ...styles.messageBubble,
          background: isUser ? "#1d3a1f" : "#1e3a5f",
          borderLeft: isUser ? "4px solid #22c55e" : "4px solid #3b82f6",
        }}
        onMouseEnter={(e) => {
          if (!isUser) {
            e.currentTarget.style.background = "#1e425f";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isUser ? "#1d3a1f" : "#1e3a5f";
        }}
      >
        <div style={styles.messageContent}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {!isUser && (
          <div style={styles.messageActions}>
            <button
              style={styles.actionBtn}
              onClick={handleCopy}
              title="Copy"
            >
              <FiCopy size={16} />
              {copied && <span style={styles.copiedText}>Copied!</span>}
            </button>
            <button style={styles.actionBtn} title="Helpful">
              <FiThumbsUp size={16} />
            </button>
            <button style={styles.actionBtn} title="Not helpful">
              <FiThumbsDown size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  messageContainer: {
    display: "flex",
    marginBottom: "20px",
    animation: "fadeIn 0.3s ease-in",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: "12px",
    wordWrap: "break-word",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
    transition: "all 0.2s ease",
  },
  messageContent: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#f1f5f9",
    margin: 0,
  },
  messageActions: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
    paddingTop: "8px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  actionBtn: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    padding: "4px 8px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    transition: "all 0.2s ease",
    borderRadius: "4px",
  },
  copiedText: {
    fontSize: "12px",
    color: "#22c55e",
  },
};