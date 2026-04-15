from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.routes.chat import router as chat_router


app = FastAPI(
    title="NewsBucket API",
    description="AI-powered news aggregator backend",
    version="1.0.0"
)

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/v1")

# Health check
@app.get("/")
def root():
    return {
        "message": "NewsBucket API is running!",
        "version": "1.0.0"
    }


# cd Desktop\newsbucket\backend
# venv\Scripts\activate
# uvicorn app.main:app --reload
# {
#   "query": "Latest AI trends in 2026"
# }