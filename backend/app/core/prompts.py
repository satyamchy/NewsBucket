from datetime import date

def build_prompt(category: str) -> str:
    today = date.today().strftime("%B %d, %Y")
    
    return f"""
You are a professional news analyst. Today's date is {today}.

Search the web for the latest {category} news today.
Find news from multiple different sources.

For each major news story found, provide:
- A clear headline
- A 3-5 line summary in simple language
- The source name
- How recent it is

Focus on the TOP 10 most important stories.

Format your response as a valid JSON array like this:
[
  {{
    "headline": "News headline here",
    "summary": "3-5 line summary of the story here.",
    "source": "Source website name",
    "category": "{category}",
    "url": "https://link-to-full-article.com",
    "time": "exact date or X hours ago or today"
  }}
]

Return ONLY the JSON array. No extra text before or after.
"""