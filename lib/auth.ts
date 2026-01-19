// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Custom Backend",
      credentials: {
        idToken: { label: "ID Token", type: "text" }
        // fcmToken: { label: "FCM Token", type: "text" },
      },
      async authorize(credentials) {
        // --- STEP 1: Handshake with YOUR Backend ---

        const res = await axios.post(`${process.env.BACKEND_URL}/api/auth/google-verify`, {
          idToken: credentials?.idToken,
          // fcmToken: credentials?.fcmToken,
        });

        // --- STEP 2: Logic check ---
        if (res.data.success && res.data.data) {
          // Return an object that includes your backend's JWT
          return {
            id: res.data.data.user.id,
            name: res.data.data.user.displayName,
            email: res.data.data.user.email,
            image: res.data.data.user.photoUrl,
            accessToken: res.data.token, // This is your BACKEND's JWT
            role: res.data.data.user.role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // --- STEP 3: Store Backend JWT in the Auth.js Token ---
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
      }
      return token;
    },
    // --- STEP 4: Expose Backend JWT to the Client/React ---
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session as any).user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt", // Use JWT strategy to match your backend
  },
  pages: {
    signIn: "/login",
  },
});

