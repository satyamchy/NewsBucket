import { FiExternalLink, FiClock } from 'react-icons/fi'

const categoryColors = {
  India:
    'bg-orange-50 text-orange-700 border-orange-200',
  World:
    'bg-blue-50 text-blue-700 border-blue-200',
  Sports:
    'bg-green-50 text-green-700 border-green-200',
  Technology:
    'bg-purple-50 text-purple-700 border-purple-200',
  Business:
    'bg-amber-50 text-amber-700 border-amber-200',
  Entertainment:
    'bg-pink-50 text-pink-700 border-pink-200',
  Health:
    'bg-teal-50 text-teal-700 border-teal-200',
}

const accentColors = {
  India: 'bg-orange-500',
  World: 'bg-blue-500',
  Sports: 'bg-green-500',
  Technology: 'bg-purple-500',
  Business: 'bg-amber-500',
  Entertainment: 'bg-pink-500',
  Health: 'bg-teal-500',
}

export default function NewsCard({ article, index }) {
  const isFeatured = index === 0

  const badgeColor =
    categoryColors[article.category] || categoryColors.World

  const topAccent =
    accentColors[article.category] || accentColors.World

  return (
    <div
      className={`
        border border-slate-200
        bg-white
        hover:shadow-lg hover:-translate-y-0.5
        transition-all duration-200
        rounded-sm overflow-hidden
        ${isFeatured ? 'md:col-span-2' : ''}
      `}
    >
      {/* Top Accent */}
      <div className={`h-1 ${topAccent}`} />

      <div className="p-5">
        {/* Category + Time */}
        <div className="flex items-center justify-between mb-3 gap-3">
          <span
            className={`
              text-xs font-semibold px-2.5 py-1 rounded-sm
              uppercase tracking-wider border
              ${badgeColor}
            `}
          >
            {article.category}
          </span>

          <span className="flex items-center gap-1 text-xs text-slate-400">
            <FiClock size={11} />
            {article.time}
          </span>
        </div>

        {/* Headline */}
        <h2
          className={`
            font-playfair font-bold text-slate-900
            leading-tight mb-3
            ${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'}
          `}
        >
          {article.headline}
        </h2>

        {/* Divider */}
        <div className="border-t border-slate-200 mb-3" />

        {/* Summary */}
        <p
          className={`
            text-slate-600 leading-relaxed
            ${isFeatured ? 'text-base' : 'text-sm'}
          `}
        >
          {article.summary}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between mt-4 pt-3
                     border-t border-slate-100 gap-3"
        >
          <span
            className="text-xs font-semibold text-slate-500
                       uppercase tracking-wider"
          >
            {article.source}
          </span>

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs
                         text-emerald-700 hover:text-emerald-900
                         font-medium transition-colors"
            >
              Read more <FiExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}