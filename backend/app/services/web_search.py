from langchain_community.tools import DuckDuckGoSearchRun

# Setup DuckDuckGo search tool

def get_search_tool():
    return DuckDuckGoSearchRun()