"use server";

import { signIn, signOut } from "@/auth";

export async function signInAction () {
    await signIn("auth0", {redirectTo: "/dashboard"});
}

export async function signOutAction () {
    await signOut({ redirectTo: "/login" });
}
