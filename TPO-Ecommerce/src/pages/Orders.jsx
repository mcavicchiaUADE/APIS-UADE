import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { useFetch } from "../hooks/useFetch"
import { api } from "../services/api"
import { formatPrice, formatDate } from "../utils/formatters"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState from "../components/EmptyState"
import { Package, Eye, X, Clock, CheckCircle, Truck, XCircle, RefreshCw } from "lucide-react"

const Orders = () => {
  const { user } = useAuth()
  const { success, error } = useToast()
  const [cancelingOrderId, setCancelingOrderId] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  // Fetch user orders
  const { data: orders, loading, error: fetchError, refetch } = useFetch(
    () => api.getMyOrders(),
    []
  )

  // No auto-refresh, solo manual cuando el usuario quiera

  // Handle manual refresh
  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
      success("Pedidos actualizados")
    } catch (err) {
      error("Error al actualizar pedidos: " + err.message)
    } finally {
      setRefreshing(false)
    }
  }

  // Handle cancel order
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("¿Estás seguro de que quieres cancelar este pedido?")) {
      return
    }

    setCancelingOrderId(orderId)
    try {
      await api.cancelOrder(orderId)
      success("Pedido cancelado exitosamente. El stock ha sido restaurado.")
      refetch()
    } catch (err) {
      error("Error al cancelar el pedido: " + err.message)
    } finally {
      setCancelingOrderId(null)
    }
  }

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDIENTE: {
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: Clock,
        text: "Pendiente"
      },
      CONFIRMADO: {
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        icon: CheckCircle,
        text: "Confirmado"
      },
      PREPARANDO: {
        color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
        icon: Package,
        text: "Preparando"
      },
      ENVIADO: {
        color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        icon: Truck,
        text: "Enviado"
      },
      EN_TRANSITO: {
        color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        icon: Truck,
        text: "En Tránsito"
      },
      ENTREGADO: {
        color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        icon: CheckCircle,
        text: "Entregado"
      },
      CANCELADO: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
        text: "Cancelado"
      },
      CANCELADO_COMPRADOR: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
        text: "Cancelado por Comprador"
      },
      CANCELADO_VENDEDOR: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
        text: "Cancelado por Vendedor"
      },
      DEVOLUCION_SOLICITADA: {
        color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        icon: XCircle,
        text: "Devolución Solicitada"
      },
      DEVUELTO: {
        color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
        icon: XCircle,
        text: "Devuelto"
      }
    }

    const config = statusConfig[status] || statusConfig.PENDIENTE
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4" />
        {config.text}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Error al cargar pedidos
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{fetchError}</p>
        <button onClick={refetch} className="btn btn-primary">
          Reintentar
        </button>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No tienes pedidos"
        description="Aún no has realizado ninguna compra. ¡Explora nuestros productos!"
        action={
          <Link to="/" className="btn btn-primary">
            Ver productos
          </Link>
        }
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mis Pedidos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Historial completo de tus compras
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {refreshing ? (
            <LoadingSpinner size="sm" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {refreshing ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Order Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Pedido #{order.id}
                    </h3>
                    {getStatusBadge(order.estado)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Realizado el {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(order.total)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    {item.productoImagen && (
                      <img
                        src={item.productoImagen}
                        alt={item.productoNombre}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {item.productoNombre}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cantidad: {item.cantidad} × {formatPrice(item.precioUnitario)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatPrice(item.subtotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Shipping Address */}
              {order.direccionEnvio && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                    Dirección de envío:
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    {order.direccionEnvio}
                  </p>
                </div>
              )}
              
              {/* Notes */}
              {order.notas && (
                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Notas:
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.notas}
                  </p>
                </div>
              )}
            </div>

            {/* Order Actions */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <Link
                to={`/orders/${order.id}`}
                className="btn btn-secondary inline-flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Ver Detalle
              </Link>
              
              {order.estado === "PENDIENTE" && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  disabled={cancelingOrderId === order.id}
                  className="btn btn-danger inline-flex items-center gap-2"
                >
                  {cancelingOrderId === order.id ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Cancelando...
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4" />
                      Cancelar Pedido
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders

