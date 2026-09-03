import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Price } from './Price';

describe('Shared UI - Price', () => {
  it('renders the expected currency value with decimals', () => {
    render(<Price value={99.99} />);
    expect(screen.getByText('$99.99')).toBeDefined();
  });

  it('renders whole numbers with two decimal places', () => {
    render(<Price value={50} />);
    expect(screen.getByText('$50.00')).toBeDefined();
  });

  it('handles zero value correctly', () => {
    render(<Price value={0} />);
    expect(screen.getByText('$0.00')).toBeDefined();
  });

  it('formats custom currency correctly if specified', () => {
    render(<Price value={19.5} currency="EUR" locale="de-DE" />);
    // In German locale EUR displays with 19,50 €
    expect(screen.getByTestId('mfe-price').textContent).toMatch(/19,50\s*€/);
  });
});
