"use client"

import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-20 h-20 gradient-brand rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="h-10 w-10 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">حدث خطأ غير متوقع</h2>
              <p className="text-muted-foreground">نعتذر، حدث خطأ أثناء تحميل المحتوى. يرجى المحاولة مرة أخرى.</p>
            </div>

            <div className="space-y-3">
              <Button onClick={() => window.location.reload()} className="w-full gradient-brand hover:opacity-90">
                <RefreshCw className="h-4 w-4 mr-2" />
                إعادة تحميل الصفحة
              </Button>

              <Button variant="outline" onClick={() => window.history.back()} className="w-full">
                العودة للخلف
              </Button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left text-xs text-muted-foreground bg-muted p-4 rounded-lg">
                <summary className="cursor-pointer font-medium mb-2">تفاصيل الخطأ</summary>
                <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// مكون خطأ بسيط للاستخدام السريع
export function ErrorFallback({
  error,
  resetError,
}: {
  error: Error
  resetError: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold mb-2">حدث خطأ</h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        {error.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."}
      </p>
      <Button onClick={resetError} variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        المحاولة مرة أخرى
      </Button>
    </div>
  )
}
