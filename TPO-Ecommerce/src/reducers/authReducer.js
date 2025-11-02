export const authInitialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  storageType: null, // 'localStorage' or 'sessionStorage'
}
export const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      }
    case "AUTH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        token: null,
        isAuthenticated: false,
      }
    case "AUTH_LOGOUT":
      return {
        ...authInitialState,
      }
    case "AUTH_RESTORE":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        storageType: action.payload.storageType,
      }
    default:
      return state
  }
}
