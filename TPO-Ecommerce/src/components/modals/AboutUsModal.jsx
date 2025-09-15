import  Modal  from "../Modal"
import { Users, Heart, Target, Award } from "lucide-react"
const AboutUsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Acerca de Nosotros">
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Nuestra Historia</h2>
          <p className="text-gray-600">
            Somos una empresa apasionada por ofrecer los mejores productos y experiencias de compra online.
          </p>
        </div>
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Target className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Nuestra Misión</h3>
            </div>
            <p className="text-gray-600">
              Proporcionar productos de alta calidad a precios competitivos, con un servicio al cliente excepcional y una experiencia de compra sin complicaciones.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Award className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Nuestra Visión</h3>
            </div>
            <p className="text-gray-600">
              Ser la plataforma de e-commerce de referencia, reconocida por la calidad de nuestros productos y la satisfacción de nuestros clientes.
            </p>
          </div>
        </div>
        {/* Values */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="h-5 w-5 text-red-500 mr-2" />
            Nuestros Valores
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Calidad</h4>
                <p className="text-sm text-gray-600">Productos cuidadosamente seleccionados</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Confianza</h4>
                <p className="text-sm text-gray-600">Transparencia en cada transacción</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Innovación</h4>
                <p className="text-sm text-gray-600">Tecnología al servicio del cliente</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Servicio</h4>
                <p className="text-sm text-gray-600">Atención personalizada y rápida</p>
              </div>
            </div>
          </div>
        </div>
        {/* Team */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nuestro Equipo</h3>
          <p className="text-gray-600 mb-4">
            Un equipo diverso y talentoso de profesionales apasionados por la tecnología y el comercio electrónico.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">Desarrollo</h4>
              <p className="text-sm text-gray-600">8 desarrolladores</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Diseño</h4>
              <p className="text-sm text-gray-600">2 diseñadores</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900">Calidad</h4>
              <p className="text-sm text-gray-600">2 especialistas</p>
            </div>
          </div>
        </div>
        {/* Contact Info */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Tienes preguntas?</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-gray-600">contacto@ecommerce.com</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Teléfono</p>
              <p className="text-gray-600">+54 11 1234-5678</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default AboutUsModal
