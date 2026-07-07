import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function Chat(){

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);

  async function sendMessage(){

    if(!message.trim()) return;

    const userMessage = {
      role:"user",
      content:message
    };

    setMessages(prev => [
      ...prev,
      userMessage
    ]);

    const currentMessage = message;

    setMessage("");

    try{

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message: currentMessage
        }
      );

      setMessages(prev => [
        ...prev,
        {
          role:"assistant",
          content:response.data.response
        }
      ]);

      print(response.data.response);

    }catch(err){

      console.error(err);
    }
  }

  function startListening(){

    const recognition =
      new (
        window.SpeechRecognition ||
        window.webkitSpeechRecognition
      )();

    recognition.start();

    recognition.onresult = e => {

      const text =
        e.results[0][0].transcript;

      setMessage(text);
    };
  }

  return(
    <div
      style={{
        flex:1,
        display:"flex",
        flexDirection:"column"
      }}
    >

      <div
        style={{
          flex:1,
          overflowY:"auto",
          padding:"20px"
        }}
      >

        {
          messages.map((msg,index)=>(
            <div
              key={index}
              style={{
                marginBottom:"20px"
              }}
            >
              <b>
                {msg.role}
              </b>

              <ReactMarkdown>
                {msg.content}
              </ReactMarkdown>

            </div>
          ))
        }

      </div>

      <div
        style={{
          display:"flex",
          gap:"10px",
          padding:"20px"
        }}
      >

        <button
          onClick={startListening}
        >
          🎤
        </button>

        <input
          value={message}
          onChange={e=>
            setMessage(
              e.target.value
            )
          }
          style={{
            flex:1,
            padding:"12px"
          }}
        />

        <button
          onClick={sendMessage}
        >
          Send
        </button>

      </div>

    </div>
  );
}