
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/**
 * Hook to provide haptic feedback functionality
 * Works only on mobile devices using Capacitor
 */
export const useHapticFeedback = () => {
  /**
   * Checks if the device supports haptic feedback
   */
  const isHapticSupported = async (): Promise<boolean> => {
    try {
      // There's no direct way to check support in Capacitor Haptics
      // So we'll return true and let the methods fail gracefully if needed
      return true;
    } catch (error) {
      console.debug('Error checking haptic support:', error);
      return false;
    }
  };

  /**
   * Triggers haptic feedback using all available methods for maximum compatibility
   * Silently fails on unsupported devices
   */
  const triggerHaptic = async () => {
    try {
      // Try multiple methods in sequence for better compatibility across devices
      
      // Method 1: Notification (works well on iOS)
      try {
        await Haptics.notification({ type: NotificationType.Success });
        console.debug('Haptic notification triggered');
      } catch (e) {
        console.debug('Haptic notification failed:', e);
      }
      
      // Method 2: Impact (works well on Android)
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
        console.debug('Haptic impact triggered');
      } catch (e) {
        console.debug('Haptic impact failed:', e);
      }
      
      // If we're in a development environment and not in a Capacitor app,
      // log that haptics require a native build
      if (typeof window !== 'undefined' && !window.Capacitor) {
        console.debug('Note: Full haptic feedback requires building as a native app with Capacitor');
      }
    } catch (error) {
      // Catch any unexpected errors
      console.debug('All haptic feedback methods failed:', error);
    }
  };
  
  /**
   * Vibrates the device for a specific duration
   * This is a more reliable fallback method that works on most devices
   * @param duration Duration in milliseconds
   */
  const vibrate = async (duration: number = 20) => {
    try {
      await Haptics.vibrate({ duration });
      console.debug('Vibration triggered for', duration, 'ms');
      
      // Try fallback for web
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(duration);
        console.debug('Web vibration API used as fallback');
      }
    } catch (error) {
      console.debug('Vibration failed:', error);
      
      // Try web vibration API as a fallback
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(duration);
        console.debug('Web vibration API used as fallback after error');
      }
    }
  };
  
  return { 
    triggerHaptic,
    vibrate,
    isHapticSupported
  };
};
