import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Utsav Mitra:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#FAFAFA',
          color: '#1F1A1C',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            backgroundColor: '#800020',
            color: '#D4AF37',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <AlertTriangle size={32} />
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#800020', marginBottom: '8px' }}>
            উৎসব মিত্র লোড হতে সাময়িক সমস্যা হয়েছে
          </h2>

          <p style={{ fontSize: '13px', color: '#666', maxWidth: '320px', marginBottom: '20px' }}>
            অ্যাপটি পুনরায় রিলোড করতে নিচের বাটনে ট্যাপ করুন।
          </p>

          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#800020',
              color: '#D4AF37',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RotateCcw size={16} />
            <span>অ্যাপ রিলোড করুন</span>
          </button>

          {this.state.error && (
            <div style={{
              marginTop: '24px',
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              fontSize: '11px',
              color: '#ef4444',
              maxWidth: '350px',
              textAlign: 'left',
              overflowX: 'auto',
              border: '1px solid #e5e7eb'
            }}>
              <strong>Error:</strong> {this.state.error.toString()}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
