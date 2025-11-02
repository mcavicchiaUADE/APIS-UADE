import React from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }
  handleReload() {
    window.location.reload()
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Oops! Algo salió mal</h1>
              <p className="text-gray-600">
                Ha ocurrido un error inesperado. Por favor, recarga la página o contacta al soporte si el problema
                persiste.
              </p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => this.handleReload()}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Recargar página
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                className="btn btn-secondary w-full"
              >
                Intentar de nuevo
              </button>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Detalles del error (desarrollo)
                </summary>
                <div className="mt-2 p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 overflow-auto">
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            )}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
export default ErrorBoundary
