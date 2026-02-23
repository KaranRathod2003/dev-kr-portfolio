import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const providers = [];

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.username = (profile as { login?: string }).login;
        token.githubId = String(
          profile.sub || (profile as { id?: number }).id
        );
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.username = token.username as string;
        session.user.githubId = token.githubId as string;
      }
      return session;
    },
  },
});
