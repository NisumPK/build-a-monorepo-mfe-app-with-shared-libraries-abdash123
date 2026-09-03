import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductList } from './ProductList';
import { mockProducts } from '../data/mockProducts';

describe('Shop - ProductList Component', () => {
  it('renders the product list successfully', () => {
    render(<ProductList />);
    expect(screen.getByText('Featured Products')).toBeDefined();
    expect(screen.getByText(`${mockProducts.length} Products Available`)).toBeDefined();
  });

  it('renders all products with their names and prices', () => {
    render(<ProductList />);
    mockProducts.forEach((product) => {
      // Product name is rendered
      expect(screen.getByText(product.name)).toBeDefined();
    });
    // Formatted prices
    expect(screen.getByText('$99.99')).toBeDefined();
    expect(screen.getByText('$49.99')).toBeDefined();
    expect(screen.getByText('$89.99')).toBeDefined();
    expect(screen.getByText('$39.99')).toBeDefined();
  });

  it('uses shared Card and Button components', () => {
    const { container } = render(<ProductList />);
    // Shared Card uses .mfe-card
    const cards = container.querySelectorAll('.mfe-card');
    expect(cards.length).toBe(mockProducts.length);

    // Shared Button uses .mfe-button
    const buttons = container.querySelectorAll('.mfe-button');
    expect(buttons.length).toBe(mockProducts.length);
  });

  it('calls onAddToCart handler when Add to Cart button is clicked', () => {
    const handleAddToCart = vi.fn();
    render(<ProductList onAddToCart={handleAddToCart} />);

    const addToCartButtons = screen.getAllByRole('button', { name: /add to cart/i });
    expect(addToCartButtons.length).toBe(mockProducts.length);

    fireEvent.click(addToCartButtons[0]);
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProducts[0]);

    // Check that feedback alert appears
    const alert = screen.getByRole('alert');
    expect(alert).toBeDefined();
    expect(alert.textContent).toContain('Wireless Headphones');
  });

  it('supports custom product sets', () => {
    const customProducts = [
      { id: 99, name: 'Custom Widget', price: 15.0 },
    ];
    render(<ProductList products={customProducts} title="Custom Catalog" />);
    expect(screen.getByText('Custom Catalog')).toBeDefined();
    expect(screen.getByText('Custom Widget')).toBeDefined();
    expect(screen.getByText('$15.00')).toBeDefined();
  });
});
