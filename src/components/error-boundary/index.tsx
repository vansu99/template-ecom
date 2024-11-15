'use client';

import React from 'react';

type ErrorBoundaryPropTypes = {
  children: React.ReactNode;
};

type ErrorBoundaryStateTypes = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryPropTypes,
  ErrorBoundaryStateTypes
> {
  constructor(props: ErrorBoundaryPropTypes) {
    super(props);

    this.state = { hasError: false } as ErrorBoundaryStateTypes;
  }

  public static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.group('COMPONENT RENDERING ERROR 🚨');
      console.error({ error, errorInfo });
      console.groupEnd();
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col justify-center items-center gap-4 py-4 px-8">
          <h2>Oops, compilation error {`</>`}</h2>
          <button
            type="button"
            onClick={function () {
              if (typeof window !== 'undefined') window.location.reload();
            }}
          >
            <span>Try again?</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
