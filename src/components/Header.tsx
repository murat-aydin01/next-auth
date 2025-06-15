"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const { data: session } = useSession();
  const pathName = usePathname();

  if (!session) {
    return (
      <header className="flex justify-end items-center">
        <button onClick={() => signIn("auth0", { redirectTo: "/dashboard" })} className="hover:cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
          Sign In
        </button>
      </header>
    );
  }
  if (session) {
    return (
      <header className="flex justify-between items-center">
        <nav className="flex gap-4">
          <Link href="/dashboard" className={pathName === "/dashboard" ? "active" : ""}>
            Dashboard
          </Link>
          {session.user.role === "admin" && (
            <Link href="/admin" className={pathName === "/admin" ? "active" : ""}>
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end ">
            <p>{session.user.name}</p>
            <button onClick={() => signOut({ redirectTo: "/" })} className="hover:cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">Sign Out</button>
          </div>
          <img className="w-16 h-16 rounded-full" src={session.user.image as string} alt="profile picture" />
        </div>
      </header>
    );
  }
}

export default Header;
