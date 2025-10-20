import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}
export default Layout
