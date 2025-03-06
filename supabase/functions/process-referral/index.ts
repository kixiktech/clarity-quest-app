
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ProcessReferralRequest {
  referralCode: string;
  newUserId: string;
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  // Get env variables
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

  // Validate env variables are set
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing environment variables");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Parse the request body
    const { referralCode, newUserId } = await req.json() as ProcessReferralRequest;
    
    if (!referralCode || !newUserId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Find the referrer user from the referral code
    // In this simple example, we're assuming the referral code is part of the user's ID
    const { data: users, error: userError } = await supabase
      .from("auth.users")
      .select("id")
      .ilike("id", `${referralCode}%`)
      .limit(1);

    if (userError || !users || users.length === 0) {
      console.error("Error finding referrer:", userError);
      return new Response(
        JSON.stringify({ error: "Invalid referral code" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const referrerId = users[0].id;

    // Store the referral in the database
    const { error: referralError } = await supabase
      .from("referrals")
      .insert({
        referrer_id: referrerId,
        referred_user_id: newUserId,
        status: "completed",
      });

    if (referralError) {
      console.error("Error saving referral:", referralError);
      return new Response(
        JSON.stringify({ error: "Failed to process referral" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Add credits to both users
    for (const userId of [referrerId, newUserId]) {
      // Check if user has session_credits
      const { data: credits, error: creditsError } = await supabase
        .from("session_credits")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (creditsError && creditsError.code !== "PGRST116") {
        console.error(`Error checking credits for ${userId}:`, creditsError);
        continue;
      }

      if (credits) {
        // Update existing record
        const { error: updateError } = await supabase
          .from("session_credits")
          .update({
            referral_credits: (credits.referral_credits || 0) + 2, // Add 2 credits
          })
          .eq("user_id", userId);

        if (updateError) {
          console.error(`Error updating credits for ${userId}:`, updateError);
        }
      } else {
        // Create new record
        const { error: insertError } = await supabase
          .from("session_credits")
          .insert({
            user_id: userId,
            credits_remaining: 1, // Default free credit
            referral_credits: 2, // Bonus credits from referral
          });

        if (insertError) {
          console.error(`Error creating credits for ${userId}:`, insertError);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Referral processed successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing referral:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
