import  Modal  from "../Modal"
import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react"
const TermsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Términos y Condiciones">
      <div className="space-y-6">
        {/* Introduction */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Términos y Condiciones</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Última actualización: {new Date().toLocaleDateString("es-ES")}
          </p>
        </div>
        {/* Acceptance */}
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            Aceptación de Términos
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Al acceder y utilizar este sitio web, aceptas estar sujeto a estos términos y condiciones de uso. 
            Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
          </p>
        </div>
        {/* Use of Service */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Scale className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            Uso del Servicio
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Uso Permitido</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Navegar y explorar productos disponibles</li>
                <li>Realizar compras de productos legítimos</li>
                <li>Crear y mantener una cuenta de usuario</li>
                <li>Contactar nuestro servicio al cliente</li>
                <li>Participar en promociones y ofertas</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mr-2" />
                Uso Prohibido
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Actividades ilegales o fraudulentas</li>
                <li>Interferir con el funcionamiento del sitio</li>
                <li>Intentar acceder a áreas restringidas</li>
                <li>Usar bots o scripts automatizados</li>
                <li>Violar derechos de propiedad intelectual</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Account Responsibilities */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Responsabilidades de la Cuenta</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Información Veraz</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Proporcionar información precisa y actualizada</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Seguridad</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Mantener la confidencialidad de tu cuenta</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Notificaciones</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Informar sobre uso no autorizado</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Edad Mínima</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Debes ser mayor de 18 años</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Uso Personal</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Solo para uso personal, no comercial</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Actualizaciones</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Mantener tu información actualizada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Orders and Payments */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pedidos y Pagos</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Procesamiento de Pedidos</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Los pedidos están sujetos a disponibilidad de stock</li>
                <li>Nos reservamos el derecho de cancelar pedidos</li>
                <li>Los precios pueden cambiar sin previo aviso</li>
                <li>Los impuestos se calculan según la ubicación</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Métodos de Pago</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Tarjetas de crédito y débito</li>
                <li>Transferencias bancarias</li>
                <li>Billeteras digitales</li>
                <li>Pago contra entrega (sujeto a disponibilidad)</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Shipping and Returns */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Envíos y Devoluciones</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Política de Envío</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Envíos a todo el país</li>
                <li>Tiempo de entrega: 3-7 días hábiles</li>
                <li>Envío gratuito en compras superiores a $10,000</li>
                <li>Seguimiento de pedidos disponible</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Política de Devolución</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>Devoluciones dentro de 30 días</li>
                <li>Productos deben estar en condiciones originales</li>
                <li>Reembolso o cambio según disponibilidad</li>
                <li>Costo de envío por cuenta del cliente</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Limitation of Liability */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            Limitación de Responsabilidad
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            En ningún caso seremos responsables por daños indirectos, incidentales, especiales o consecuenciales 
            que resulten del uso o la imposibilidad de usar nuestro servicio.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Nuestra responsabilidad total no excederá el monto pagado por el producto o servicio en cuestión.
          </p>
        </div>
        {/* Changes to Terms */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Modificaciones</h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Es tu responsabilidad revisar periódicamente estos términos para estar informado de cualquier cambio.
            </p>
          </div>
        </div>
        {/* Contact */}
        <div className="border-t dark:border-gray-600 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contacto</h3>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Si tienes preguntas sobre estos términos y condiciones:
            </p>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Email:</strong> legal@ecommerce.com</p>
              <p><strong>Teléfono:</strong> +54 11 1234-5678</p>
              <p><strong>Dirección:</strong> Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default TermsModal
