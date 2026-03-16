import { NuxtAuthHandler } from "#auth";
// path is two levels up from this file
import prismaClient from "../../prisma";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@sidebase/authjs-prisma-adapter";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET as string,
  adapter: PrismaAdapter(prismaClient as any),
  // Ensure the user's id and tokens are available on the session object (for client-side stores)
  callbacks: {
    async jwt({ token, user, account }: any) {
      // Persist OAuth tokens for later use (e.g. downstream API calls)
      if (account) {
        if (account.access_token) token.accessToken = account.access_token;
        if (account.id_token) token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      if (session.user) {
        // NextAuth does not include the user's id by default in the session payload.
        // Attach it from the token (sub) or the user record for easy client-side access.
        session.user.id = token?.sub ?? user?.id ?? session.user.id;
        // Also forward OAuth tokens if available.
        if (token?.accessToken) {
          session.user.accessToken = token.accessToken;
        }
        if (token?.idToken) {
          session.user.idToken = token.idToken;
        }
      }
      return session;
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GitHubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    LinkedInProvider.default({
      clientId: process.env.LINKEDIN_CLIENT_ID || "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          // Keep scope configurable because LinkedIn apps often lack r_emailaddress by default.
          scope: "openid profile email",
        },
      },
      async profile(profile: {
        sub: string;
        name: string;
        given_name: string;
        family_name: string;
        email: string;
      }) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
