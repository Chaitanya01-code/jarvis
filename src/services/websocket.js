export function connectChat(
  onMessage
){

  const ws =
    new WebSocket(
      "ws://127.0.0.1:8000/ws/chat"
    );

  ws.onmessage = event => {

    onMessage(
      event.data
    );

  };

  return ws;
}