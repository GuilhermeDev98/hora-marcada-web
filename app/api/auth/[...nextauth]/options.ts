import GithubProvider from "next-auth/providers/github";

export const options = {
  providers: [
    GithubProvider({
      profile(profile) {
        let userRole = "GitHub User";

        if (profile?.email == "guilhermedev@hotmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.image = user.avatar_url;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.image = token.image;
      }
      return session;
    },
  },
};
