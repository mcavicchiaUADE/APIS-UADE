import { ERROR_MESSAGES, TOKEN_PREFIX } from "../constants"

// Base URL for Spring Boot Backend
const API_BASE_URL = "http://localhost:8081/api"

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
      throw new Error('No se puede conectar con el servidor. Asegúrate de que el backend Spring Boot esté ejecutándose en http://localhost:8081')
    }
    throw error
  }
}

export const api = {
  // Auth endpoints (simulados - el backend actual no tiene autenticación real)
  async login(email, password) {
    // Simulamos autenticación básica
    const mockUsers = [
      { id: 1, email: "admin@test.com", password: "admin123", username: "admin", firstName: "Admin", lastName: "User", role: "user" },
      { id: 2, email: "user1@test.com", password: "user123", username: "user1", firstName: "Juan", lastName: "Pérez", role: "user" },
      { id: 3, email: "test@test.com", password: "test123", username: "testuser", firstName: "Test", lastName: "User", role: "user" }
    ]
    
    const user = mockUsers.find((u) => u.email === email && u.password === password)
    if (!user) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS)
    }
    const token = `${TOKEN_PREFIX}${user.id}_${Date.now()}`
    return { user: { ...user, password: undefined }, token }
  },
  
  async register(userData) {
    // Simulamos registro - en un backend real esto iría a un endpoint de registro
    const mockUser = {
      id: Date.now(),
      ...userData,
      role: "user",
    }
    
    const token = `${TOKEN_PREFIX}${mockUser.id}_${Date.now()}`
    return { user: { ...mockUser, password: undefined }, token }
  },
  
  // Products endpoints
  async getProducts(filters = {}) {
    // Si hay filtros de categoría, usar el endpoint específico
    if (filters.categoryId) {
      return await request(`/productos/categoria/${filters.categoryId}`)
    }
    
    // Si hay búsqueda por texto, usar el endpoint de búsqueda
    if (filters.search) {
      return await request(`/productos/buscar?nombre=${encodeURIComponent(filters.search)}`)
    }
    
    // Si se solicita solo productos con stock
    if (filters.availableOnly) {
      return await request('/productos/stock?disponible=true')
    }
    
    // Obtener todos los productos
    let products = await request('/productos')
    
    // Ordenar alfabéticamente
    products.sort((a, b) => a.name.localeCompare(b.name))
    return products
  },
  
  async getProduct(id) {
    try {
      return await request(`/productos/${id}`)
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
      }
      throw error
    }
  },
  
  async createProduct(productData) {
    const newProduct = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock || 0,
      images: productData.images || [],
      categoryId: productData.categoryId,
      ownerUserId: productData.ownerUserId || 1, // Usuario por defecto
    }
    
    return await request('/productos', {
      method: 'POST',
      body: JSON.stringify(newProduct),
    })
  },
  
  async updateProduct(id, productData) {
    try {
      const updatedProduct = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        images: productData.images,
        categoryId: productData.categoryId,
        ownerUserId: productData.ownerUserId,
      }
      
      return await request(`/productos/${id}`, {
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
      await request(`/productos/${id}`, {
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
  
  // Categories endpoints (simulados - el backend actual no tiene categorías)
  async getCategories() {
    // Retornamos las categorías que están en el db.json original
    return [
      { id: 1, name: "Electrónicos" },
      { id: 2, name: "Ropa" },
      { id: 3, name: "Hogar" },
      { id: 4, name: "Deportes" },
      { id: 5, name: "Libros" }
    ]
  },
  
  // Update product stock (for checkout)
  async updateProductStock(productId, newStock) {
    try {
      const product = await request(`/productos/${productId}`)
      return await request(`/productos/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ 
          ...product, 
          stock: newStock 
        }),
      })
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
      }
      throw error
    }
  },
}