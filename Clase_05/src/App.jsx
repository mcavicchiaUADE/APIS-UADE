import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CategorySelector from './components/CategorySelector';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Categorías disponibles (se pueden obtener dinámicamente de la API)
  const categories = ['Anteojos', 'Fotografía', 'Deportes', 'Tecnología', 'Accesorios'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CartProvider>
      <div className="container">
        <header className="header">
          <h1>🛒 Tienda Online - Carrito de Compras</h1>
        </header>
        
        <main className="main-content">
          <div className="products-section">
            <CategorySelector 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <ProductList selectedCategory={selectedCategory} />
          </div>
          <Cart />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
