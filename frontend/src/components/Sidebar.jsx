const CATEGORIES = [
  { name: 'Top Stories', emoji: '📰' },
  { name: 'India', emoji: '🇮🇳' },
  { name: 'World', emoji: '🌍' },
  { name: 'USA', emoji: '🇺🇸' },
  { name: 'Europe', emoji: '🇪🇺' },
  { name: 'West Asia', emoji: '🌐' },
  { name: 'China', emoji: '🇨🇳' },
  { name: 'Pakistan', emoji: '🇵🇰' },
  { name: 'Russia', emoji: '🇷🇺' },

  { name: 'Wars', emoji: '⚔️' },
  { name: 'Politics', emoji: '🏛️' },
  { name: 'Elections', emoji: '🗳️' },
  { name: 'Crime', emoji: '🚨' },

  { name: 'Sports', emoji: '🏏' },
  { name: 'Cricket', emoji: '🏏' },
  { name: 'Football', emoji: '⚽' },
  { name: 'Tennis', emoji: '🎾' },

  { name: 'Technology', emoji: '💻' },
  { name: 'AI', emoji: '🤖' },
  { name: 'Startups', emoji: '🚀' },
  { name: 'Science', emoji: '🔬' },

  { name: 'Business', emoji: '📈' },
  { name: 'Markets', emoji: '📊' },
  { name: 'Crypto', emoji: '₿' },

  { name: 'Entertainment', emoji: '🎬' },
  { name: 'Bollywood', emoji: '🎥' },
  { name: 'Hollywood', emoji: '🎞️' },

  { name: 'Health', emoji: '⚕️' },
  { name: 'Lifestyle', emoji: '🌿' },
  { name: 'Travel', emoji: '✈️' },

  { name: 'Weather', emoji: '🌦️' },
  { name: 'Education', emoji: '🎓' },
  { name: 'Opinion', emoji: '✍️' }
]
// const CATEGORIES = [
//   { name: 'India', emoji: '🇮🇳' },
//   { name: 'World', emoji: '🌍' },
//   { name: 'Sports', emoji: '🏏' },
//   { name: 'Technology', emoji: '💻' },
//   { name: 'Business', emoji: '📈' },
//   { name: 'Entertainment', emoji: '🎬' },
//   { name: 'Health', emoji: '⚕️' },
// ]

import { FiX } from 'react-icons/fi'

export default function Sidebar({
  open,
  selected,
  onSelect,
  onClose,
}) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* Sidebar starts from top incl. header */}
      <div
        className={`
          fixed top-0 left-0 bottom-0 z-50
          w-64 bg-slate-50 border-r border-slate-200
          shadow-xl
          transform transition-transform duration-300 ease-in-out
          overflow-y-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Top Header Area */}
        <div
          className="h-16 px-4 border-b border-slate-200
                     flex items-center justify-between
                     bg-slate-100"
        >
          <div>
            <p
              className="text-xs font-semibold text-slate-500
                         uppercase tracking-widest"
            >
              Categories
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-md text-slate-600
                       hover:bg-slate-200 hover:text-slate-900
                       transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Category List */}
        <ul className="py-2">
          {CATEGORIES.map((cat) => (
            <li key={cat.name}>
              <button
                onClick={() => {
                  onSelect(cat.name)
                  onClose()
                }}
                className={`
                  w-full flex items-center gap-3
                  px-4 py-3 text-sm text-left
                  transition-colors duration-150
                  ${
                    selected === cat.name
                      ? 'bg-emerald-50 text-emerald-700 font-semibold border-r-2 border-emerald-600'
                      : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                <span className="text-lg">
                  {cat.emoji}
                </span>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-slate-200 mt-4">
          <p className="text-xs text-slate-500 text-center">
            Powered by AI
          </p>
          <p className="text-xs text-slate-400 text-center mt-1">
            FastAPI + LangChain
          </p>
        </div>
      </div>
    </>
  )
}