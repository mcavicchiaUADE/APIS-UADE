const SkeletonLoader = ({ type = "card", count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i)
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {skeletons.map((index) => (
          <div key={index} className="card overflow-hidden animate-pulse rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-3 bg-gray-200 rounded-lg w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-5 bg-gray-200 rounded-lg w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-1/4"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (type === "list") {
    return (
      <div className="space-y-4">
        {skeletons.map((index) => (
          <div key={index} className="card p-6 animate-pulse rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded-lg w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-1/3"></div>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return null
}
export default SkeletonLoader
