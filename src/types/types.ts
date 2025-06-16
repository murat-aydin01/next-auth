export type Auth0User = {
  user_id: string;
  email: string;
  name: string;
  role?: string;
};

export type Auth0Role = {
  id: string;
  name: string;
  description: string;
};
