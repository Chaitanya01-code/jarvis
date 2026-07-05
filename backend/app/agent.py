# app/agent.py
from langchain_ollama import OllamaLLM
from langchain.agents import create_react_agent, AgentExecutor
from langchain.prompts import PromptTemplate
from app.tools import devops_tools

# Initialize local LLM via Ollama
llm = OllamaLLM(model="llama3", temperature=0.2)

# Define standard ReAct prompt structure 
template = """You are Jarvis, an automated DevOps AI assistant. You have access to the following tools:

{tools}

Use the following strict format:
Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final response to the original input question

Question: {input}
{agent_scratchpad}"""

prompt = PromptTemplate(
    input_variables=["input", "agent_scratchpad", "tools", "tool_names"],
    template=template
)

# Build the execution engine
agent = create_react_agent(llm=llm, tools=devops_tools, prompt=prompt)
jarvis_executor = AgentExecutor(agent=agent, tools=devops_tools, verbose=True, handle_parsing_errors=True)