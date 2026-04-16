export default function LoadingSpinner({ category }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

      {/* Header skeleton */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-5 bg-red-300 rounded animate-pulse" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* 2 col skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-sm
                       overflow-hidden flex"
          >
            {/* Image skeleton */}
            <div className="w-40 h-36 bg-gray-200 animate-pulse flex-shrink-0" />

            {/* Text skeleton */}
            <div className="flex-1 p-4">
              <div className="h-3 w-16 bg-gray-200 rounded
                              animate-pulse mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded
                              animate-pulse mb-1" />
              <div className="h-4 w-4/5 bg-gray-200 rounded
                              animate-pulse mb-3" />
              <div className="h-3 w-full bg-gray-100 rounded
                              animate-pulse mb-1" />
              <div className="h-3 w-3/4 bg-gray-100 rounded
                              animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Loading text */}
      <p className="text-center text-sm text-gray-400 mt-6">
        AI is searching the web for latest {category} news...
      </p>

    </div>
  )
}