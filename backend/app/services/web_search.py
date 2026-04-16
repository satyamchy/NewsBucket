from langchain_community.tools import DuckDuckGoSearchResults

# Setup DuckDuckGo search tool

def get_search_tool():
    return DuckDuckGoSearchResults(output_format="list")