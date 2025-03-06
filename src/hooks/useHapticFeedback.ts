
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
      return true; // Assume support, will fail gracefully if not supported
    } catch (error) {
      console.debug('Error checking haptic support:', error);
      return false;
    }
  };

  /**
   * Triggers a light haptic feedback impact
   * Silently fails on unsupported devices
   */
  const triggerHaptic = async () => {
    try {
      // Try the notification type first as it's more reliable on iOS
      await Haptics.notification({ type: NotificationType.Success });
      
      // Also try impact as a fallback
      await Haptics.impact({ style: ImpactStyle.Medium });
      
      console.debug('Haptic feedback triggered');
    } catch (error) {
      // Silently fail on unsupported devices or web
      console.debug('Haptic feedback failed:', error);
    }
  };
  
  /**
   * Vibrates the device for a specific duration
   * This is a more reliable fallback method
   */
  const vibrate = async (duration: number = 20) => {
    try {
      await Haptics.vibrate({ duration });
      console.debug('Vibration triggered');
    } catch (error) {
      console.debug('Vibration failed:', error);
    }
  };
  
  return { 
    triggerHaptic,
    vibrate,
    isHapticSupported
  };
};
