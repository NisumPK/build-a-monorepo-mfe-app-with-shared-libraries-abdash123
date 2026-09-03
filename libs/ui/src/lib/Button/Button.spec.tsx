import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Shared UI - Button', () => {
  it('renders the button successfully', () => {
    render(<Button label="Test Button" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDefined();
  });

  it('displays the provided label', () => {
    render(<Button label="Add to Cart" />);
    expect(screen.getByText('Add to Cart')).toBeDefined();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button label="Disabled Button" onClick={handleClick} disabled />);
    const buttonElement = screen.getByRole('button', { name: /disabled button/i });
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
