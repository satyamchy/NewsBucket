import NewsCard from './NewsCard'

export default function NewsGrid({ articles, category }) {
  if (!articles || articles.length === 0) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-6 pb-3
                      border-b-2 border-black dark:border-white">
        <h2 className="font-playfair text-3xl font-bold
                       text-black dark:text-white">
          {category} News
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-sans">
          {articles.length} stories
        </span>
      </div>

      {/* News grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            index={index}
          />
        ))}
      </div>

    </div>
  )
}