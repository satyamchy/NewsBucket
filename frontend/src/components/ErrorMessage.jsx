import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <FiAlertTriangle
        size={48}
        className="mx-auto mb-4 text-red-500"
      />
      <h3 className="font-playfair text-2xl text-black dark:text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 font-sans">
        {message || 'Unable to fetch news. Please try again.'}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 mx-auto px-6 py-2
                   bg-black dark:bg-white text-white dark:text-black
                   text-sm font-sans font-medium
                   hover:opacity-80 transition-opacity"
      >
        <FiRefreshCw size={14} />
        Try Again
      </button>
    </div>
  )
}