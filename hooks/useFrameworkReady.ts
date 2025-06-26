import { useEffect } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    // Check if we're in a browser environment and the function exists
    if (typeof window !== 'undefined' && window.frameworkReady) {
      try {
        window.frameworkReady();
      } catch (error) {
        // Silently handle any errors to prevent app crashes
        console.warn('Framework ready hook error:', error);
      }
    }
  }); // Removed dependency array to restore original behavior
}