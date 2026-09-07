import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/reset-password";
  const error = searchParams.get("error");
  const errorDesc = searchParams.get("error_description");

  // Supabase sends ?error=access_denied&error_code=otp_expired when link invalid/expired
  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorDesc || error)}`
    );
  }

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          },
        },
      }
    );
    const { error: exError } = await supabase.auth.exchangeCodeForSession(code);
    if (!exError) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(exError.message)}`);
  }
  // Some flows use hash fragment (#access_token) — handled client-side in /reset-password
  return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent("Холбоос хүчингүй эсвэл хугацаа дууссан. Дахин сэргээх илгээнэ үү.")}`);
}
