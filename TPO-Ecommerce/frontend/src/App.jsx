import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import AppRouter from "./router"
import { ToastProvider } from "./context/ToastContext"
import ErrorBoundary from "./components/ErrorBoundary"
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <AppRouter />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
export default App
