from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from app.services.llm import get_llm

router = APIRouter()


# Request Model
class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, Any]]] = []
    portfolioContext: Optional[str] = ""


# Response Model
class ChatResponse(BaseModel):
    reply: str

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    try:
        llm = get_llm()

        # Upgraded System Prompt
        system_prompt = f"""
You are the personal AI Assistant for Satyam Kumar, integrated directly into his portfolio website.
Your goal is to impress technical recruiters and help visitors learn about Satyam's skills, experience, and projects.

Use the Portfolio Context below as your ONLY source of truth:
---
{request.portfolioContext}
---

RULES FOR ANSWERING:
1. Be professional, friendly, and highly concise (keep answers under 3-4 sentences total).
2. If listing projects or skills, use markdown bullet points for easy scanning.
3. CRITICAL: If a user asks if Satyam knows a specific skill or tool that is NOT listed in the context, DO NOT hallucinate or guess. Truthfully state that it's not currently listed in his portfolio, but emphasize that as a Software & Data Engineer, he learns new technologies extremely quickly to solve problems.
"""

        # 1. Start with the System Prompt
        messages = [
            {"role": "system", "content": system_prompt}
        ]

        # 2. Append the entire history (which already includes the user's latest message from the frontend!)
        if request.history:
            for msg in request.history:
                # Slight mapping just to be safe
                if "role" in msg and "content" in msg:
                    messages.append({
                        "role": msg["role"],
                        "content": msg["content"]
                    })
        else:
            # Fallback just in case history is empty, though the frontend always sends it
            messages.append({"role": "user", "content": request.message})

        # Call LLM
        response = llm.invoke(messages)

        return ChatResponse(
            reply=response.content
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating chat response: {str(e)}"
        )
