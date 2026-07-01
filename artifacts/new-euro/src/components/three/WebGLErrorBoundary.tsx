import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Error boundary for WebGL/Three.js Canvas components.
 * Catches WebGL context creation errors gracefully (common in headless/no-GPU environments).
 */
export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch() {
    // silently swallow WebGL errors — they're expected in no-GPU environments
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 flex items-center justify-center border border-gold-500/20 shadow-glow-blue">
            <div className="text-center">
              <div className="text-6xl mb-4">🌍</div>
              <div className="text-gold-400 text-sm font-medium tracking-wider uppercase">Global Network</div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
