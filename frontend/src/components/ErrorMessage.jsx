import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-center">
      <FiAlertTriangle size={36} className="mx-auto mb-3 text-red-400" />
      <h3 className="text-lg font-bold text-gray-800 mb-1">
        Could not load news
      </h3>
      <p className="text-sm text-gray-500 mb-5">
        {message || 'Please make sure your backend is running.'}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2
                   bg-red-500 text-white text-sm font-medium
                   rounded-sm hover:bg-red-600 transition-colors"
      >
        <FiRefreshCw size={14} />
        Try Again
      </button>
    </div>
  )
}