import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { useFetch } from "../hooks/useFetch"
import { api } from "../services/api"
import { validateRequired, validatePrice, validateStock } from "../utils/validators"
import LoadingSpinner from "../components/LoadingSpinner"
import ImageUploader from "../components/ImageUploader"
import { ArrowLeft, Save, Package } from "lucide-react"
const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { success, error } = useToast()
  const isEditing = Boolean(id)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    images: [],
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Fetch categories
  const { data: categories } = useFetch(() => api.getCategories(), [])
  // Fetch product data if editing
  const { data: product, loading: productLoading } = useFetch(
    () => (isEditing ? api.getProduct(id) : Promise.resolve(null)),
    [id, isEditing],
  )
  // Populate form when editing
  useEffect(() => {
    if (isEditing && product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        stock: product.stock?.toString() || "",
        categoryId: product.categoryId?.toString() || "",
        images: product.images || [],
      })
    }
  }, [isEditing, product])
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
  const handleImagesChange = (images) => {
    setFormData((prev) => ({
      ...prev,
      images,
    }))
    if (errors.images) {
      setErrors((prev) => ({
        ...prev,
        images: "",
      }))
    }
  }
  const validateForm = () => {
    const newErrors = {}
    if (!validateRequired(formData.name)) {
      newErrors.name = "El nombre es requerido"
    }
    if (!validateRequired(formData.description)) {
      newErrors.description = "La descripción es requerida"
    }
    if (!validateRequired(formData.price)) {
      newErrors.price = "El precio es requerido"
    } else if (!validatePrice(formData.price)) {
      newErrors.price = "El precio debe ser un número mayor a 0"
    }
    if (!validateRequired(formData.stock)) {
      newErrors.stock = "El stock es requerido"
    } else if (!validateStock(formData.stock)) {
      newErrors.stock = "El stock debe ser un número mayor o igual a 0"
    }
    if (!validateRequired(formData.categoryId)) {
      newErrors.categoryId = "La categoría es requerida"
    }
    if (formData.images.length === 0) {
      newErrors.images = "Debe agregar al menos una imagen"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    setIsSubmitting(true)
    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        categoryId: Number.parseInt(formData.categoryId),
        images: formData.images,
        ownerUserId: user.id, // Keep original type (string or number)
      }
      if (isEditing) {
        await api.updateProduct(id, productData)
        success("Producto actualizado exitosamente")
      } else {
        await api.createProduct(productData)
        success("Producto creado exitosamente")
      }
      navigate("/dashboard/products")
    } catch (err) {
      error("Error al guardar el producto: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  if (isEditing && productLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
  if (isEditing && !product) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Producto no encontrado</h3>
        <p className="text-gray-600 mb-4">El producto que intentas editar no existe.</p>
        <Link to="/dashboard/products" className="btn btn-primary">
          Volver a mis productos
        </Link>
      </div>
    )
  }
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/dashboard/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Volver a mis productos
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h1>
        <p className="text-gray-600 mt-1">
          {isEditing ? "Modifica los datos de tu producto" : "Completa la información de tu nuevo producto"}
        </p>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          {/* Product Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes del producto <span className="text-red-500">*</span>
            </label>
            <ImageUploader images={formData.images} onChange={handleImagesChange} />
            {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
          </div>
          {/* Product Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del producto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="Ej: iPhone 15 Pro Max"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`input resize-none ${errors.description ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="Describe las características principales de tu producto..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
          {/* Price and Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Precio (€) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className={`input ${errors.price ? "border-red-500 focus:ring-red-500" : ""}`}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className={`input ${errors.stock ? "border-red-500 focus:ring-red-500" : ""}`}
                placeholder="0"
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
            </div>
          </div>
          {/* Category */}
          <div className="mb-6">
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`input ${errors.categoryId ? "border-red-500 focus:ring-red-500" : ""}`}
            >
              <option value="">Selecciona una categoría</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link to="/dashboard/products" className="btn btn-secondary">
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                {isEditing ? "Actualizando..." : "Creando..."}
              </>
            ) : (
              <>
                <Save size={18} />
                {isEditing ? "Actualizar Producto" : "Crear Producto"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
export default ProductForm
