import React, { useState } from 'react';
import { Product } from '@mfe/types';
import { Card, Button, Price } from '@mfe/ui';
import { mockProducts } from '../data/mockProducts';

export interface ProductListProps {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
  title?: string;
  isHostConsumed?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products = mockProducts,
  onAddToCart,
  title = 'Featured Products',
  isHostConsumed = false,
}) => {
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAddedItemName(product.name);
    setTimeout(() => {
      setAddedItemName((current) => (current === product.name ? null : current));
    }, 2500);
  };

  return (
    <div className="product-list-container" style={{ padding: '8px 0' }}>
      {addedItemName && (
        <div
          role="alert"
          style={{
            backgroundColor: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          <span>
            🎉 <strong>{addedItemName}</strong> was added to your cart!
          </span>
          <button
            onClick={() => setAddedItemName(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#065f46',
            }}
          >
            ✕
          </button>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div>
          <h2
            style={{
              margin: '0 0 4px 0',
              fontSize: '24px',
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            {title}
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
            {isHostConsumed
              ? 'Rendered via Shop Remote MFE through Module Federation'
              : 'Standalone Shop Remote Catalog'}
          </p>
        </div>
        <span
          style={{
            backgroundColor: '#f1f5f9',
            color: '#334155',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {products.length} Products Available
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {products.map((product) => (
          <Card key={product.id} className="product-card">
            <div
              style={{
                height: '140px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '56px',
                marginBottom: '16px',
                border: '1px solid #f1f5f9',
              }}
            >
              {product.imageUrl || '📦'}
            </div>

            <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
              {product.category && (
                <span
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 700,
                    color: '#2563eb',
                    marginBottom: '6px',
                  }}
                >
                  {product.category}
                </span>
              )}

              <h3
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1e293b',
                }}
              >
                {product.name}
              </h3>

              {product.description && (
                <p
                  style={{
                    fontSize: '13px',
                    color: '#64748b',
                    lineHeight: '1.5',
                    margin: '0 0 16px 0',
                    flex: '1 1 auto',
                  }}
                >
                  {product.description}
                </p>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid #f1f5f9',
                  marginTop: 'auto',
                }}
              >
                <Price value={product.price} />
                <Button
                  label="Add to Cart"
                  onClick={() => handleAddToCart(product)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
