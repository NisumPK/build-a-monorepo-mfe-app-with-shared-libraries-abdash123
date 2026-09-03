import React from 'react';

export interface PriceProps {
  value: number;
  currency?: string;
  locale?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Price component renders a numeric value formatted as currency.
 * Defaults to USD ($) using Intl.NumberFormat.
 * Example: value=99.99 -> "$99.99"
 */
export const Price: React.FC<PriceProps> = ({
  value,
  currency = 'USD',
  locale = 'en-US',
  className = '',
  style = {},
}) => {
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return (
    <span
      className={`mfe-price ${className}`}
      data-testid="mfe-price"
      style={{
        fontSize: '18px',
        fontWeight: 700,
        color: '#0f172a',
        letterSpacing: '-0.02em',
        ...style,
      }}
    >
      {formattedPrice}
    </span>
  );
};
