
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SubscriptionPlan = 'free' | 'monthly' | 'annual';

interface SubscriptionStatus {
  isSubscribed: boolean;
  plan: SubscriptionPlan;
  credits: number;
  referralCredits: number;
  hasUsedWeeklySession: boolean;
}

export const useSubscription = () => {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isSubscribed: false,
    plan: 'free',
    credits: 1,
    referralCredits: 0,
    hasUsedWeeklySession: false,
  });

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data: subscription } = await supabase
        .from('subscriptions')
        .select()
        .eq('user_id', user.id)
        .maybeSingle();

      const { data: credits } = await supabase
        .from('session_credits')
        .select()
        .eq('user_id', user.id)
        .maybeSingle();

      setStatus({
        isSubscribed: subscription?.status === 'active' && subscription?.plan_type !== 'free',
        plan: (subscription?.plan_type as SubscriptionPlan) ?? 'free',
        credits: credits?.credits_remaining ?? 1,
        referralCredits: credits?.referral_credits ?? 0,
        hasUsedWeeklySession: credits?.credits_remaining === 0,
      });
    };

    fetchSubscriptionStatus();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel('subscription-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'subscriptions',
      }, fetchSubscriptionStatus)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'session_credits',
      }, fetchSubscriptionStatus)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return status;
};
