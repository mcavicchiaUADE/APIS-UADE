import { useState } from "react"
import { Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { api } from "../services/api"
import { formatPrice, formatDate } from "../utils/formatters"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState from "../components/EmptyState"
import { Plus, Edit, Trash2, Package, Eye } from "lucide-react"
const DashboardProducts = () => {
  const { user } = useAuth()
  const { success, error } = useToast()
  const [isDeleting, setIsDeleting] = useState(null)
  const { data: products, loading, refetch } = useFetch(() => api.getProducts(), [])
  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar "${productName}"? Esta acción no se puede deshacer.`)) {
      return
    }
    setIsDeleting(productId)
    try {
      await api.deleteProduct(productId)
      success("Producto eliminado exitosamente")
      refetch()
    } catch (err) {
      error("Error al eliminar el producto: " + err.message)
    } finally {
      setIsDeleting(null)
    }
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
  if (!products || products.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Productos</h1>
          <Link to="/dashboard/products/new" className="btn btn-primary flex items-center gap-2">
            <Plus size={18} />
            Nuevo Producto
          </Link>
        </div>
        <EmptyState
          icon={Package}
          title="No tienes productos"
          description="Comienza creando tu primer producto para vender"
          action={
            <Link to="/dashboard/products/new" className="btn btn-primary">
              Crear mi primer producto
            </Link>
          }
        />
      </div>
    )
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Productos</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Gestiona tu inventario de productos
          </p>
        </div>
        <Link to="/dashboard/products/new" className="btn btn-primary flex items-center gap-2">
          <Plus size={18} />
          Nuevo Producto
        </Link>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
              {products.map((product) => {
                const isOutOfStock = product.stock === 0
                const isLowStock = product.stock > 0 && product.stock <= 5
                return (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={product.images?.[0] || "/placeholder.svg?height=48&width=48"}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          isOutOfStock
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : isLowStock
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {isOutOfStock ? "Sin stock" : isLowStock ? "Stock bajo" : "En stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/product/${product.id}`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                          title="Ver producto"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/dashboard/products/${product.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1"
                          title="Editar producto"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={isDeleting === product.id}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Eliminar producto"
                        >
                          {isDeleting === product.id ? (
                            <LoadingSpinner size="sm" className="border-red-600 border-t-transparent" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Productos</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-semibold text-sm">✓</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">En Stock</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {products.filter(p => p.stock > 0).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400 font-semibold text-sm">!</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sin Stock</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {products.filter(p => p.stock === 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardProducts
