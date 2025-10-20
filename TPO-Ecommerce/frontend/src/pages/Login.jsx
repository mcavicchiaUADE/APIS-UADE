import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { validateEmail, validatePassword, validateRequired } from "../utils/validators"
import { Eye, EyeOff, Mail, Lock, User, LogIn, UserPlus } from "lucide-react"
const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { login, register, loading } = useAuth()
  const { error, success } = useToast()
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }
  const validateForm = () => {
    const newErrors = {}
    
    // Email validation (required for both modes)
    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "El email no es válido"
    }
    
    // Password validation (required for both modes)
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }
    
    // Additional validations for register mode
    if (!isLoginMode) {
      if (!validateRequired(formData.username)) {
        newErrors.username = "El nombre de usuario es requerido"
      } else if (formData.username.length < 3) {
        newErrors.username = "El nombre de usuario debe tener al menos 3 caracteres"
      }
      
      if (!validateRequired(formData.firstName)) {
        newErrors.firstName = "El nombre es requerido"
      }
      
      if (!validateRequired(formData.lastName)) {
        newErrors.lastName = "El apellido es requerido"
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    try {
      if (isLoginMode) {
        await login(formData.email, formData.password, rememberMe)
        navigate("/")
      } else {
        await register(formData, rememberMe)
        success("Cuenta creada exitosamente")
        navigate("/")
      }
    } catch (err) {
      error(err.message)
    }
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setErrors({})
    setFormData({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {isLoginMode ? "Iniciar Sesión" : "Crear Cuenta"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            {isLoginMode ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button
              onClick={toggleMode}
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              {isLoginMode ? "Regístrate aquí" : "Inicia sesión aquí"}
            </button>
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isLoginMode
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !isLoginMode
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Registrarse
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Username field - only for register mode */}
            {!isLoginMode && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre de Usuario
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className={`input pl-10 ${errors.username ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="tu_usuario"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                {errors.username && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>}
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`input pl-10 ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLoginMode ? "current-password" : "new-password"}
                  required
                  className={`input pl-10 pr-10 ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder={isLoginMode ? "Tu contraseña" : "Mínimo 6 caracteres"}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
            </div>

            {/* Remember Me checkbox - only for login mode */}
            {isLoginMode && (
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded-lg"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Recordarme
                </label>
              </div>
            )}

            {/* First Name field - only for register mode */}
            {!isLoginMode && (
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className={`input ${errors.firstName ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="Tu nombre"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                {errors.firstName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>}
              </div>
            )}

            {/* Last Name field - only for register mode */}
            {!isLoginMode && (
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Apellido
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className={`input ${errors.lastName ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="Tu apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                {errors.lastName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isLoginMode ? "Iniciando sesión..." : "Creando cuenta..."}
                </div>
              ) : (
                isLoginMode ? "Iniciar Sesión" : "Crear Cuenta"
              )}
            </button>
          </div>

          {/* Demo credentials - only show in login mode */}
          {isLoginMode && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Credenciales de prueba:</h3>
              <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <p>
                  <strong>Admin:</strong> admin@test.com / admin123
                </p>
                <p>
                  <strong>Usuario:</strong> user1@test.com / user123
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
export default Login
