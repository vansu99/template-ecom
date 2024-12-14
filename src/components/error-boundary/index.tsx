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

    // eslint-disable-next-line react/state-in-constructor
    this.state = { hasError: false } as ErrorBoundaryStateTypes;
  }

  public static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.group('COMPONENT RENDERING ERROR 🚨');
      console.error({ error, errorInfo });
      // eslint-disable-next-line no-console
      console.groupEnd();
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen">
          <div className="flex flex-col justify-center items-center gap-4 py-4 px-8">
            <h2>Oops, compilation error {`</>`}</h2>
            <button
              type="button"
              onClick={function () {
                if (typeof globalThis !== 'undefined') globalThis.location.reload();
              }}
            >
              <span>Try again?</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
