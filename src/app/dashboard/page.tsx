import { auth } from "@/auth";
import React from "react";
import { signOutAction } from "../actions";

async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
      <form action={signOutAction}>
        <button type="submit">çıkış yap</button>
      </form>
    </div>
  );
}

export default DashboardPage;
