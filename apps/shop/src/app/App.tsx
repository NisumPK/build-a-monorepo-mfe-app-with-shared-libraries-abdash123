import React, { useState } from 'react';
import { ProductList } from '../components/ProductList';
import { Product } from '@mfe/types';
import './App.css';

export const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="shop-app">
      <header className="shop-header">
        <div className="shop-header-content">
          <div className="shop-branding">
            <span className="shop-badge">Remote MFE</span>
            <h1>Shop Application</h1>
            <span className="shop-port-tag">Running on Port 4201</span>
          </div>
          <div className="shop-cart-indicator">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cart.length} items</span>
            <span className="cart-total">(${totalAmount.toFixed(2)})</span>
          </div>
        </div>
      </header>

      <div className="shop-banner">
        <div className="banner-content">
          <strong>Independent Shop Remote Mode:</strong> This application can run completely independently or be consumed by the Host Shell via Module Federation at <code>/assets/remoteEntry.js</code>.
        </div>
      </div>

      <main className="shop-main">
        <ProductList onAddToCart={handleAddToCart} isHostConsumed={false} />
      </main>

      <footer className="shop-footer">
        <p>Nx Monorepo MFE — Shop Remote Application</p>
      </footer>
    </div>
  );
};

export default App;
