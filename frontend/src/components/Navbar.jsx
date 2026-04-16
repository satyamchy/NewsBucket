import { FiMenu, FiX } from 'react-icons/fi'
import { MdNewspaper } from 'react-icons/md'

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50
                 h-16 px-4 md:px-6
                 bg-slate-100 border-b border-slate-300
                 shadow-sm flex items-center gap-4"
    >
      {/* Left: Hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="flex items-center gap-2 text-slate-700
                   hover:text-slate-900 transition-colors"
      >
        {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        <span className="text-sm font-medium hidden sm:block">
          Menu
        </span>
      </button>

      {/* Center: Brand */}
      <div className="flex-1 flex justify-center items-center gap-3">
        <MdNewspaper
          size={30}
          className="text-emerald-700"
        />

        <div className="text-center">
          <h1
            className="font-playfair text-3xl md:text-4xl font-extrabold
                       text-slate-900 tracking-tight leading-none"
          >
            NewsBucket
          </h1>

          <p
            className="text-[10px] md:text-xs uppercase tracking-[0.28em]
                       text-slate-500 mt-1"
          >
                      AI-Powered News from Across the Web
          </p>
        </div>
      </div>

      {/* Right spacer for balance */}
      <div className="w-16 sm:w-20" />
    </nav>
  )
}