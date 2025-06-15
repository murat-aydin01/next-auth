"use client";

import { Auth0User, Auth0Role } from "@/types/types";
import { useState } from "react";

type Props = {
  user: Auth0User;
  roles: Auth0Role[];
};

export default function UserCard({ user, roles }: Props) {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [loading, setLoading] = useState(false);

  const handleChangeRole = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/users/${user.user_id}/role`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleId: selectedRole }),
      credentials: "include",
    });
    setLoading(false);
    if (res.ok) {
      alert("Rol güncellendi");
    } else {
      alert("Hata oluştu");
    }
  };

  return (
    <div className="border p-4 rounded shadow my-2">
      <p><strong>{user.email}</strong></p>
      <select
        className="border p-1 my-2"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name} - {role.description}
          </option>
        ))}
      </select>
      <button
        className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
        onClick={handleChangeRole}
        disabled={loading}
      >
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
