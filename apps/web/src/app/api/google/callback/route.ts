import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { exchangeCodeForTokens, getGoogleAccounts, getGoogleLocations } from "@/lib/google";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const businessId = searchParams.get("state");
  const error = searchParams.get("error");

  if (error || !code || !businessId) {
    return NextResponse.redirect(new URL("/businesses?error=google_auth_failed", req.url));
  }

  try {
    const tokens = await exchangeCodeForTokens(code);

    // Get the first Google account and location
    const accounts = await getGoogleAccounts(tokens.access_token);
    if (!accounts.length) {
      return NextResponse.redirect(new URL("/businesses?error=no_google_account", req.url));
    }

    const account = accounts[0];
    const locations = await getGoogleLocations(tokens.access_token, account.name);
    const location = locations[0];

    await prisma.business.update({
      where: { id: businessId },
      data: {
        googleAccountId: account.name,
        googleLocationId: location?.name ?? null,
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
        googleTokenExpiry: new Date(Date.now() + tokens.expires_in * 1000),
      },
    });

    return NextResponse.redirect(
      new URL(`/businesses/${businessId}?connected=true`, req.url)
    );
  } catch (err) {
    console.error("Google callback error:", err);
    return NextResponse.redirect(new URL("/businesses?error=google_connect_failed", req.url));
  }
}
