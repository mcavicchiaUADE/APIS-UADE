import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useToast } from "../context/ToastContext"
import { formatPrice } from "../utils/formatters"
import { ShoppingCart, Star, Package } from "lucide-react"

const ProductListItem = ({ product }) => {
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
  const images = product.images || ["/placeholder.svg?height=200&width=200"]

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/product/${product.id}`}>
            <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden group">
              <img
                src={images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    Sin Stock
                  </span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link to={`/product/${product.id}`} className="block group">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">(4.0) • 24 reseñas</span>
              </div>

              {/* Price and Stock */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(product.price)}
                  </span>
                  <span className={`text-sm font-medium ${isOutOfStock ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                    {isOutOfStock ? "Sin stock" : `${product.stock} disponibles`}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isOutOfStock
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                      : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  }`}
                >
                  <ShoppingCart size={16} />
                  {isOutOfStock ? "Sin Stock" : "Agregar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock indicator */}
      {!isOutOfStock && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Disponibilidad:</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    product.stock > 10 ? "bg-green-500" : product.stock > 5 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-xs">
                {product.stock > 10 ? "En stock" : product.stock > 0 ? "Pocas unidades" : "Agotado"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductListItem
