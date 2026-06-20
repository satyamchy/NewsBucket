"""
chat_route.py — Portfolio AI Chatbot API
FastAPI + ChromaDB (vector search) + LangChain + Groq (LLM)

Endpoints:
  POST /chat        — ask a question, get an answer
  GET  /health      — sanity check
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.llm import get_llm
from typing import List, Dict, Any, Optional

from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser

from app.portfolio.chromaDB import collection, chroma_client

router = APIRouter()


# ── System Prompt ───────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are an AI assistant on Satyam Kumar's portfolio website.
Your goal is to impress technical recruiters and help visitors learn about Satyam's skills, projects, experience, education, and background
using ONLY the context provided below. 

If the answer isn't in the context, say: "I don't have that information, but you can
reach Satyam directly at satyamkr1354@gmail.com."

RULES FOR ANSWERING:
1. Be professional, friendly, and highly concise (keep answers under 3-4 sentences total).
2. If listing projects or skills, use markdown bullet points for easy scanning.
3. CRITICAL: If a user asks if Satyam knows a specific skill or tool that is NOT listed in the context, DO NOT hallucinate or guess. 
Truthfully state that it's not currently listed in his portfolio, but emphasize that as a Software and AI Engineer, he learns new technologies extremely quickly to solve problems.

Context:
{context}
"""

prompt_template = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    ("human", "{question}"),
    MessagesPlaceholder(variable_name="history"),
])

chain = prompt_template | get_llm() | StrOutputParser()

# ── Schemas ───────────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, Any]]] = []

class ChatResponse(BaseModel):
    reply: str
    sources: list[str] = []   # optional: which doc types were used

# ── Helper ────────────────────────────────────────────────────────────────────
def retrieve_context(question: str, n_results: int = 5) -> tuple[str, list[str]]:
    """Query ChromaDB and return (formatted_context, source_types)."""
    results = collection.query(
        query_texts=[question],
        n_results=n_results,
    )

    documents = results["documents"][0]       # list of matched doc strings
    metadatas = results["metadatas"][0]       # list of metadata dicts

    context_parts = []
    source_types = []

    for doc, meta in zip(documents, metadatas):
        source_type = meta.get("type", "unknown")
        source_types.append(source_type)
        context_parts.append(f"[{source_type.upper()}]\n{doc}")

    context = "\n\n---\n\n".join(context_parts)
    return context, source_types

# ── Routes ────────────────────────────────────────────────────────────────────
@router.get("/health")
def health():
   
    count = collection.count()
    print(chroma_client.list_collections())
    print(f"ChromaDB collection 'portfolio' has {count} documents.")
    # print(f"Documents in ChromaDB:{collection.get()}")
    return {"status": "ok", "documents_in_db": count}


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        
        question = request.message.strip()
        # print(f"Received question: {question}")
        if not question:
            raise HTTPException(status_code=400, detail="Question cannot be empty.")

         # 1. Retrieve relevant chunks from ChromaDB
        context, sources = retrieve_context(question, n_results=5)
        print(f"Retrieved context:\n{context}\nSources: {sources}")

        # 2. Send to LLM with context
        answer = chain.invoke({
            "context": context,
            "question": question,
            "history": request.history
        })

        if not answer:
            raise HTTPException(status_code=500, detail="something wrong with llm api.")

        # print(f"LLM Answer: {answer}")
        return ChatResponse(reply=answer, sources=list(set(sources)))
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating chat response: {str(e)}"
        )   