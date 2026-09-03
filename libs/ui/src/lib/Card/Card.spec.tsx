import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Shared UI - Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <h2>Wireless Headphones</h2>
        <p>Premium audio device</p>
      </Card>
    );

    expect(screen.getByText('Wireless Headphones')).toBeDefined();
    expect(screen.getByText('Premium audio device')).toBeDefined();
  });

  it('renders with container styling and custom class', () => {
    const { container } = render(
      <Card className="custom-card">
        <span>Card Content</span>
      </Card>
    );

    const cardDiv = container.querySelector('.mfe-card');
    expect(cardDiv).toBeDefined();
    expect(cardDiv?.classList.contains('custom-card')).toBe(true);
  });
});
