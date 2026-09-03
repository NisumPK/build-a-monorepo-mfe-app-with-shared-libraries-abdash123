import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Micro Frontend loading error caught by Shell ErrorBoundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            margin: '40px auto',
            maxWidth: '640px',
            backgroundColor: '#ffffff',
            border: '1px solid #fed7aa',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h3 style={{ margin: '0 0 12px 0', color: '#9a3412', fontSize: '20px', fontWeight: 700 }}>
            Shop Micro Frontend Unavailable
          </h3>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
            The Shell Host was unable to load the <code>shop</code> Remote module over Module Federation.
            This typically occurs if the remote server at <code>http://localhost:4201</code> is offline or unreachable.
          </p>
          <div
            style={{
              backgroundColor: '#fff7ed',
              border: '1px solid #ffedd5',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: '#c2410c',
              marginBottom: '24px',
              textAlign: 'left',
              wordBreak: 'break-all',
            }}
          >
            {this.state.error?.message || 'Remote module network request failed'}
          </div>
          <button
            onClick={this.handleRetry}
            style={{
              padding: '10px 24px',
              backgroundColor: '#ea580c',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c2410c')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ea580c')}
          >
            Retry Loading Remote
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
