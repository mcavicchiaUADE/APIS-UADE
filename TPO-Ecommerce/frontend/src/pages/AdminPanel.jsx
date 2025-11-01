import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { api } from "../services/api"
import { formatDate } from "../utils/formatters"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState from "../components/EmptyState"
import { Shield, UserPlus, Edit, Trash2, Users, Search, X, Save, UserCheck, AlertCircle, BarChart3 } from "lucide-react"

const AdminPanel = () => {
  const { user } = useAuth()
  const { success, error } = useToast()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingUser, setEditingUser] = useState(null)
  const [isDeleting, setIsDeleting] = useState(null)
  const [stats, setStats] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    role: "user"
  })

  // Verificar si el usuario es admin
  const isAdmin = user?.role === 'admin'

  // Cargar usuarios
  const loadUsers = async () => {
    try {
      setLoading(true)
      const usersData = await api.getAllUsers()
      setUsers(usersData)
    } catch (err) {
      error("Error al cargar usuarios: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Cargar estadísticas
  const loadStats = async () => {
    try {
      const statsData = await api.getUsersStats()
      setStats(statsData)
    } catch (err) {
      console.error("Error al cargar estadísticas:", err)
    }
  }

  useEffect(() => {
    if (isAdmin) {
      loadUsers()
      loadStats()
    }
  }, [isAdmin])

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      nombre: "",
      apellido: "",
      role: "user"
    })
  }

  // Abrir modal de creación
  const handleOpenCreateModal = () => {
    resetForm()
    setShowCreateModal(true)
    setShowEditModal(false)
  }

  // Abrir modal de edición
  const handleOpenEditModal = (userData) => {
    setFormData({
      username: userData.username,
      email: userData.email,
      password: "",
      nombre: userData.nombre,
      apellido: userData.apellido,
      role: userData.role
    })
    setEditingUser(userData.id)
    setShowEditModal(true)
    setShowCreateModal(false)
  }

  // Cerrar modales
  const handleCloseModals = () => {
    setShowCreateModal(false)
    setShowEditModal(false)
    setEditingUser(null)
    resetForm()
  }

  // Crear usuario
  const handleCreateUser = async () => {
    try {
      // Validación básica
      if (!formData.username || !formData.email || !formData.password || !formData.nombre || !formData.apellido) {
        error("Por favor completa todos los campos requeridos")
        return
      }

      await api.createUser(formData)
      success("Usuario creado exitosamente")
      handleCloseModals()
      loadUsers()
      loadStats()
    } catch (err) {
      error("Error al crear usuario: " + err.message)
    }
  }

  // Actualizar usuario
  const handleUpdateUser = async () => {
    try {
      // Validación básica
      if (!formData.username || !formData.email || !formData.nombre || !formData.apellido) {
        error("Por favor completa todos los campos requeridos")
        return
      }

      const userData = { ...formData }
      // Si no se cambió la contraseña, no enviarla
      if (!userData.password) {
        delete userData.password
      }

      await api.updateUser(editingUser, userData)
      success("Usuario actualizado exitosamente")
      handleCloseModals()
      loadUsers()
      loadStats()
    } catch (err) {
      error("Error al actualizar usuario: " + err.message)
    }
  }

  // Cambiar rol de usuario (rápido)
  const handleChangeRole = async (userId, currentRole) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin'
      await api.updateUserRole(userId, newRole)
      success(`Rol cambiado a ${newRole === 'admin' ? 'Administrador' : 'Usuario'}`)
      loadUsers()
      loadStats()
    } catch (err) {
      error("Error al cambiar rol: " + err.message)
    }
  }

  // Eliminar usuario
  const handleDeleteUser = async (userId, userEmail) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar al usuario "${userEmail}"?`)) {
      return
    }
    setIsDeleting(userId)
    try {
      await api.deleteUser(userId)
      success("Usuario eliminado exitosamente")
      loadUsers()
      loadStats()
    } catch (err) {
      error("Error al eliminar usuario: " + err.message)
    } finally {
      setIsDeleting(null)
    }
  }

  // Filtrar usuarios
  const filteredUsers = users.filter((u) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      u.email?.toLowerCase().includes(searchLower) ||
      u.username?.toLowerCase().includes(searchLower) ||
      u.nombre?.toLowerCase().includes(searchLower) ||
      u.apellido?.toLowerCase().includes(searchLower)
    )
  })

  // Si no es admin, mostrar mensaje
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Acceso Restringido
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            No tienes permisos para acceder a esta sección
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Gestiona usuarios y permisos del sistema
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={20} />
          Crear Usuario
        </button>
      </div>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Usuarios</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.totalUsuarios}
                </p>
              </div>
              <Users className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Administradores</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.adminUsuarios}
                </p>
              </div>
              <Shield className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Usuarios Regulares</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.userUsuarios}
                </p>
              </div>
              <UserCheck className="h-12 w-12 text-green-600" />
            </div>
          </div>
        </div>
      )}

      {/* Búsqueda */}
      <div className="relative max-w-md">
        <Search className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Tabla de usuarios */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredUsers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No se encontraron usuarios"
          message={searchTerm ? "Intenta con otros términos de búsqueda" : "Aún no hay usuarios registrados"}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Fecha de Registro
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((userData) => (
                  <tr key={userData.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {userData.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {userData.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {userData.nombre} {userData.apellido}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleChangeRole(userData.id, userData.role)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          userData.role === 'admin'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        } hover:opacity-80`}
                      >
                        {userData.role === 'admin' ? (
                          <>
                            <Shield size={12} />
                            Admin
                          </>
                        ) : (
                          <>
                            <UserCheck size={12} />
                            User
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(userData.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(userData)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                          title="Editar usuario"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(userData.id, userData.email)}
                          disabled={isDeleting === userData.id}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                          title="Eliminar usuario"
                        >
                          {isDeleting === userData.id ? (
                            <LoadingSpinner size="small" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de creación/edición */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {showCreateModal ? 'Crear Usuario' : 'Editar Usuario'}
                </h2>
                <button
                  onClick={handleCloseModals}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {showCreateModal ? 'Contraseña *' : 'Nueva Contraseña (dejar vacío para no cambiar)'}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required={showCreateModal}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rol *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={showCreateModal ? handleCreateUser : handleUpdateUser}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save size={20} />
                  {showCreateModal ? 'Crear' : 'Guardar'}
                </button>
                <button
                  onClick={handleCloseModals}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel

