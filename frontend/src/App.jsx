// import './App.css'

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import CategoryBar from './components/CategoryBar'
import NewsGrid from './components/NewsGrid'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import { fetchNews } from './api/newsApi'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('India')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Apply dark mode to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Fetch news on category change
  useEffect(() => {
    loadNews(selectedCategory)
  }, [selectedCategory])

  const loadNews = async (category) => {
    setLoading(true)
    setError(null)
    setArticles([])

    try {
      const data = await fetchNews(category)
      setArticles(data.articles)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Failed to fetch news. Make sure your backend is running!'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950
                    text-black dark:text-white transition-colors duration-300">

      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Category Bar */}
      <CategoryBar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        loading={loading}
      />

      {/* Main Content */}
      <main>
        {loading && (
          <LoadingSpinner category={selectedCategory} />
        )}

        {error && !loading && (
          <ErrorMessage
            message={error}
            onRetry={() => loadNews(selectedCategory)}
          />
        )}

        {!loading && !error && articles.length > 0 && (
          <NewsGrid
            articles={articles}
            category={selectedCategory}
          />
        )}

        {/* Welcome state */}
        {!loading && !error && articles.length === 0 && (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <p className="font-playfair text-3xl text-gray-300
                          dark:text-gray-700">
              Select a category above to load news
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black dark:border-white
                         mt-16 py-6 text-center">
        <p className="font-playfair text-lg font-bold
                      text-black dark:text-white">
          NewsBucket
        </p>
        <p className="text-xs text-gray-400 font-sans mt-1">
          Powered by AI · Built with FastAPI + LangChain + React
        </p>
      </footer>

    </div>
  )
}