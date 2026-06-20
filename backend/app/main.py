from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.routes.newsBucket import router as newsbucket_router
from app.routes.portfolio_route import router as portfolio_route
from app.routes.vectorDB_chat_route import router as vectorDB_chat_route
from apscheduler.schedulers.background import BackgroundScheduler
import requests
scheduler = BackgroundScheduler()

# ── App setup ─────────────────────────────────────────────────────────────────
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

app.include_router(newsbucket_router, prefix="/v1")
app.include_router(portfolio_route, prefix="/api")
app.include_router(vectorDB_chat_route, prefix="/api/messages")

# Health check
@app.get("/")
def root():
    return {
        "message": "NewsBucket API is running!",
        "version": "1.0.0"
    }

def ping_api():
    response = requests.get( "https://newsbucket-backend.onrender.com/api/" or "http://127.0.0.1:8000/")
    print(response.json())

scheduler.add_job(
    ping_api,
    trigger="cron",
    hour="8,10,12,14,16,18,20",
    minute=0
)

scheduler.start()


# cd Desktop\newsbucket\backend
# venv\Scripts\activate
# python -m app.portfolio.ingest
# uvicorn app.main:app --reload
# {
#   "query": "Latest AI trends in 2026"
# }