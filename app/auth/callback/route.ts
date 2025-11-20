import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo") || searchParams.get("next") || "/dashboard";

  console.log("Auth callback - code:", code ? "present" : "missing");
  console.log("Auth callback - redirectTo:", redirectTo);
  console.log("Auth callback - origin:", origin);

  if (code) {
    const cookieStore = await cookies();
    const response = NextResponse.redirect(`${origin}${redirectTo}`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: "", ...options });
            response.cookies.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("Auth callback - exchange result:", error ? `error: ${error.message}` : "success");

    if (!error) {
      console.log("Auth callback - redirecting to:", `${origin}${redirectTo}`);
      return response;
    }

    console.log("Auth callback - auth error, redirecting to login with error");
  }

  // Return the user to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
