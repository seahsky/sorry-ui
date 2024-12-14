import { type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ApologyReason } from "../../../../models/ApologyReason";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: NextRequest) {
  try {
    const data: {reasons: ApologyReason[]} = await req.json();
    
    // Get IP address
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : req.headers.get('x-real-ip');
    
    // Get user agent
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    // Create a basic browser fingerprint
    const fingerprint = {
      userAgent,
      language: req.headers.get('accept-language'),
      platform: req.headers.get('sec-ch-ua-platform'),
      mobile: req.headers.get('sec-ch-ua-mobile'),
      vendor: req.headers.get('sec-ch-ua-vendor'),
    };
    
    // Save acceptance data to Supabase
    const { error } = await supabase
      .from('apology_acceptances')
      .insert({
        reasons: data.reasons.map((reason) => reason.text).join('|'),
        accepted_at: new Date().toISOString(),
        ip_address: ip,
        user_agent: userAgent,
        browser_fingerprint: fingerprint
      });

    if (error) {
      throw error;
    }
	
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error accepting apology:", error);
    return Response.json(
      { error: "Failed to accept apology" },
      { status: 500 }
    );
  }
} 