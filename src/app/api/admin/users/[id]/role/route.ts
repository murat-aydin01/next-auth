import { NextResponse } from "next/server";
import { withRoleAuth } from "@/lib/withRoleAuth";
import { auth0Endpoints, getManagementToken } from "@/lib/auth0";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return withRoleAuth(async () => {
    const { id: userId } = await params;
    const { roleId } = await req.json(); // yeni atanacak rol

    const token = await getManagementToken();

    // 1. Mevcut rollerini al
    const rolesRes = await fetch(auth0Endpoints.userRoles(userId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const existingRoles = rolesRes.ok ? await rolesRes.json() : [];
    console.log("Mevcut roller:", existingRoles);
    const existingRoleIds = existingRoles.map((r: { id: string }) => r.id);

    console.log("Eski roller:", existingRoleIds);

    // 2. Tüm eski rolleri tek seferde sil
    if (existingRoleIds.length > 0) {
      const removeRes = await fetch(auth0Endpoints.removeRolesFromUser(userId), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roles: existingRoleIds }),
      });

      if (!removeRes.ok) {
        const error = await removeRes.json();
        return NextResponse.json({ error }, { status: removeRes.status });
      }
    }

    // 3. Yeni rolü ata
    const assignRes = await fetch(auth0Endpoints.assignRoleToUser(userId), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roles: [roleId] }),
    });

    if (!assignRes.ok) {
      const error = await assignRes.json();
      return NextResponse.json({ error }, { status: assignRes.status });
    }

    return NextResponse.json({ success: true });
  }, "admin");
}
