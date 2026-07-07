import { FiPlus, FiTrash2, FiSettings, FiHelpCircle } from "react-icons/fi";
import { useState } from "react";

export default function Sidebar() {
  const [conversations, setConversations] = useState([
    { id: 1, title: "Latest Chat", timestamp: "Today" },
  ]);
  const [activeId, setActiveId] = useState(1);

  const handleNewChat = () => {
    const newId = Math.max(...conversations.map((c) => c.id), 0) + 1;
    setConversations([
      ...conversations,
      {
        id: newId,
        title: `Chat ${newId}`,
        timestamp: "Just now",
      },
    ]);
    setActiveId(newId);
  };

  const handleDeleteChat = (id) => {
    const filtered = conversations.filter((c) => c.id !== id);
    setConversations(filtered);
    if (activeId === id && filtered.length > 0) {
      setActiveId(filtered[0].id);
    }
  };

  return (
    <div style={styles.sidebar}>
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.newChatBtn}
          onClick={handleNewChat}
        >
          <FiPlus size={18} />
          New Chat
        </button>
      </div>

      {/* Conversations */}
      <div style={styles.conversationsContainer}>
        <p style={styles.sectionLabel}>Conversations</p>
        <div style={styles.conversationsList}>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              style={{
                ...styles.conversationItem,
                background:
                  activeId === conv.id
                    ? "#1e293b"
                    : "transparent",
              }}
              onMouseEnter={(e) => {
                if (activeId !== conv.id) {
                  e.currentTarget.style.background = "#1e293b";
                }
              }}
              onMouseLeave={(e) => {
                if (activeId !== conv.id) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <div
                style={styles.conversationInfo}
                onClick={() => setActiveId(conv.id)}
              >
                <p style={styles.conversationTitle}>{conv.title}</p>
                <p style={styles.conversationTime}>{conv.timestamp}</p>
              </div>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDeleteChat(conv.id)}
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <button style={styles.footerBtn}>
          <FiHelpCircle size={18} />
          Help & FAQ
        </button>
        <button style={styles.footerBtn}>
          <FiSettings size={18} />
          Settings
        </button>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "280px",
    background: "#111827",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #334155",
    height: "100vh",
  },
  header: {
    padding: "16px 12px",
    borderBottom: "1px solid #334155",
  },
  newChatBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "#0ea5e9",
    color: "white",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  conversationsContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 8px",
  },
  sectionLabel: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "600",
    textTransform: "uppercase",
    padding: "0 12px 8px 12px",
    margin: 0,
    letterSpacing: "0.5px",
  },
  conversationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  conversationItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    gap: "8px",
  },
  conversationInfo: {
    flex: 1,
    minWidth: 0,
  },
  conversationTitle: {
    fontSize: "14px",
    color: "#f1f5f9",
    margin: 0,
    fontWeight: "500",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  conversationTime: {
    fontSize: "12px",
    color: "#64748b",
    margin: "4px 0 0 0",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "all 0.2s ease",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px 12px",
    borderTop: "1px solid #334155",
  },
  footerBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "transparent",
    border: "1px solid #334155",
    color: "#f1f5f9",
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "13px",
  },
};