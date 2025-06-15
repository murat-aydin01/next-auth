export async function getManagementToken() {
  const res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
      audience: process.env.AUTH0_MANAGEMENT_AUDIENCE,
      grant_type: "client_credentials",
    }),
  });

  const data = await res.json();
  return data.access_token;
}

const AUTH0_BASE_URL = `https://${process.env.AUTH0_DOMAIN}/api/v2`;

export const auth0Endpoints = {
  users: `${AUTH0_BASE_URL}/users`,

  userById: (userId: string) =>
    `${AUTH0_BASE_URL}/users/${encodeURIComponent(userId)}`,

  userRoles: (userId: string) =>
    `${AUTH0_BASE_URL}/users/${encodeURIComponent(userId)}/roles`,

  assignRoleToUser: (userId: string) =>
    `${AUTH0_BASE_URL}/users/${encodeURIComponent(userId)}/roles`,


  roles: `${AUTH0_BASE_URL}/roles`,
};
