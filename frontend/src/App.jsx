import { useState } from "react";
import Sidebar from "./components/sidebar";
import ChatPage from "./pages/ChatPage";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={styles.appContainer}>
      <Sidebar />
      <ChatPage />
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    height: "100vh",
    background: "#0f172a",
    color: "white",
    overflow: "hidden",
  },
};
