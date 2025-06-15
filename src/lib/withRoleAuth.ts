import { auth } from "@/auth";
import { NextResponse } from "next/server";

type Handler = () => Promise<Response>;

export async function withRoleAuth(handler: Handler, requiredRole: string): Promise<Response> {
  const session = await auth();

  const userRole = session?.user?.role;

  if (!session || userRole !== requiredRole) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return handler();
}
