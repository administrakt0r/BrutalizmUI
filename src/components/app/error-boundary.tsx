"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

export type ErrorBoundaryProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export type ErrorBoundaryState = {
  hasError: boolean
  error?: Error
}

/**
 * ⚡ Bolt: A React Error Boundary component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * @class ErrorBoundary
 * @extends {React.Component<ErrorBoundaryProps, ErrorBoundaryState>}
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static displayName = "ErrorBoundary"

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  /**
   * Update state so the next render will show the fallback UI.
   *
   * @param {Error} error - The error that was thrown.
   * @returns {ErrorBoundaryState} The new state to trigger a re-render.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  /**
   * Renders the child components, or a fallback UI if an error occurred.
   *
   * @returns {React.ReactNode} The rendered child tree or fallback UI.
   */
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="text-2xl font-heading">Something went wrong</h2>
          <p className="text-muted-foreground max-w-md">
            An error occurred while rendering this component. Please try
            refreshing the page.
          </p>
          <Button
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            Try again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
