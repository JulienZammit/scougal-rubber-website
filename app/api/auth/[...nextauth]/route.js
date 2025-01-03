import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // On précise la stratégie "jwt"
  session: {
    strategy: "jwt",
  },
  // On rajoute la clé 'secret'
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const envUser = process.env.BLOG_BUILD_USERNAME;
        const envPass = process.env.BLOG_BUILD_PASSWORD;

        if (credentials?.username === envUser && credentials?.password === envPass) {
          return { id: "internal-user", name: "Internal team", role: "admin" };
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
