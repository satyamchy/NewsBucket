from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.components.response_method import get_news
from app.core.config import CATEGORIES
from app.core.config import CACHE_DURATION

router = APIRouter()

# Request model
class NewsRequest(BaseModel):
    category: str


# Get categories
@router.get("/categories")
def get_categories():
    return {"categories": CATEGORIES, "cache_duration_seconds": CACHE_DURATION}


# Main news endpoint
@router.post("/news")
async def fetch_news(request: NewsRequest):
    # Validate category
    if request.category not in CATEGORIES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid category. Choose from: {CATEGORIES}"
        )
    
    try:
        articles = get_news(request.category)
        return {
            "success": True,
            "category": request.category,
            "count": len(articles),
            "articles": articles
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching news: {str(e)}"
        )

# Clear cache endpoint (useful for testing)
@router.delete("/cache")
def clear_cache():
    from app.components.response_method import cache
    cache.clear()
    return {"message": "Cache cleared successfully"}