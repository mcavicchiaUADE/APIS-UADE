const CategoryPill = ({ category, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
        isSelected 
          ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium" 
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      {category.name}
    </button>
  )
}
export default CategoryPill
