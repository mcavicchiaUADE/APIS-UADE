import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { useFetch } from "../hooks/useFetch"
import { api } from "../services/api"
import { formatPrice, formatDate } from "../utils/formatters"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState from "../components/EmptyState"
import ConfirmModal from "../components/ConfirmModal"
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle, 
  Package,
  ArrowRight,
  RefreshCw
} from "lucide-react"

const Sales = () => {
  const { user } = useAuth()
  const { success, error } = useToast()
  const [updatingItemId, setUpdatingItemId] = useState(null)
  const [filterStatus, setFilterStatus] = useState("ALL")
  
  // Modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    detalleId: null,
    newStatus: null,
    statusText: ""
  })

  // Fetch sales (ventas)
  const { data: sales, loading, error: fetchError, refetch } = useFetch(
    () => api.getMySales(),
    []
  )

  // Fetch estadísticas
  const { data: stats } = useFetch(
    () => api.getSalesStats(),
    []
  )

  // Open confirm modal
  const openConfirmModal = (detalleId, newStatus) => {
    setConfirmModal({
      isOpen: true,
      detalleId,
      newStatus,
      statusText: getStatusText(newStatus)
    })
  }

  // Close confirm modal
  const closeConfirmModal = () => {
    if (!updatingItemId) {
      setConfirmModal({
        isOpen: false,
        detalleId: null,
        newStatus: null,
        statusText: ""
      })
    }
  }

  // Handle update item status
  const handleUpdateStatus = async () => {
    const { detalleId, newStatus } = confirmModal
    
    setUpdatingItemId(detalleId)
    try {
      await api.updateSaleStatus(detalleId, newStatus)
      success("Estado actualizado exitosamente")
      refetch()
      closeConfirmModal()
    } catch (err) {
      error("Error al actualizar el estado: " + err.message)
    } finally {
      setUpdatingItemId(null)
    }
  }

  // Get status text
  const getStatusText = (status) => {
    const statusMap = {
      PENDIENTE: "Pendiente",
      CONFIRMADO: "Confirmado",
      PREPARANDO: "Preparando",
      ENVIADO: "Enviado",
      EN_TRANSITO: "En Tránsito",
      ENTREGADO: "Entregado",
      CANCELADO_COMPRADOR: "Cancelado por Comprador",
      CANCELADO_VENDEDOR: "Cancelado por Vendedor",
      DEVOLUCION_SOLICITADA: "Devolución Solicitada",
      DEVUELTO: "Devuelto"
    }
    return statusMap[status] || status
  }

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDIENTE: {
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: Clock,
      },
      CONFIRMADO: {
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        icon: CheckCircle,
      },
      PREPARANDO: {
        color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
        icon: Package,
      },
      ENVIADO: {
        color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        icon: Truck,
      },
      EN_TRANSITO: {
        color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        icon: Truck,
      },
      ENTREGADO: {
        color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        icon: CheckCircle,
      },
      CANCELADO_COMPRADOR: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
      },
      CANCELADO_VENDEDOR: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
      },
      DEVOLUCION_SOLICITADA: {
        color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        icon: RefreshCw,
      },
      DEVUELTO: {
        color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
        icon: RefreshCw,
      }
    }

    const config = statusConfig[status] || statusConfig.PENDIENTE
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4" />
        {getStatusText(status)}
      </span>
    )
  }

  // Get next available status
  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      PENDIENTE: "CONFIRMADO",
      CONFIRMADO: "PREPARANDO",
      PREPARANDO: "ENVIADO",
      ENVIADO: "EN_TRANSITO",
      EN_TRANSITO: "ENTREGADO"
    }
    return statusFlow[currentStatus]
  }

  // Check if can cancel
  const canCancel = (status) => {
    return status === "PENDIENTE" || status === "CONFIRMADO"
  }

  // Filter sales
  const filteredSales = filterStatus === "ALL" 
    ? sales 
    : sales?.filter(sale => sale.estadoItem === filterStatus)

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
        <ShoppingBag className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Error al cargar ventas
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{fetchError}</p>
        <button onClick={refetch} className="btn btn-primary">
          Reintentar
        </button>
      </div>
    )
  }

  if (!sales || sales.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="No tienes ventas aún"
        description="Cuando vendas productos, aparecerán aquí."
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mis Ventas
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Gestiona los productos que has vendido
          </p>
        </div>
      </div>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVentas || 0}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">Pendientes</div>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.ventasPendientes || 0}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">Confirmadas</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.ventasConfirmadas || 0}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">Enviadas</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.ventasEnviadas || 0}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">Entregadas</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.ventasEntregadas || 0}</div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus("ALL")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === "ALL"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilterStatus("PENDIENTE")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === "PENDIENTE"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilterStatus("CONFIRMADO")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === "CONFIRMADO"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Confirmadas
        </button>
        <button
          onClick={() => setFilterStatus("ENTREGADO")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === "ENTREGADO"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Entregadas
        </button>
      </div>

      {/* Sales List */}
      <div className="space-y-4">
        {filteredSales?.map((sale) => (
          <div
            key={sale.detalleId}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left: Product Info */}
              <div className="flex gap-4 flex-1">
                {sale.productoImagen && (
                  <img
                    src={sale.productoImagen}
                    alt={sale.productoNombre}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {sale.productoNombre}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pedido #{sale.pedidoId} • {formatDate(sale.fechaPedido)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Comprador: <span className="font-medium">{sale.compradorNombre}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cantidad: <span className="font-medium">{sale.cantidad}</span> • 
                    Total: <span className="font-bold text-gray-900 dark:text-white">{formatPrice(sale.subtotal)}</span>
                  </p>
                  {sale.direccionEnvio && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      📍 {sale.direccionEnvio}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Status and Actions */}
              <div className="flex flex-col items-end gap-3 lg:min-w-[250px]">
                {getStatusBadge(sale.estadoItem)}
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  {/* Next Status Button */}
                  {getNextStatus(sale.estadoItem) && (
                    <button
                      onClick={() => openConfirmModal(sale.detalleId, getNextStatus(sale.estadoItem))}
                      disabled={updatingItemId === sale.detalleId}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {updatingItemId === sale.detalleId ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4" />
                          {getStatusText(getNextStatus(sale.estadoItem))}
                        </>
                      )}
                    </button>
                  )}

                  {/* Cancel Button */}
                  {canCancel(sale.estadoItem) && (
                    <button
                      onClick={() => openConfirmModal(sale.detalleId, "CANCELADO_VENDEDOR")}
                      disabled={updatingItemId === sale.detalleId}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {updatingItemId === sale.detalleId ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Cancelar
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          ))}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={handleUpdateStatus}
        title="Confirmar cambio de estado"
        message={`¿Estás seguro de que deseas cambiar el estado a "${confirmModal.statusText}"?`}
        confirmText="Confirmar"
        cancelText="Cancelar"
        confirmButtonClass="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        isLoading={updatingItemId !== null}
      />
    </div>
  )
}

export default Sales

