import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export async function sendMessage(message) {
  const response = await api.post("/chat", {
    message
  });

  return response.data;
}

export async function getModels() {
  const response = await api.get("/models");

  return response.data;
}