import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/api";
import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import MessageBubble from "../components/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (message) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    setLoading(true);

    try {
      const data = await sendMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);

      speechSynthesis.print(
        new SpeechSynthesisUtterance(data.response)
      );
    } catch (error) {
      console.error("Error sending message:", error);
      console.error("response:", error.response);
      console.error("data:", error.response?.data);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: JSON.stringify(error.response?.data || error.message),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.chatPageContainer}>
      <Header />

      <div style={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div style={styles.emptyState}>
            <h2 style={styles.emptyTitle}>AJ IS ONLINE</h2>
            <p style={styles.emptySubtitle}>
              Ask me anything - I'm here to help
            </p>
            <div style={styles.suggestionGrid}>
              <div
                style={styles.suggestion}
                onClick={() => handleSend("What can you help me with?")}
              >
                <p style={styles.suggestionTitle}>Get Started</p>
                <p style={styles.suggestionDesc}>
                  Learn what I can do
                </p>
              </div>
              <div
                style={styles.suggestion}
                onClick={() => handleSend("Tell me a joke")}
              >
                <p style={styles.suggestionTitle}>Have Fun</p>
                <p style={styles.suggestionDesc}>
                  Enjoy a good laugh
                </p>
              </div>
              <div
                style={styles.suggestion}
                onClick={() =>
                  handleSend("What's the weather?")
                }
              >
                <p style={styles.suggestionTitle}>Learn</p>
                <p style={styles.suggestionDesc}>
                  Ask questions
                </p>
              </div>
              <div
                style={styles.suggestion}
                onClick={() =>
                  handleSend("Help me write code")
                }
              >
                <p style={styles.suggestionTitle}>Create</p>
                <p style={styles.suggestionDesc}>
                  Write and code
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
          </>
        )}

        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

const styles = {
  chatPageContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    background: "#0f172a",
    color: "#f1f5f9",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    maxWidth: "900px",
    margin: "0 auto",
    width: "100%",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: "32px",
    fontWeight: "500",
    marginBottom: "12px",
    color: "#f1f5f9",
  },
  emptySubtitle: {
    fontSize: "16px",
    color: "#94a3b8",
    marginBottom: "32px",
  },
  suggestionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
    width: "100%",
    maxWidth: "600px",
  },
  suggestion: {
    padding: "16px",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  suggestionTitle: {
    fontSize: "16px",
    fontWeight: "500",
    margin: 0,
    marginBottom: "8px",
    color: "#f1f5f9",
  },
  suggestionDesc: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
  },
};