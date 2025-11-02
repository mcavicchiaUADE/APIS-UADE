import  Modal  from "../Modal"
import { Shield, Eye, Lock, Database, UserCheck } from "lucide-react"
const PrivacyModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Política de Privacidad">
      <div className="space-y-6">
        {/* Introduction */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Política de Privacidad</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Última actualización: {new Date().toLocaleDateString("es-ES")}
          </p>
        </div>
        {/* Information We Collect */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Database className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            Información que Recopilamos
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Información Personal</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Nombre completo y datos de contacto</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección de envío y facturación</li>
                <li>Información de pago (procesada de forma segura)</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Información de Uso</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Productos vistos y comprados</li>
                <li>Preferencias de navegación</li>
                <li>Dirección IP y datos del dispositivo</li>
                <li>Cookies y tecnologías similares</li>
              </ul>
            </div>
          </div>
        </div>
        {/* How We Use Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Eye className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            Cómo Utilizamos tu Información
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Procesamiento de Pedidos</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Gestionar y completar tus compras</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Servicio al Cliente</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Responder a tus consultas y solicitudes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Mejora del Servicio</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Analizar y mejorar nuestra plataforma</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Comunicaciones</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Enviar actualizaciones y promociones</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Seguridad</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Proteger contra fraudes y actividades sospechosas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Personalización</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Personalizar tu experiencia de compra</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Data Protection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Lock className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            Protección de Datos
          </h3>
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Medidas de Seguridad</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                  <li>Encriptación SSL/TLS</li>
                  <li>Almacenamiento seguro</li>
                  <li>Acceso restringido</li>
                  <li>Monitoreo continuo</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tus Derechos</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                  <li>Acceso a tus datos</li>
                  <li>Rectificación de información</li>
                  <li>Eliminación de datos</li>
                  <li>Portabilidad de datos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Cookies */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cookies y Tecnologías Similares</h3>
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cookies Esenciales</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Necesarias para el funcionamiento básico del sitio web y no se pueden desactivar.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cookies de Rendimiento</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cookies de Funcionalidad</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Permiten recordar tus preferencias y personalizar tu experiencia.
              </p>
            </div>
          </div>
        </div>
        {/* Third Parties */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
            Compartir con Terceros
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en los siguientes casos:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
              <li>Proveedores de servicios de confianza (procesamiento de pagos, envío)</li>
              <li>Cuando sea requerido por ley o autoridades competentes</li>
              <li>Para proteger nuestros derechos legales</li>
              <li>Con tu consentimiento explícito</li>
            </ul>
          </div>
        </div>
        {/* Contact */}
        <div className="border-t dark:border-gray-600 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contacto</h3>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Si tienes preguntas sobre esta política de privacidad o sobre el tratamiento de tus datos personales:
            </p>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Email:</strong> privacidad@ecommerce.com</p>
              <p><strong>Teléfono:</strong> +54 11 1234-5678</p>
              <p><strong>Dirección:</strong> Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default PrivacyModal
