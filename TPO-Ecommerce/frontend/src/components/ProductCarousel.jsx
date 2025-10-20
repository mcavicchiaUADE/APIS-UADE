import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { formatPrice } from "../utils/formatters"

const ProductCarousel = ({ products, title = "Productos Destacados" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || products.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, products.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
    setIsAutoPlaying(false) // Stop auto-play when user interacts
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
    setIsAutoPlaying(false) // Stop auto-play when user interacts
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false) // Stop auto-play when user interacts
  }

  if (!products || products.length === 0) return null

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-600"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-600"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product, index) => (
            <div key={product.id} className="w-full flex-shrink-0">
              <div className="relative h-80 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative h-full flex items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full px-8">
                    {/* Product Image */}
                    <div className="flex justify-center lg:justify-end">
                      <div className="relative w-64 h-64">
                        <img
                          src={product.images?.[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg shadow-2xl"
                        />
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                              Sin Stock
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center text-white">
                      <div className="mb-4">
                        <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                        <p className="text-lg opacity-90 line-clamp-2">{product.description}</p>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={`${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm opacity-90">(4.0) • 24 reseñas</span>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
                        <span className={`text-lg font-medium ${product.stock === 0 ? "text-red-300" : "text-green-300"}`}>
                          {product.stock === 0 ? "Sin stock" : `${product.stock} disponibles`}
                        </span>
                      </div>

                      <Link
                        to={`/product/${product.id}`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        Ver Producto
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      {products.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-lg transition-colors ${
                index === currentIndex
                  ? "bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCarousel
