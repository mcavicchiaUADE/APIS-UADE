import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotal, getTotalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-sidebar">
        <h3 className="cart-title">Carrito de Compras</h3>
        <div className="empty-cart">
          Tu carrito está vacío
        </div>
      </div>
    );
  }

  return (
    <div className="cart-sidebar">
      <h3 className="cart-title">
        Carrito de Compras ({getTotalItems()} items)
      </h3>
      
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img 
            src={item.imagen} 
            alt={item.nombre}
            className="cart-item-image"
          />
          <div className="cart-item-details">
            <h4 className="cart-item-title">{item.nombre}</h4>
            <p className="cart-item-price">${item.precio}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{
                  background: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                -
              </button>
              <span style={{ minWidth: '20px', textAlign: 'center' }}>
                {item.quantity}
              </span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={{
                  background: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                +
              </button>
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="cart-total">
        Total: ${getTotal().toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
