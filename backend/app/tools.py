# app/tools.py
import subprocess
from langchain.tools import tool

@tool
def run_docker_ps(query: str = "") -> str:
    """Useful when you need to check running Docker containers."""
    try:
        result = subprocess.run(["docker", "ps", "--format", "table {{.ID}}\\t{{.Names}}\\t{{.Status}}"], 
                                capture_output=True, text=True, check=True)
        return result.stdout if result.stdout else "No containers running."
    except Exception as e:
        return f"Error executing docker ps: {str(e)}"

@tool
def check_git_status(query: str = "") -> str:
    """Useful to check the status of the current git repository repository."""
    try:
        result = subprocess.run(["git", "status", "-s"], capture_output=True, text=True, check=True)
        return result.stdout if result.stdout else "Git repository clean."
    except Exception as e:
        return f"Error checking git status: {str(e)}"

# Export list of available tools
devops_tools = [run_docker_ps, check_git_status]