# app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
import asyncio

app = FastAPI(title="Jarvis Chat Streaming Backend")

# Enable CORS for your Frontend application connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Core Local LLM configuration
llm = OllamaLLM(model="qwen2.5-coder:7b", temperature=0.4)

class ChatPayload(BaseModel):
    message: str

async def generate_ollama_stream(user_prompt: str):
    """Asynchronously calls Ollama and yields text chunks as they arrive."""
    try:
        # Using LangChain's native streaming execution
        for chunk in llm.stream(user_prompt):
            yield chunk
            # Yield control back momentarily to ensure async chunks push cleanly
            await asyncio.sleep(0.01)
    except Exception as e:
        yield f"\n[Backend Error]: {str(e)}"

@app.post("/api/chat/stream")
async def stream_jarvis_response(payload: ChatPayload):
    # StreamingResponse returns data dynamically chunk by chunk over HTTP
    return StreamingResponse(
        generate_ollama_stream(payload.message), 
        media_type="text/event-stream"
    )

@app.get("/")
async def root():
    return {"message": "Jarvis Backend Running"}

@app.post("/chat")
async def chat(payload: ChatPayload):
    try:
        print(f"Received: {payload.message}")

        response = llm.invoke(payload.message)

        print(f"Response: {response}")

        return {"response": response}

    except Exception as e:
        import traceback
        traceback.print_exc()

        return {
            "error": str(e)
        }

@app.get("/models")
async def models():
    return {
        "models": ["qwen2.5-coder:7b"]
    }
