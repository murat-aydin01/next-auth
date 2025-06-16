"use client";

import { Auth0User, Auth0Role } from "@/types/types";
import { useState } from "react";

type Props = {
  user: Auth0User;
  roles: Auth0Role[];
};

export default function UserCard({ user, roles }: Props) {
  const [selectedRole, setSelectedRole] = useState("");
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
      window.location.reload();
    } else {
      alert("Hata oluştu");
    }
  };

  return (
    <div className="flex flex-col border p-4 rounded-lg  shadow-md w-full max-w-md">
      <div>
        <p>{user.email}</p>
        <p>rol: {user.role}</p>
      </div>
      <div className="flex flex-col my-2">
        <label htmlFor="role-select" className="block mb-2">
          Rol Seçin:
        </label>
        <select
          className="border p-1 my-2 text-gray-700 rounded bg-amber-50"
          value={selectedRole}
          onChange={(e) => {setSelectedRole(e.target.value); console.log(e.target.value);}}
        >
          <option value="" disabled>Seçiniz</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name} - {role.description}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleChangeRole} disabled={loading || !selectedRole} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50">
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
