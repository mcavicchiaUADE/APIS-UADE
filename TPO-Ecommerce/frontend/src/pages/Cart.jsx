import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useToast } from "../context/ToastContext"
import { api } from "../services/api"
import { formatPrice } from "../utils/formatters"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"
import Modal from "../components/Modal"
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, CreditCard, MapPin, FileText } from "lucide-react"
const Cart = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, total, updateQuantity, removeFromCart, clearCart, checkout } = useCart()
  const { success, error } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [shippingAddress, setShippingAddress] = useState("")
  const [notes, setNotes] = useState("")
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    updateQuantity(productId, newQuantity)
  }
  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId)
    success(`${productName} eliminado del carrito`)
  }
  const handleClearCart = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      clearCart()
      success("Carrito vaciado")
    }
  }
  const handleOpenCheckout = () => {
    if (!user) {
      error("Debes iniciar sesión para finalizar la compra")
      navigate("/login")
      return
    }
    setShowCheckoutModal(true)
  }

  const handleConfirmCheckout = async () => {
    setIsCheckingOut(true)
    try {
      const order = await checkout({
        address: shippingAddress,
        notes: notes
      })
      
      setShowCheckoutModal(false)
      success(`¡Pedido #${order.id} creado exitosamente!`)
      
      // Navegar al detalle del pedido
      setTimeout(() => {
        navigate(`/orders/${order.id}`)
      }, 1000)
    } catch (err) {
      error(err.message || "Error al procesar la compra")
    } finally {
      setIsCheckingOut(false)
    }
  }
  if (items.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Carrito de Compras</h1>
        </div>
        <EmptyState
          icon={ShoppingCart}
          title="Tu carrito está vacío"
          description="Agrega algunos productos para comenzar tu compra"
          action={
            <Link to="/" className="btn btn-primary">
              Explorar productos
            </Link>
          }
        />
      </div>
    )
  }
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Carrito de Compras</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {items.length} producto{items.length !== 1 ? "s" : ""} en tu carrito
          </p>
        </div>
        <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          Seguir comprando
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Clear cart button */}
          <div className="flex justify-end">
            <button onClick={handleClearCart} className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors">
              Vaciar carrito
            </button>
          </div>
          {/* Items list */}
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onQuantityChange={handleQuantityChange} onRemove={handleRemoveItem} />
            ))}
          </div>
        </div>
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumen del pedido</h2>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-900 dark:text-white">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-blue-600 dark:text-blue-400">{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={handleOpenCheckout}
              disabled={isCheckingOut}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <CreditCard size={18} />
              Finalizar Compra
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              Se creará un pedido y se descontará el stock automáticamente.
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        title="Finalizar Compra"
      >
        <div className="space-y-4">
          {/* Shipping Address */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="w-4 h-4" />
              Dirección de Envío
            </label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Calle, número, ciudad, código postal..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="w-4 h-4" />
              Notas (Opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Instrucciones especiales, horario preferido de entrega..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-400">Productos</span>
              <span className="text-gray-900 dark:text-white">{items.length}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-blue-600 dark:text-blue-400">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowCheckoutModal(false)}
              disabled={isCheckingOut}
              className="flex-1 btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmCheckout}
              disabled={isCheckingOut || !shippingAddress.trim()}
              className="flex-1 btn btn-primary inline-flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <>
                  <LoadingSpinner size="sm" />
                  Procesando...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Confirmar Pedido
                </>
              )}
            </button>
          </div>

          {!shippingAddress.trim() && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400 text-center">
              * La dirección de envío es obligatoria
            </p>
          )}
        </div>
      </Modal>
    </div>
  )
}
const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="card p-4">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.images?.[0] || "/placeholder.svg?height=80&width=80"}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <Link to={`/product/${item.id}`} className="block">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{item.name}</h3>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{item.description}</p>
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-2">{formatPrice(item.price)}</p>
        </div>
        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white rounded-lg"
              aria-label="Disminuir cantidad"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 text-center min-w-12 text-gray-900 dark:text-white rounded-lg">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-white rounded-lg"
              aria-label="Aumentar cantidad"
            >
              <Plus size={16} />
            </button>
          </div>
          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id, item.name)}
            className="p-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            aria-label="Eliminar producto"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      {/* Item Total */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">Subtotal:</span>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">{formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  )
}
export default Cart
