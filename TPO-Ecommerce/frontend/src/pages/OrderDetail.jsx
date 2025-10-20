import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { useFetch } from "../hooks/useFetch"
import { api } from "../services/api"
import { formatPrice, formatDate } from "../utils/formatters"
import LoadingSpinner from "../components/LoadingSpinner"
import ConfirmModal from "../components/ConfirmModal"
import { ArrowLeft, Package, MapPin, FileText, X, Clock, CheckCircle, Truck, XCircle } from "lucide-react"

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { success, error } = useToast()
  const [isCanceling, setIsCanceling] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  // Fetch order details
  const { data: order, loading, error: fetchError, refetch } = useFetch(
    () => api.getOrder(id),
    [id]
  )

  // Get status configuration
  const getStatusConfig = (status) => {
    const configs = {
      PENDIENTE: {
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: Clock,
        text: "Pendiente",
        description: "Tu pedido está siendo procesado"
      },
      CONFIRMADO: {
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        icon: CheckCircle,
        text: "Confirmado",
        description: "Tu pedido ha sido confirmado"
      },
      PREPARANDO: {
        color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
        icon: Package,
        text: "Preparando",
        description: "Los vendedores están preparando tu pedido"
      },
      ENVIADO: {
        color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        icon: Truck,
        text: "Enviado",
        description: "Tu pedido está en camino"
      },
      EN_TRANSITO: {
        color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        icon: Truck,
        text: "En Tránsito",
        description: "Tu pedido está en tránsito"
      },
      ENTREGADO: {
        color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        icon: CheckCircle,
        text: "Entregado",
        description: "Tu pedido ha sido entregado"
      },
      CANCELADO: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
        text: "Cancelado",
        description: "El pedido fue cancelado"
      },
      CANCELADO_COMPRADOR: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
        text: "Cancelado",
        description: "Cancelaste este pedido"
      },
      CANCELADO_VENDEDOR: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
        text: "Cancelado por Vendedor",
        description: "El vendedor canceló este pedido"
      }
    }

    return configs[status] || configs.PENDIENTE
  }

  // Handle cancel order
  const handleCancelOrder = async () => {
    setIsCanceling(true)
    try {
      await api.cancelOrder(order.id)
      success("Pedido cancelado exitosamente")
      setShowCancelModal(false)
      refetch()
    } catch (err) {
      error("Error al cancelar el pedido: " + err.message)
    } finally {
      setIsCanceling(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (fetchError || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Pedido no encontrado
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {fetchError || "El pedido que buscas no existe."}
        </p>
        <Link to="/orders" className="btn btn-primary">
          Ver mis pedidos
        </Link>
      </div>
    )
  }

  const statusConfig = getStatusConfig(order.estado)
  const StatusIcon = statusConfig.icon

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a mis pedidos
      </Link>

      {/* Order Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Pedido #{order.id}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Realizado el {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatPrice(order.total)}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className={`p-4 rounded-lg ${statusConfig.color} flex items-center gap-3`}>
          <StatusIcon className="w-6 h-6" />
          <div>
            <p className="font-semibold">{statusConfig.text}</p>
            <p className="text-sm opacity-90">{statusConfig.description}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Productos
        </h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-blue-500"
            >
              {item.productoImagen && (
                <img
                  src={item.productoImagen}
                  alt={item.productoNombre}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {item.productoNombre}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatPrice(item.precioUnitario)} × {item.cantidad} unidad{item.cantidad !== 1 ? 'es' : ''}
                </p>
                {item.vendedorNombre && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    👤 Vendido por: <span className="font-medium">{item.vendedorNombre}</span>
                  </p>
                )}
                {item.estadoItem && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Estado: {item.estadoItem.replace(/_/g, ' ')}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatPrice(item.subtotal)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      {order.direccionEnvio && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Dirección de Envío
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {order.direccionEnvio}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {order.notas && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Notas del Pedido
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {order.notas}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Button */}
      {order.estado === "PENDIENTE" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                ¿Necesitas cancelar este pedido?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Puedes cancelar el pedido mientras esté en estado Pendiente. El stock será restaurado.
              </p>
            </div>
            <button
              onClick={() => setShowCancelModal(true)}
              disabled={isCanceling}
              className="btn btn-danger inline-flex items-center gap-2 whitespace-nowrap"
            >
              <X className="w-4 h-4" />
              Cancelar Pedido
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirm Modal */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => !isCanceling && setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        title="Cancelar Pedido"
        message="¿Estás seguro de que deseas cancelar este pedido? El stock será restaurado automáticamente."
        confirmText="Sí, cancelar pedido"
        cancelText="No, mantener pedido"
        confirmButtonClass="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        isLoading={isCanceling}
      />
    </div>
  )
}

export default OrderDetail

