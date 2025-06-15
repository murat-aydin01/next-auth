import { NextResponse } from "next/server";
import { auth0Endpoints, getManagementToken } from "@/lib/auth0";
import { withRoleAuth } from "@/lib/withRoleAuth";
import { Auth0User } from "@/types/types";

export async function GET() {
  return withRoleAuth(fetchUsers, "admin");
}
async function fetchUsers() {
  const accessToken = await getManagementToken();

    // 1. Tüm kullanıcıları çek
    const userRes = await fetch(auth0Endpoints.users, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userRes.ok) {
      const error = await userRes.json();
      return NextResponse.json({ error }, { status: userRes.status });
    }

    const users = await userRes.json();
    // 2. Her kullanıcı için rollerini çek
    const usersWithRoles = await Promise.all(
      users.map(async (user: Auth0User) => {
        const rolesRes = await fetch(auth0Endpoints.userRoles(user.user_id), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const roles = rolesRes.ok ? await rolesRes.json() : [];
        return {
          user_id: user.user_id,
          email: user.email,
          name: user.name,
          role: roles[0]?.name || "No Role"
        };
      })
    );
    return NextResponse.json(usersWithRoles);
}