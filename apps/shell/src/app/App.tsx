import React, { Suspense, useState } from 'react';
import { Product } from '@mfe/types';
import { Header } from '../components/Header';
import { ErrorBoundary } from '../components/ErrorBoundary';
import './App.css';

// Dynamically load remote ProductList from Shop MFE
const RemoteProductList = React.lazy(() => import('shop/ProductList'));

const LoadingFallback: React.FC = () => (
  <div
    style={{
      padding: '48px 24px',
      textAlign: 'center',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      margin: '24px 0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    }}
  >
    <div
      style={{
        display: 'inline-block',
        width: '40px',
        height: '40px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px',
      }}
    />
    <h3 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '18px' }}>
      Loading Shop Micro Frontend...
    </h3>
    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
      Fetching <code>remoteEntry.js</code> from <code>http://localhost:4201</code> via Module Federation
    </p>
  </div>
);

export const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="shell-app">
      <Header cart={cart} />

      <main className="shell-main">
        {/* Architecture & Runtime Composition Banner */}
        <section className="shell-intro">
          <div className="shell-intro-badge">
            <span className="live-dot" />
            <span>Runtime Micro Frontend Architecture</span>
          </div>
          <h2>Host & Remote Composition</h2>
          <p>
            This <strong>Shell application (Port 4200)</strong> acts as the host container. The product catalog below
            is loaded dynamically at runtime from the <strong>Shop Remote application (Port 4201)</strong> using Vite Module Federation.
            Both applications share TypeScript interfaces from <code>@mfe/types</code> and UI components from <code>@mfe/ui</code>.
          </p>

          <div className="composition-flow">
            <div className="flow-step">
              <span className="flow-tag host">Shell Host (4200)</span>
              <p>Loads main shell layout & navigates</p>
            </div>
            <div className="flow-arrow">➔ <span>Module Federation</span> ➔</div>
            <div className="flow-step">
              <span className="flow-tag remote">Shop Remote (4201)</span>
              <p>Exposes <code>./ProductList</code></p>
            </div>
            <div className="flow-arrow">➔ <span>Shared Libs</span> ➔</div>
            <div className="flow-step">
              <span className="flow-tag shared">@mfe/types & @mfe/ui</span>
              <p>Provides unified design & models</p>
            </div>
          </div>
        </section>

        {/* Remote MFE Container with Error Boundary & Suspense */}
        <section className="remote-container">
          <div className="remote-header">
            <div className="remote-title-area">
              <span className="remote-tag">Remote Component</span>
              <h3>Shop MFE • Product Catalog</h3>
            </div>
            {cart.length > 0 && (
              <button onClick={handleClearCart} className="clear-cart-btn">
                Clear Cart ({cart.length})
              </button>
            )}
          </div>

          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <RemoteProductList
                onAddToCart={handleAddToCart}
                title="Micro Frontend Catalog"
                isHostConsumed={true}
              />
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>

      <footer className="shell-footer">
        <div className="footer-content">
          <p>
            <strong>Assignment 3 — Build a Monorepo MFE App with Shared Libraries</strong>
          </p>
          <p className="footer-subtext">
            Built with Nx monorepo, React, TypeScript, and Module Federation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
