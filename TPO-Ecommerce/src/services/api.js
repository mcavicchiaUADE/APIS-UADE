import { ERROR_MESSAGES, TOKEN_PREFIX } from "../constants"

// Base URL for Spring Boot Backend
const API_BASE_URL = "http://localhost:8081/api"

// Helper function to get JWT token from storage
const getAuthToken = () => {
  return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
}

// Helper function to make HTTP requests with JWT support
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getAuthToken()
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`)
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
  // Auth endpoints - AUTENTICACIÓN REAL con Spring Boot + JWT
  async login(emailOrUsername, password) {
    try {
      const response = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ emailOrUsername, password })
      })
      
      // Transformar la respuesta del backend al formato del frontend
      return {
        user: {
          id: response.user.id,
          email: response.user.email,
          username: response.user.email.split('@')[0], // Usar parte del email como username
          firstName: response.user.nombre,
          lastName: response.user.nombre, // Backend solo tiene 'nombre'
          role: response.user.role.toLowerCase()
        },
        token: response.token
      }
    } catch (error) {
      throw new Error(error.message || ERROR_MESSAGES.INVALID_CREDENTIALS)
    }
  },
  
  async register(userData) {
    try {
      const response = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: userData.username || userData.email.split('@')[0],
          email: userData.email,
          password: userData.password,
          nombre: userData.firstName || userData.name?.split(' ')[0] || 'Usuario',
          apellido: userData.lastName || userData.name?.split(' ')[1] || 'Apellido'
        })
      })
      
      // Transformar la respuesta del backend al formato del frontend
      return {
        user: {
          id: response.user.id,
          email: response.user.email,
          username: userData.username || response.user.email.split('@')[0],
          firstName: response.user.nombre,
          lastName: response.user.nombre,
          role: response.user.role.toLowerCase()
        },
        token: response.token
      }
    } catch (error) {
      throw new Error(error.message || 'Error al crear la cuenta')
    }
  },
  
  async validateToken(token) {
    try {
      const response = await request('/auth/validate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      return {
        id: response.id,
        email: response.email,
        username: response.email.split('@')[0],
        firstName: response.nombre,
        lastName: response.nombre,
        role: response.role.toLowerCase()
      }
    } catch (error) {
      throw new Error('Sesión expirada')
    }
  },
  
  // Products endpoints
  async getProducts(filters = {}) {
    let products = []
    
    // Si hay filtros de categoría, usar el endpoint específico
    if (filters.categoryId) {
      products = await request(`/productos/categoria/${filters.categoryId}`)
    }
    // Si hay búsqueda por texto, usar el endpoint de búsqueda
    else if (filters.search) {
      products = await request(`/productos/buscar?nombre=${encodeURIComponent(filters.search)}`)
    }
    // Si se solicita solo productos con stock
    else if (filters.availableOnly) {
      products = await request('/productos/stock?disponible=true')
    }
    // Obtener todos los productos
    else {
      products = await request('/productos')
    }
    
    // Mapear campos del backend al formato del frontend
    const mappedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: product.images || [],
      categoryId: product.categoriaId, // Backend usa 'categoriaId'
      categoryName: product.categoriaNombre,
      ownerUserId: product.ownerUserId,
      ownerUserName: product.ownerUserNombre,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }))
    
    // Ordenar alfabéticamente
    mappedProducts.sort((a, b) => a.name.localeCompare(b.name))
    return mappedProducts
  },
  
  async getProduct(id) {
    try {
      const product = await request(`/productos/${id}`)
      
      // Mapear campos del backend al formato del frontend
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: product.images || [],
        categoryId: product.categoriaId,
        categoryName: product.categoriaNombre,
        ownerUserId: product.ownerUserId,
        ownerUserName: product.ownerUserNombre,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
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
      price: Number(productData.price),
      stock: Number(productData.stock) || 0,
      images: productData.images || [],
      categoriaId: Number(productData.categoryId), // Backend espera 'categoriaId'
      ownerUserId: productData.ownerUserId || null,
    }
    
    const created = await request('/productos', {
      method: 'POST',
      body: JSON.stringify(newProduct),
    })
    
    // Mapear respuesta al formato del frontend
    return {
      id: created.id,
      name: created.name,
      description: created.description,
      price: created.price,
      stock: created.stock,
      images: created.images || [],
      categoryId: created.categoriaId,
      categoryName: created.categoriaNombre,
      ownerUserId: created.ownerUserId,
      ownerUserName: created.ownerUserNombre,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt
    }
  },
  
  async updateProduct(id, productData) {
    try {
      const updatedProduct = {
        name: productData.name,
        description: productData.description,
        price: Number(productData.price),
        stock: Number(productData.stock),
        images: productData.images || [],
        categoriaId: Number(productData.categoryId), // Backend espera 'categoriaId'
        ownerUserId: productData.ownerUserId || null,
      }
      
      const updated = await request(`/productos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
      })
      
      // Mapear respuesta al formato del frontend
      return {
        id: updated.id,
        name: updated.name,
        description: updated.description,
        price: updated.price,
        stock: updated.stock,
        images: updated.images || [],
        categoryId: updated.categoriaId,
        categoryName: updated.categoriaNombre,
        ownerUserId: updated.ownerUserId,
        ownerUserName: updated.ownerUserNombre,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt
      }
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
  
  // Categories endpoints - REAL desde el backend
  async getCategories() {
    const categories = await request('/categorias')
    
    // Mapear campos del backend (nombre) al formato del frontend (name)
    return categories.map(cat => ({
      id: cat.id,
      name: cat.nombre // Backend usa 'nombre', frontend espera 'name'
    }))
  },
  
  // Update product stock (for checkout)
  async updateProductStock(productId, newStock) {
    try {
      const product = await request(`/productos/${productId}`)
      
      const updated = await request(`/productos/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ 
          name: product.name,
          description: product.description,
          price: product.price,
          stock: newStock,
          images: product.images || [],
          categoriaId: product.categoriaId,
          ownerUserId: product.ownerUserId
        }),
      })
      
      // Mapear respuesta al formato del frontend
      return {
        id: updated.id,
        name: updated.name,
        description: updated.description,
        price: updated.price,
        stock: updated.stock,
        images: updated.images || [],
        categoryId: updated.categoriaId,
        categoryName: updated.categoriaNombre,
        ownerUserId: updated.ownerUserId,
        ownerUserName: updated.ownerUserNombre,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt
      }
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
      }
      throw error
    }
  },

  // ===== PEDIDOS/ÓRDENES =====
  
  /**
   * Obtener historial de pedidos del usuario autenticado
   */
  async getMyOrders() {
    try {
      const pedidos = await request('/pedidos/mis-pedidos')
      return pedidos
    } catch (error) {
      throw new Error(error.message || 'Error al obtener pedidos')
    }
  },
  
  /**
   * Obtener detalle de un pedido por ID
   */
  async getOrder(orderId) {
    try {
      const pedido = await request(`/pedidos/${orderId}`)
      return pedido
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error('Pedido no encontrado')
      }
      throw error
    }
  },
  
  /**
   * Crear un nuevo pedido (checkout del carrito)
   */
  async createOrder(orderData) {
    try {
      const newOrder = {
        items: orderData.items.map(item => ({
          productoId: item.productId || item.id,
          cantidad: item.quantity || item.cantidad
        })),
        direccionEnvio: orderData.shippingAddress || orderData.direccionEnvio || '',
        notas: orderData.notes || orderData.notas || ''
      }
      
      const created = await request('/pedidos', {
        method: 'POST',
        body: JSON.stringify(newOrder)
      })
      
      return created
    } catch (error) {
      if (error.message.includes('Stock insuficiente')) {
        throw new Error(error.message)
      }
      throw new Error(error.message || 'Error al crear el pedido')
    }
  },
  
  /**
   * Cancelar un pedido (solo si está en estado PENDIENTE)
   */
  async cancelOrder(orderId) {
    try {
      const canceled = await request(`/pedidos/${orderId}/cancelar`, {
        method: 'PUT'
      })
      return canceled
    } catch (error) {
      throw new Error(error.message || 'Error al cancelar el pedido')
    }
  },
  
  /**
   * Actualizar estado de un pedido (solo ADMIN)
   */
  async updateOrderStatus(orderId, newStatus) {
    try {
      const updated = await request(`/pedidos/${orderId}/estado?estado=${newStatus}`, {
        method: 'PUT'
      })
      return updated
    } catch (error) {
      throw new Error(error.message || 'Error al actualizar el estado del pedido')
    }
  },
  
  /**
   * Obtener todos los pedidos (solo ADMIN)
   */
  async getAllOrders() {
    try {
      const pedidos = await request('/pedidos')
      return pedidos
    } catch (error) {
      throw new Error(error.message || 'Error al obtener pedidos')
    }
  },
  
  /**
   * Obtener pedidos por estado (solo ADMIN)
   */
  async getOrdersByStatus(status) {
    try {
      const pedidos = await request(`/pedidos/estado/${status}`)
      return pedidos
    } catch (error) {
      throw new Error(error.message || 'Error al obtener pedidos')
    }
  },
}