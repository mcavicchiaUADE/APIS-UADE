import { createContext, useContext, useReducer, useEffect } from "react"
import { cartReducer, cartInitialState } from "../reducers/cartReducer"
import { api } from "../services/api"
const CartContext = createContext()
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)
  // Restore cart from localStorage on app load
  useEffect(() => {
    const savedCart = localStorage.getItem("cart_items")
    if (savedCart) {
      dispatch({
        type: "RESTORE_CART",
        payload: JSON.parse(savedCart),
      })
    }
  }, [])
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(state.items))
  }, [state.items])
  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    })
  }
  const removeFromCart = (productId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    })
  }
  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: productId, quantity },
    })
  }
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }
  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  /**
   * Finalizar compra - Crea un pedido con los items del carrito
   */
  const checkout = async (shippingData) => {
    try {
      // Preparar datos del pedido
      const orderData = {
        items: state.items.map(item => ({
          productId: item.id,
          cantidad: item.quantity
        })),
        shippingAddress: shippingData?.address || '',
        notes: shippingData?.notes || ''
      }

      // Crear el pedido en el backend
      const order = await api.createOrder(orderData)

      // Limpiar el carrito después de crear el pedido exitosamente
      clearCart()

      return order
    } catch (error) {
      throw error
    }
  }

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsCount,
    checkout,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
