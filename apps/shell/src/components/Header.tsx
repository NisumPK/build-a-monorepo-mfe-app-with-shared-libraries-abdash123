import React from 'react';
import { Product } from '@mfe/types';
import { Price } from '@mfe/ui';

export interface HeaderProps {
  cart: Product[];
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cart }) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <header
      style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        borderBottom: '1px solid #1e293b',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 800,
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
            }}
          >
            ⚛️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                }}
              >
                MFE Shell Application
              </span>
              <span
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Host
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Nx Monorepo • Module Federation Consumer (Port 4200)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              padding: '8px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <span style={{ fontSize: '18px' }}>🛒</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>
                Shopping Cart
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '9999px',
                  }}
                >
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
                <Price value={totalAmount} style={{ color: '#38bdf8', fontSize: '14px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
