import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WaitlistRequest {
  email: string;
  current_status: string;
  role_interest: string;
  visa_need: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate request body
    const { email, current_status, role_interest, visa_need }: WaitlistRequest =
      await req.json();

    // Validate required fields
    if (!email || !current_status || !role_interest || !visa_need) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Initialize Supabase client with service role key (bypasses RLS)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into database
    console.log("Inserting waitlist signup into database...");
    const { data: dbData, error: dbError } = await supabase
      .from("waitlist_signups")
      .insert({
        email: email.trim().toLowerCase(),
        current_status,
        role_interest,
        visa_need,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      
      // Handle duplicate email
      if (dbError.code === "23505") {
        return new Response(
          JSON.stringify({ error: "This email is already on the waitlist" }),
          {
            status: 409,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      throw dbError;
    }

    console.log("Database insert successful:", dbData.id);

    // Send welcome email using Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    console.log("Sending welcome email...");
    const emailResponse = await resend.emails.send({
      from: "Only Remote <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Only Remote! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Only Remote</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: linear-gradient(135deg, #22b8cf 0%, #4c6ef5 100%); padding: 40px; border-radius: 16px 16px 0 0; text-align: center;">
                <h1 style="margin: 0; color: white; font-size: 32px; font-weight: bold;">
                  Welcome to Only Remote! 🎉
                </h1>
              </div>
              
              <div style="background-color: white; padding: 40px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <p style="margin: 0 0 20px; font-size: 18px; color: #1e293b; line-height: 1.6;">
                  Hi there! 👋
                </p>
                
                <p style="margin: 0 0 20px; font-size: 16px; color: #475569; line-height: 1.6;">
                  You're now on the <strong>Only Remote waitlist</strong>! Thank you for joining us on this journey to revolutionize remote job searching.
                </p>
                
                <div style="background-color: #f1f5f9; padding: 24px; border-radius: 12px; margin: 24px 0;">
                  <h2 style="margin: 0 0 16px; font-size: 20px; color: #1e293b;">What happens next?</h2>
                  <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                    <li>You'll be the <strong>first to know</strong> when we launch</li>
                    <li>Get <strong>early access</strong> to our auto-apply feature</li>
                    <li>Receive exclusive updates on our progress</li>
                    <li>Join our community of remote job seekers</li>
                  </ul>
                </div>
                
                <p style="margin: 24px 0; font-size: 16px; color: #475569; line-height: 1.6;">
                  We're working hard to build the best remote job search experience for you. Stay tuned for updates!
                </p>
                
                <div style="margin: 32px 0; text-align: center;">
                  <a href="https://www.onlyremote.org" style="display: inline-block; background: linear-gradient(135deg, #22b8cf 0%, #4c6ef5 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    Visit Our Website
                  </a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
                
                <p style="margin: 0; font-size: 14px; color: #94a3b8; text-align: center;">
                  Only Remote - Your remote job search, automated<br>
                  Questions? Reply to this email or contact us at hello@onlyremote.org
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (emailResponse.error) {
      console.error("Email sending error:", emailResponse.error);
      // Don't fail the request if email fails - user is already in database
    } else {
      console.log("Email sent successfully:", emailResponse.data?.id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Successfully added to waitlist",
        id: dbData.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-waitlist function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
