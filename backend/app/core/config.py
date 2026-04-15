from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Categories supported
CATEGORIES = [
    "India",
    "World",
    "USA",
    "EUROPE",
    "WEST ASIA",
    "WARS",
    "Sports",
    "Technology",
    "Business",
    "Entertainment",
    "Health"
]

# Cache duration in seconds (30 minutes)
CACHE_DURATION = 1800