import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useToast } from "../context/ToastContext"
import { formatPrice } from "../utils/formatters"
import { ShoppingCart, Eye } from "lucide-react"
const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { success, error } = useToast()
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.stock === 0) {
      error("Producto sin stock")
      return
    }
    addToCart(product)
    success(`${product.name} agregado al carrito`)
  }
  const isOutOfStock = product.stock === 0
  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
          <img
            src={product.images?.[0] || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">Sin Stock</span>
            </div>
          )}
          {/* Quick view button */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 bg-white dark:bg-gray-600 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-500">
              <Eye size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatPrice(product.price)}</span>
            <span className={`text-sm ${isOutOfStock ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
              {isOutOfStock ? "Sin stock" : `${product.stock} disponibles`}
            </span>
          </div>
        </div>
      </Link>
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            isOutOfStock
              ? "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          }`}
        >
          <ShoppingCart size={16} />
          {isOutOfStock ? "Sin Stock" : "Agregar al Carrito"}
        </button>
      </div>
    </div>
  )
}
export default ProductCard
