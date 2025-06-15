import { auth } from "@/auth";
import UserCard from "@/components/UserCard";
import { Auth0User } from "@/types/types";
import { cookies } from "next/headers";
import React from "react";

async function AdminPage() {
  const session = await auth();
  const cookieStore = await cookies();

  if (!session || !session.user || session.user.role !== "admin") return <div>Access Denied</div>;

  const [users, roles] = await Promise.all([
    fetch("http://localhost:3000/api/admin/users", {
      headers: { Cookie: cookieStore.toString() },
    }).then((res) => res.json()),
    fetch("http://localhost:3000/api/admin/roles", {
      headers: { Cookie: cookieStore.toString() },
    }).then((res) => res.json()),
  ]);


  return users.length > 0 ? (
    <div>
      {users.map((user: Auth0User) => (
        <UserCard key={user.user_id} user={user} roles={roles} />
      ))}
    </div>
  ) : (
    <div>No users found</div>
  );
}

export default AdminPage;
