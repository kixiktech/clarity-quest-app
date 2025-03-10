
/// <reference types="vite/client" />

// Add Capacitor to window object type
interface Window {
  Capacitor?: {
    isNative?: boolean;
    isPluginAvailable?: (name: string) => boolean;
  };
}
