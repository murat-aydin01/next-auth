import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Auth0Provider({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile["kayraexport/role"]
        }
      },
      authorization: {
        params: {
          prompt: "login",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role as string
      return session
    },
  },
})
