import { createContext, useContext, useState } from "react"
const ToastContext = createContext()
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const addToast = (message, type = "info") => {
    const id = Date.now()
    const toast = { id, message, type }
    setToasts((prev) => [...prev, toast])
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }
  const value = {
    toasts,
    addToast,
    removeToast,
    success: (message) => addToast(message, "success"),
    error: (message) => addToast(message, "error"),
    info: (message) => addToast(message, "info"),
  }
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}
const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type} flex items-center justify-between min-w-80`}>
          <span>{toast.message}</span>
          <button onClick={() => onRemove(toast.id)} className="ml-4 text-lg font-bold opacity-70 hover:opacity-100">
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
