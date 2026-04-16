import json
# import re
from app.core.prompts import build_prompt
from app.core.config import CACHE_DURATION
# from app.core.config import CATEGORIES
from app.services.llm import get_llm
from app.services.web_search import get_search_tool

# Simple in-memory cache
cache = {}

def get_news(category: str) -> list:
    # Check cache first
    import time
    
    cache_key = category.lower()
    current_time = time.time()
    
    if cache_key in cache:
        cached_data, cached_time = cache[cache_key]
        if current_time - cached_time < CACHE_DURATION:
            print(f"Returning cached news for: {category}")
            return cached_data
    
    print(f"Fetching fresh news for: {category}")

    
    # Build prompt
    prompt_text = build_prompt(category)
    
    # Use simple LLM chain approach
    # Search first, then summarize
    search_query = f"latest {category} news headlines  {__import__('datetime').date.today().strftime('%B %Y')}"
    # print(f"search query for duckduckgo--- {search_query}")

    try:
        # Step 1: Search the web
        
        search_tool = get_search_tool()
        tools = [search_tool]
        search_results = search_tool.run(search_query)
        # print(f"web search results---> {search_results}.....")  
        
        # Step 2: Ask LLM to summarize results as JSON
        full_prompt = f"""
{prompt_text}

Here are the search results from the web:
{search_results}

Based on these search results, extract and summarize the top news stories.
Return ONLY a valid JSON array. No markdown, no code blocks, just raw JSON.
"""
        
        llm = get_llm()
        response = llm.invoke(full_prompt)
        response_text = response.content.strip()
        # print(f"LLM response--- {response_text[0]}...") 

        # Clean response — remove markdown if present
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()
        
        # Parse JSON
        articles = json.loads(response_text)

        # Save to cache
        cache[cache_key] = (articles, current_time)
        
        return articles
        
    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}")
        print(f"Response was: {response_text}")
        # Return fallback
        return [{
            "headline": f"Latest {category} News",
            "summary": "Unable to parse news at this moment. Please try again.",
            "source": "NewsBucket",
            "category": category,
            "time": "just now"
        }]
    except Exception as e:
        print(f"Error fetching news: {e}")
        raise e