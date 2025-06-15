import { withRoleAuth } from "@/lib/withRoleAuth";
import { auth0Endpoints, getManagementToken } from "@/lib/auth0";
import { NextResponse } from "next/server";

export const GET = async () =>
  withRoleAuth(async () => {
    const token = await getManagementToken();

    const res = await fetch(auth0Endpoints.roles, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error }, { status: res.status });
    }

    const roles = await res.json();
    return NextResponse.json(roles);
  }, "admin");
