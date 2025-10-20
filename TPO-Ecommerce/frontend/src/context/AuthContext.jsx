import { createContext, useContext, useReducer, useEffect } from "react"
import { authReducer, authInitialState } from "../reducers/authReducer"
import { api } from "../services/api"
const AuthContext = createContext()
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)
  
  // Restore session on app load
  useEffect(() => {
    const restoreSession = () => {
      try {
        // Try localStorage first (remember me), then sessionStorage
        let token = localStorage.getItem("auth_token")
        let user = localStorage.getItem("auth_user")
        let storageType = "localStorage"
        
        // If no localStorage, try sessionStorage
        if (!token || !user) {
          token = sessionStorage.getItem("auth_token")
          user = sessionStorage.getItem("auth_user")
          storageType = "sessionStorage"
        }
        
        if (token && user) {
          try {
            // Validar token con el backend
            api.validateToken(token)
              .then((validatedUser) => {
                const userCopy = {
                  id: validatedUser.id,
                  username: validatedUser.username,
                  email: validatedUser.email,
                  firstName: validatedUser.firstName,
                  lastName: validatedUser.lastName,
                  role: validatedUser.role || 'user'
                }
                
                dispatch({
                  type: "AUTH_RESTORE",
                  payload: {
                    token: token,
                  user: userCopy,
                  storageType: storageType,
                },
              })
              })
              .catch(() => {
                // Token inválido o expirado
                clearAllStorage()
              })
          } catch (parseError) {
            clearAllStorage()
          }
        }
      } catch (error) {
        clearAllStorage()
      }
    }
    
    const clearAllStorage = () => {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_user")
      sessionStorage.removeItem("auth_token")
      sessionStorage.removeItem("auth_user")
    }
    
    restoreSession()
  }, [])
  const login = async (email, password, rememberMe = false) => {
    dispatch({ type: "AUTH_START" })
    try {
      const response = await api.login(email, password)
      
      // Choose storage based on rememberMe option
      const storage = rememberMe ? localStorage : sessionStorage
      
      // Save to chosen storage
      storage.setItem("auth_token", response.token)
      storage.setItem("auth_user", JSON.stringify(response.user))
      
      // Clear the other storage to avoid conflicts
      if (rememberMe) {
        sessionStorage.removeItem("auth_token")
        sessionStorage.removeItem("auth_user")
      } else {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("auth_user")
      }
      
      dispatch({
        type: "AUTH_SUCCESS",
        payload: response,
      })
      return response
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error.message,
      })
      throw error
    }
  }
  const register = async (userData, rememberMe = false) => {
    dispatch({ type: "AUTH_START" })
    try {
      const response = await api.register(userData)
      
      // Choose storage based on rememberMe option
      const storage = rememberMe ? localStorage : sessionStorage
      
      // Save to chosen storage
      storage.setItem("auth_token", response.token)
      storage.setItem("auth_user", JSON.stringify(response.user))
      
      // Clear the other storage to avoid conflicts
      if (rememberMe) {
        sessionStorage.removeItem("auth_token")
        sessionStorage.removeItem("auth_user")
      } else {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("auth_user")
      }
      
      dispatch({
        type: "AUTH_SUCCESS",
        payload: response,
      })
      return response
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error.message,
      })
      throw error
    }
  }
  const logout = () => {
    // Clear both storages to ensure complete logout
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("auth_user")
    dispatch({ type: "AUTH_LOGOUT" })
  }
  const value = {
    ...state,
    login,
    register,
    logout,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
