const CATEGORIES = [
  { name: 'India', emoji: '🇮🇳' },
  { name: 'World', emoji: '🌍' },
  { name: 'Sports', emoji: '🏏' },
  { name: 'USA', emoji: '' },
  { name: 'EUROPE', emoji: '' },
  { name: 'WEST ASIA', emoji: '' },
  { name: 'WARS', emoji: '' },
  { name: 'Technology', emoji: '💻' },
  { name: 'Business', emoji: '📈' },
  { name: 'Entertainment', emoji: '🎬' },
  { name: 'Health', emoji: '⚕️' },
]

export default function CategoryBar({ selected, onSelect, loading }) {
  return (
    <div className="border-b border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-950 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 gap-4 overflow-x-auto">
        <div className="flex px-4 py-4 gap-2 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => !loading && onSelect(cat.name)}
              disabled={loading}
              className={`
                px-5 py-3 text-sm font-sans font-medium
                border-r border-gray-200 dark:border-gray-700
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${selected === cat.name
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
                }
              `}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}