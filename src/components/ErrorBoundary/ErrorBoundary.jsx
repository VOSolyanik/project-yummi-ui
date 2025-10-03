import React from 'react';

import css from './ErrorBoundary.module.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={css.errorBoundary}>
          <div className={css.errorContent}>
            <h2 className={css.errorTitle}>Oops! Something went wrong</h2>
            <p className={css.errorMessage}>
              We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button 
              className={css.retryButton}
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
