import { useState } from "react"
import AboutUsModal from "./modals/AboutUsModal"
import ContactModal from "./modals/ContactModal"
import TermsModal from "./modals/TermsModal"
import PrivacyModal from "./modals/PrivacyModal"

const Footer = () => {
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  return (
    <>
      <footer className="bg-gray-800 dark:bg-gray-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">E-Commerce</h3>
              <p className="text-gray-300 dark:text-gray-100">Tu tienda online de confianza para encontrar los mejores productos.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-300 dark:text-gray-100">
                <li>
                  <button 
                    onClick={() => setIsAboutUsOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Sobre nosotros
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsContactOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Contacto
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsTermsOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Términos y condiciones
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsPrivacyOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Política de privacidad
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="text-gray-300 dark:text-gray-100 space-y-2">
                <p>Email: info@ecommerce.com</p>
                <p>Teléfono: +1 234 567 890</p>
                <p>Dirección: 123 Calle Principal, Ciudad</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 dark:border-gray-500 mt-8 pt-8 text-center text-gray-300 dark:text-gray-100">
            <p>&copy; 2024 E-Commerce. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AboutUsModal 
        isOpen={isAboutUsOpen} 
        onClose={() => setIsAboutUsOpen(false)} 
      />
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
      
      <TermsModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
      />
      
      <PrivacyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
    </>
  )
}

export default Footer
