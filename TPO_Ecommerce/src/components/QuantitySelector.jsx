import { useState } from "react"
import { Minus, Plus } from "lucide-react"
const QuantitySelector = ({ quantity = 1, min = 1, max = 99, onChange, disabled = false, size = "md" }) => {
  const [value, setValue] = useState(quantity)
  const handleDecrease = () => {
    const newValue = Math.max(min, value - 1)
    setValue(newValue)
    onChange?.(newValue)
  }
  const handleIncrease = () => {
    const newValue = Math.min(max, value + 1)
    setValue(newValue)
    onChange?.(newValue)
  }
  const handleInputChange = (e) => {
    const newValue = Number.parseInt(e.target.value) || min
    const clampedValue = Math.max(min, Math.min(max, newValue))
    setValue(clampedValue)
    onChange?.(clampedValue)
  }
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }
  const buttonSizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  }
  return (
    <div className={`flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 ${disabled ? "opacity-50" : ""}`}>
      <button
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        className={`${buttonSizeClasses[size]} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:cursor-not-allowed disabled:hover:bg-transparent text-gray-700 dark:text-white`}
        aria-label="Disminuir cantidad"
      >
        <Minus size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
      </button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        min={min}
        max={max}
        className={`${sizeClasses[size]} text-center border-0 focus:outline-none focus:ring-0 w-16 disabled:bg-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      />
      <button
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        className={`${buttonSizeClasses[size]} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:cursor-not-allowed disabled:hover:bg-transparent text-gray-700 dark:text-white`}
        aria-label="Aumentar cantidad"
      >
        <Plus size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
      </button>
    </div>
  )
}
export default QuantitySelector
