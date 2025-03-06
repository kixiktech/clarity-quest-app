
import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * Hook to provide haptic feedback functionality
 * Works only on mobile devices using Capacitor
 */
export const useHapticFeedback = () => {
  /**
   * Triggers a light haptic feedback impact
   * Silently fails on unsupported devices
   */
  const triggerHaptic = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      // Silently fail on unsupported devices or web
      console.debug('Haptic feedback not supported on this device');
    }
  };
  
  return { triggerHaptic };
};
