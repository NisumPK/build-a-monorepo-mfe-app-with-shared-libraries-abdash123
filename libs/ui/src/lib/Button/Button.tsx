import React from 'react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`mfe-button ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        backgroundColor: disabled ? '#94a3b8' : '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease-in-out',
        boxShadow: disabled ? 'none' : '0 2px 6px rgba(37, 99, 235, 0.25)',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = '#1d4ed8';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(29, 78, 216, 0.35)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = '#2563eb';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 6px rgba(37, 99, 235, 0.25)';
        }
      }}
    >
      {label}
    </button>
  );
};
