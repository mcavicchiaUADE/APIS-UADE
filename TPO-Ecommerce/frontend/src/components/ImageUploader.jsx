import { useState } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
const ImageUploader = ({ images = [], onChange, maxImages = 5 }) => {
  const [dragActive, setDragActive] = useState(false)
  const handleFiles = (files) => {
    const fileArray = Array.from(files)
    const validFiles = fileArray.filter((file) => file.type.startsWith("image/"))
    if (validFiles.length === 0) {
      return
    }
    // Convert files to URLs for preview
    const newImageUrls = validFiles.map((file) => {
      return URL.createObjectURL(file)
    })
    // Combine with existing images, respecting max limit
    const allImages = [...images, ...newImageUrls].slice(0, maxImages)
    onChange(allImages)
  }
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }
  const canAddMore = images.length < maxImages
  return (
    <div className="space-y-4">
      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
              {index === 0 && (
                <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg">
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Upload Area */}
      {canAddMore && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              {images.length === 0 ? <ImageIcon size={48} /> : <Upload size={48} />}
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">
                {images.length === 0 ? "Arrastra imágenes aquí o haz clic para seleccionar" : "Agregar más imágenes"}
              </p>
              <p className="mt-1">
                PNG, JPG, GIF hasta 10MB ({images.length}/{maxImages} imágenes)
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Instructions */}
      <div className="text-xs text-gray-500">
        <p>• La primera imagen será la imagen principal del producto</p>
        <p>• Puedes subir hasta {maxImages} imágenes</p>
        <p>• Formatos soportados: PNG, JPG, GIF</p>
      </div>
    </div>
  )
}
export default ImageUploader
