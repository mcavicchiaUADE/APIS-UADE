import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/productos');
        
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.categoria === selectedCategory);

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
      <h2>Productos Disponibles</h2>
      {selectedCategory !== 'all' && (
        <p className="category-info">
          Mostrando productos de la categoría: <strong>{selectedCategory}</strong>
        </p>
      )}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img 
              src={product.imagen} 
              alt={product.nombre}
              className="product-image"
            />
            <h3 className="product-title">{product.nombre}</h3>
            <p className="product-category">{product.categoria}</p>
            <p className="product-price">${product.precio}</p>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
