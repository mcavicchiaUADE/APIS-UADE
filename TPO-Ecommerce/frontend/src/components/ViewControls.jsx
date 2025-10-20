import { Grid, List, ChevronDown } from "lucide-react"

const ViewControls = ({ 
  itemsPerPage, 
  onItemsPerPageChange, 
  viewMode, 
  onViewModeChange, 
  totalItems,
  currentPage,
  totalPages 
}) => {
  const itemsPerPageOptions = [6, 9, 12, 18, 24, 36]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Results info */}
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} productos
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Items per page selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="items-per-page" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Mostrar:
          </label>
          <div className="relative">
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option} por página
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            title="Vista en cuadrícula"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            title="Vista en lista"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewControls
