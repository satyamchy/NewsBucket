export default function LoadingSpinner({ category }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">

      {/* Animated dots */}
      <div className="flex justify-center gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-black dark:bg-white rounded-full
                       animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      <p className="font-playfair text-2xl text-black dark:text-white mb-2">
        Fetching {category} News...
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
        AI is searching the web and summarizing stories for you
      </p>

      {/* Skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                      gap-6 mt-10 text-left">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-gray-700
                       bg-white dark:bg-gray-900 p-5"
          >
            <div className="h-1 bg-gray-200 dark:bg-gray-700 mb-4 animate-pulse" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded
                            w-1/4 mb-4 animate-pulse" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded
                            w-full mb-2 animate-pulse" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded
                            w-3/4 mb-4 animate-pulse" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded
                            w-full mb-2 animate-pulse" />
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded
                            w-5/6 animate-pulse" />
          </div>
        ))}
      </div>

    </div>
  )
}