export const cartInitialState = {
  items: [],
  total: 0,
}
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        }
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        }
      }
    }
    case "REMOVE_FROM_CART": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload)
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      }
    }
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item))
        .filter((item) => item.quantity > 0)
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      }
    }
    case "CLEAR_CART":
      return cartInitialState
    case "RESTORE_CART":
      return {
        items: action.payload,
        total: calculateTotal(action.payload),
      }
    default:
      return state
  }
}
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}
