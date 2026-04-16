from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Categories supported
CATEGORIES = [
 "Top Stories",
 "India",
 "World",
 "USA",
 "Europe",
 "Wars",
 "West Asia",
 "Politics",
 "Sports",
 "Technology",
 "AI",
 "Business",
 "Markets",
 "Entertainment",
 "Health",
 "Weather"
]

# Cache duration in seconds (30 minutes)
CACHE_DURATION = 3600