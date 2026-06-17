import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const backendUrl =
    `http://localhost:8000/api/connect?plugin=gmail`;

  const response = await fetch(backendUrl, {
    headers: {
      "x-user-id": session.user.id,
    },
    redirect: "manual",
  });

  const redirectUrl = response.headers.get("location");

  if (!redirectUrl) {
    return NextResponse.json(
      { message: "No redirect URL received" },
      { status: 500 }
    );
  }

  return NextResponse.redirect(redirectUrl);
}