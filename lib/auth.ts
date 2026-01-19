import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Firebase",
      credentials: {
        idToken: { label: "ID Token", type: "text" },
        method: { label: "Method", type: "text" }, // google or phone
      },
      async authorize(credentials) {
        try {
          const method = (credentials?.method as string) || "google";
          const endpoint = method === "phone" ? "api/auth/phone-verify" : "api/auth/google-verify";

          const baseUrl = process.env.BACKEND_URL?.replace(/\/$/, "");
          const fullUrl = `${baseUrl}/${endpoint}`;

          const res = await axios.post(fullUrl, {
            idToken: credentials?.idToken,
          });

          if (res.data.success && res.data.data) {
            const { user, token } = res.data.data;
            return {
              id: String(user.id || user._id),
              name: user.displayName || user.name || user.phoneNumber,
              email: user.email,
              image: user.photoUrl || user.image,
              accessToken: token, // Backend Issued JWT
              role: user.role,
            };
          }
        } catch (error: any) {
          console.error("Auth.js Authorize Error:", error.response?.data || error.message);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session as any).accessToken = token.accessToken;
        (session as any).user.role = token.role;
        (session as any).user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
