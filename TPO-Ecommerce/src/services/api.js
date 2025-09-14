import { ERROR_MESSAGES, TOKEN_PREFIX } from "../constants"

// Base URL for JSON Server
const API_BASE_URL = "http://localhost:3001"
// Helper function to make HTTP requests
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('No se puede conectar con el servidor. Asegúrate de que JSON Server esté ejecutándose.')
    }
    throw error
  }
}

export const api = {
  // Auth endpoints
  async login(email, password) {
    const users = await request('/users')
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS)
    }
    const token = `${TOKEN_PREFIX}${user.id}_${Date.now()}`
    return { user: { ...user, password: undefined }, token }
  },
  
  async register(userData) {
    // Check if email already exists
    const users = await request('/users')
    if (users.find((u) => u.email === userData.email)) {
      throw new Error(ERROR_MESSAGES.EMAIL_EXISTS)
    }
    // Check if username already exists
    if (users.find((u) => u.username === userData.username)) {
      throw new Error(ERROR_MESSAGES.USERNAME_EXISTS)
    }
    
    const newUser = {
      ...userData,
      role: "user",
    }
    
    const createdUser = await request('/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    })
    
    const token = `${TOKEN_PREFIX}${createdUser.id}_${Date.now()}`
    return { user: { ...createdUser, password: undefined }, token }
  },
  
  // Products endpoints
  async getProducts(filters = {}) {
    let endpoint = '/products'
    const queryParams = new URLSearchParams()
    
    if (filters.categoryId) {
      queryParams.append('categoryId', filters.categoryId)
    }
    
    if (filters.search) {
      queryParams.append('q', filters.search)
    }
    
    if (queryParams.toString()) {
      endpoint += `?${queryParams.toString()}`
    }
    
    let products = await request(endpoint)
    
    // JSON Server doesn't have built-in text search, so we filter manually
    if (filters.search) {
      products = products.filter((p) => 
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    // Sort alphabetically
    products.sort((a, b) => a.name.localeCompare(b.name))
    return products
  },
  
  async getProduct(id) {
    try {
      return await request(`/products/${id}`)
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
      }
      throw error
    }
  },
  
  async createProduct(productData) {
    const newProduct = {
      ...productData,
      createdAt: new Date().toISOString(),
    }
    return await request('/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
    })
  },
  
  async updateProduct(id, productData) {
    try {
      // Obtener el producto actual para preservar createdAt
      const currentProduct = await request(`/products/${id}`)
      
      const updatedProduct = {
        ...currentProduct,
        ...productData,
        // Preservar createdAt original
        createdAt: currentProduct.createdAt,
        // Actualizar updatedAt si existe
        updatedAt: new Date().toISOString(),
      }
      
      return await request(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
      })
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
      }
      throw error
    }
  },
  
  async deleteProduct(id) {
    try {
      await request(`/products/${id}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
      }
      throw error
    }
  },
  
  // Categories endpoints
  async getCategories() {
    return await request('/categories')
  },
  
  // Update product stock (for checkout)
  async updateProductStock(productId, newStock) {
    try {
      const product = await request(`/products/${productId}`)
      return await request(`/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ ...product, stock: newStock }),
      })
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
      }
      throw error
    }
  },
}
