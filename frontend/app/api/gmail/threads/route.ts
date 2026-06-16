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

  const response = await fetch(
    "http://localhost:8000/api/gmail/threads",
    {
      headers: {
        "x-user-id": session.user.id,
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}
