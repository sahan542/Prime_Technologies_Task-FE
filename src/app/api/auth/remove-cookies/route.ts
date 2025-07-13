import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { accessToken } = await req.json();

  const response = NextResponse.json(
    { message: "Cookies removed." },
    { status: 200 }
  );

  response.cookies.delete(accessToken);

  return response;
}
