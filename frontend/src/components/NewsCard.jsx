import { FiExternalLink, FiClock } from 'react-icons/fi'

const categoryColors = {
  India: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  World: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Sports: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Technology: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Business: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Entertainment: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  Health: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
}

export default function NewsCard({ article, index }) {
  const isFeatured = index === 0

  return (
    <div className={`
      border border-gray-200 dark:border-gray-700
      bg-white dark:bg-gray-900
      hover:shadow-lg transition-shadow duration-200
      ${isFeatured ? 'md:col-span-2' : ''}
    `}>

      {/* Card top accent line */}
      <div className="h-1 bg-black dark:bg-white" />

      <div className="p-5">

        {/* Category + Time */}
        <div className="flex items-center justify-between mb-3">
          <span className={`
            text-xs font-sans font-semibold px-2 py-1 rounded-sm uppercase tracking-wider
            ${categoryColors[article.category] || categoryColors['World']}
          `}>
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <FiClock size={11} />
            {article.time}
          </span>
        </div>

        {/* Headline */}
        <h2 className={`
          font-playfair font-bold text-black dark:text-white
          leading-tight mb-3
          ${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'}
        `}>
          {article.headline}
        </h2>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 mb-3" />

        {/* Summary */}
        <p className={`
          text-gray-600 dark:text-gray-400 font-sans leading-relaxed
          ${isFeatured ? 'text-base' : 'text-sm'}
        `}>
          {article.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3
                        border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs font-sans font-semibold text-gray-500
                           dark:text-gray-400 uppercase tracking-wider">
            {article.source}
          </span>
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-black
                         dark:text-white hover:opacity-60 transition-opacity"
            >
              Read more <FiExternalLink size={12} />
            </a>
          )}
        </div>

      </div>
    </div>
  )
}