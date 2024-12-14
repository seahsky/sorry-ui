import { type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ApologyReason } from "../../../../models/ApologyReason";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const data: ApologyReason[] = await req.json();
    
    // Save acceptance data to Supabase
    const { error } = await supabase
      .from('apology_acceptances')
      .insert({
        reasons: data.map((reason) => reason.text).join('|'),
        accepted_at: new Date().toISOString()
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