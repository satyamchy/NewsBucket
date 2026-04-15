import { FiSun, FiMoon } from 'react-icons/fi'
import { MdNewspaper } from 'react-icons/md'

export default function Navbar({ darkMode, setDarkMode }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className="border-b-2 border-black dark:border-white">

      {/* Top bar */}
      <div className="bg-black dark:bg-white py-1 px-6 flex justify-between items-center">
        <p className="text-white dark:text-black text-xs font-sans">
          {today}
        </p>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-white dark:text-black hover:opacity-70 transition-opacity"
        >
          {darkMode
            ? <FiSun size={16} />
            : <FiMoon size={16} />
          }
        </button>
      </div>

      {/* Logo */}
      <div className="text-center py-6 px-6 border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-center justify-center gap-2 mb-1">
          <MdNewspaper
            size={36}
            className="text-black dark:text-white"
          />
          <h1 className="font-playfair text-5xl md:text-7xl font-extrabold
                         text-black dark:text-white tracking-tight">
            NewsBucket
          </h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-sans
                      tracking-widest uppercase mt-2">
          AI-Powered News from Across the Web
        </p>
      </div>

    </header>
  )
}