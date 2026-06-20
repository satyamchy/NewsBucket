"""
ingest.py — Loads portfolio data.json into ChromaDB.
Run once (or re-run to refresh): python ingest.py
"""
import chromadb
from chromadb.utils import embedding_functions
from pathlib import Path

# ── ChromaDB setup ────────────────────────────────────────────────────────────
CHROMA_PATH = Path(__file__).resolve().parents[2] / "chroma_db"

chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)

embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

collection = chroma_client.get_or_create_collection(
    name="portfolio",
    embedding_function=embedding_fn,
)

