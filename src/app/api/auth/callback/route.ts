import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    // Step 1: Redirect to Google OAuth
    const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
    const redirectUri = "http://localhost:3008/api/auth/callback";
    const scope = "https://www.googleapis.com/auth/adwords";

    const authUrl =
      `https://accounts.google.com/o/oauth2/auth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&response_type=code` +
      `&access_type=offline` +
      `&prompt=consent`;

    return NextResponse.redirect(authUrl);
  }

  // Step 2: Exchange code for tokens
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      redirect_uri: "http://localhost:3008/api/auth/callback",
      grant_type: "authorization_code",
    }),
  });

  const data = await res.json();

  if (data.error) {
    return NextResponse.json({ error: data.error, description: data.error_description }, { status: 400 });
  }

  return NextResponse.json({
    message: "以下の refresh_token を .env.local の GOOGLE_ADS_REFRESH_TOKEN に設定してください",
    refresh_token: data.refresh_token,
    access_token: data.access_token,
  });
}
