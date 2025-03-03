
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
    
    console.log(`Processing referral with code ${referralCode} for user ${userId}`);
    
    // Find the referrer based on the referral code (first part of their UUID)
    const { data: referrers, error: referrerError } = await supabase
      .from("users")
      .select("id")
      .filter("id", "like", `${referralCode}%`)
      .limit(1);
      
    if (referrerError) {
      console.error("Error finding referrer:", referrerError);
      throw new Error("Error finding referrer");
    }
    
    if (!referrers || referrers.length === 0) {
      console.log("Invalid referral code, no matching users found");
      throw new Error("Invalid referral code");
    }
    
    const referrerId = referrers[0].id;
    console.log(`Found referrer with ID: ${referrerId}`);
    
    // Check if this is a valid referral (not self-referral)
    if (referrerId === userId) {
      throw new Error("You cannot refer yourself");
    }
    
    // Check if this referral already exists
    const { data: existingReferrals, error: checkError } = await supabase
      .from("referrals")
      .select("*")
      .eq("referrer_id", referrerId)
      .eq("referred_user_id", userId);
      
    if (checkError) {
      console.error("Error checking existing referrals:", checkError);
      throw new Error("Error checking existing referrals");
    }
    
    if (existingReferrals && existingReferrals.length > 0) {
      console.log("This referral has already been processed");
      return new Response(
        JSON.stringify({ success: true, message: "This referral has already been processed" }),
        { 
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
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
      console.error("Error inserting referral:", insertError);
      throw insertError;
    }
    
    console.log("Referral record created, now updating credits for referrer");
    
    // Update the referrer's credits
    const { data: referrerCredits, error: referrerCreditsError } = await supabase
      .from("session_credits")
      .select("*")
      .eq("user_id", referrerId)
      .single();
      
    if (referrerCreditsError && referrerCreditsError.code !== "PGRST116") {
      console.error("Error fetching referrer credits:", referrerCreditsError);
      throw referrerCreditsError;
    }
    
    if (referrerCredits) {
      // Update existing credits
      const { error: updateError } = await supabase
        .from("session_credits")
        .update({
          referral_credits: referrerCredits.referral_credits + 1
        })
        .eq("user_id", referrerId);
        
      if (updateError) {
        console.error("Error updating referrer credits:", updateError);
        throw updateError;
      }
    } else {
      // Create new credits record
      const { error: createError } = await supabase
        .from("session_credits")
        .insert({
          user_id: referrerId,
          referral_credits: 1
        });
        
      if (createError) {
        console.error("Error creating referrer credits:", createError);
        throw createError;
      }
    }
    
    console.log("Referrer credits updated, now updating credits for referred user");
    
    // Add credits for the referred user
    const { data: userCredits, error: userCreditsError } = await supabase
      .from("session_credits")
      .select("*")
      .eq("user_id", userId)
      .single();
      
    if (userCreditsError && userCreditsError.code !== "PGRST116") {
      console.error("Error fetching user credits:", userCreditsError);
      throw userCreditsError;
    }
    
    if (userCredits) {
      // Update existing credits
      const { error: updateError } = await supabase
        .from("session_credits")
        .update({
          referral_credits: userCredits.referral_credits + 1
        })
        .eq("user_id", userId);
        
      if (updateError) {
        console.error("Error updating user credits:", updateError);
        throw updateError;
      }
    } else {
      // Create new credits record
      const { error: createError } = await supabase
        .from("session_credits")
        .insert({
          user_id: userId,
          referral_credits: 1
        });
        
      if (createError) {
        console.error("Error creating user credits:", createError);
        throw createError;
      }
    }
    
    console.log("Referral processing completed successfully");
    
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
