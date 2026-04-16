import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import NewsGrid from './components/NewsGrid'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import { fetchNews } from './api/newsApi'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('India')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
          'Failed to connect to backend. Is it running?'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Navbar */}
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
        onClose={() => setSidebarOpen(false)}

      />

      {/* Main */}
      <main className="pt-16">
        {/* Category Banner */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
          <div
            className="max-w-5xl mx-auto flex items-center
                       justify-between gap-4"
          >
            <p className="text-sm text-slate-600">
              Showing latest{' '}
              <span className="font-semibold text-emerald-700">
                {selectedCategory}
              </span>{' '}
              news
            </p>

            <p className="text-xs text-slate-400 whitespace-nowrap">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <section className="bg-slate-100">
          {loading && (
            <LoadingSpinner category={selectedCategory} />
          )}

          {error && !loading && (
            <ErrorMessage
              message={error}
              onRetry={() => loadNews(selectedCategory)}
            />
          )}

          {!loading &&
            !error &&
            articles.length > 0 && (
              <NewsGrid
                articles={articles}
                category={selectedCategory}
              />
            )}

          {!loading &&
            !error &&
            articles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-400 text-sm">
                  No news found. Try again!
                </p>
              </div>
            )}
        </section>
      </main>

      {/* Footer */}
      <footer
        className="bg-slate-50 border-t border-slate-200
                   mt-8 py-5 text-center"
      >
        <p className="text-xs text-slate-500">
          © 2026 NewsBucket · Powered by AI · Built with
          FastAPI + LangChain + React
        </p>
      </footer>
    </div>
  )
}