import { useState } from "react"
import { Modal } from "../Modal"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitted(true)
    setIsSubmitting(false)
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }
  const handleClose = () => {
    if (!isSubmitting) {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
      onClose()
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Contacto">
      <div className="space-y-6">
        {/* Contact Info */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-sm text-gray-600">contacto@ecommerce.com</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Teléfono</h3>
            <p className="text-sm text-gray-600">+54 11 1234-5678</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Ubicación</h3>
            <p className="text-sm text-gray-600">Buenos Aires, Argentina</p>
          </div>
        </div>
        {/* Contact Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Asunto *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cuéntanos más detalles..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensaje
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
            <p className="text-gray-600">
              Gracias por contactarnos. Te responderemos en las próximas 24 horas.
            </p>
          </div>
        )}
        {/* Business Hours */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Horarios de Atención</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Lunes a Viernes: 9:00 - 18:00</p>
            <p>Sábados: 9:00 - 13:00</p>
            <p>Domingos: Cerrado</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default ContactModal
