import { FiMoreVertical, FiInfo } from "react-icons/fi";

export default function Header() {
  return (
    <div style={styles.header}>
      <div style={styles.titleSection}>
        <h1 style={styles.title}>AJ AI ASSISTANT</h1>
        <p style={styles.subtitle}>Your intelligent assistant</p>
      </div>
      <div style={styles.actions}>
        <button style={styles.iconButton} title="Information">
          <FiInfo size={20} />
        </button>
        <button style={styles.iconButton} title="More options">
          <FiMoreVertical size={20} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #334155",
    background: "#0f172a",
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: "20px",
    fontWeight: "500",
    margin: 0,
    color: "#f1f5f9",
  },
  subtitle: {
    fontSize: "12px",
    color: "#94a3b8",
    margin: "4px 0 0 0",
  },
  actions: {
    display: "flex",
    gap: "12px",
  },
  iconButton: {
    background: "transparent",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "8px",
    color: "#f1f5f9",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
};