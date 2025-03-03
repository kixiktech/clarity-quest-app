
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { referralCode, userId } = await req.json();
    
    if (!referralCode || !userId) {
      throw new Error("Missing required parameters");
    }
    
    // Find the referrer based on the referral code (first part of their UUID)
    const { data: referrers, error: referrerError } = await supabase
      .from("auth.users")
      .select("id")
      .filter("id", "like", `${referralCode}%`)
      .limit(1);
      
    if (referrerError || !referrers || referrers.length === 0) {
      throw new Error("Invalid referral code");
    }
    
    const referrerId = referrers[0].id;
    
    // Check if this is a valid referral (not self-referral)
    if (referrerId === userId) {
      throw new Error("You cannot refer yourself");
    }
    
    // Create a new referral record
    const { error: insertError } = await supabase
      .from("referrals")
      .insert({
        referrer_id: referrerId,
        referred_user_id: userId,
        status: "completed"
      });
      
    if (insertError) {
      throw insertError;
    }
    
    // Update the referrer's credits
    const { data: referrerCredits, error: referrerCreditsError } = await supabase
      .from("session_credits")
      .select("*")
      .eq("user_id", referrerId)
      .single();
      
    if (referrerCreditsError && referrerCreditsError.code !== "PGRST116") {
      throw referrerCreditsError;
    }
    
    if (referrerCredits) {
      // Update existing credits
      await supabase
        .from("session_credits")
        .update({
          referral_credits: referrerCredits.referral_credits + 1
        })
        .eq("user_id", referrerId);
    } else {
      // Create new credits record
      await supabase
        .from("session_credits")
        .insert({
          user_id: referrerId,
          referral_credits: 1
        });
    }
    
    // Add credits for the referred user
    const { data: userCredits, error: userCreditsError } = await supabase
      .from("session_credits")
      .select("*")
      .eq("user_id", userId)
      .single();
      
    if (userCreditsError && userCreditsError.code !== "PGRST116") {
      throw userCreditsError;
    }
    
    if (userCredits) {
      // Update existing credits
      await supabase
        .from("session_credits")
        .update({
          referral_credits: userCredits.referral_credits + 1
        })
        .eq("user_id", userId);
    } else {
      // Create new credits record
      await supabase
        .from("session_credits")
        .insert({
          user_id: userId,
          referral_credits: 1
        });
    }
    
    return new Response(
      JSON.stringify({ success: true, message: "Referral processed successfully" }),
      { 
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
    
  } catch (error) {
    console.error("Error processing referral:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 400,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});
