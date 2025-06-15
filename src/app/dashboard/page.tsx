import { auth } from "@/auth";
import Link from "next/link";
import React from "react";

async function DashboardPage() {
  const session = await auth();
  return (
    <div className="flex flex-col grow items-center justify-center text-gray-100 gap-y-4">
      <div className="flex flex-col items-center gap-y-2 border-2 p-4 border-gray-500 rounded-2xl bg-gray-800">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-lg">Hoşgeldin {session!.user.name}</p> {/* middleware sayesinde boş session dönmeyecek */}
        <p className="text-lg">Rolün: {session!.user.role}</p>
        {session!.user.role !== "admin" && (
          <><p className="text-lg">Giriş yaptığın hesapta admin yetkisi varsa yukarıda admin bağlantısını görebilirsin. Admin yetkisi için Auth0 dashboard {'>'} User Management</p>
          <p className="text-lg">
          Detaylı bilgi için readme bölümüne bakınız:
        </p>
        <Link href="https://github.com/murat-aydin01/next-auth" className="text-blue-500 hover:underline">
          https://github.com/murat-aydin01/next-auth
        </Link></>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
