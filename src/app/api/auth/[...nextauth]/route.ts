import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({  }) {
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });
      
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: 'user',
        });
      }
      return true;
    },
    async session({ session }) {
      // Attach user role/ID to the session so it's available in the frontend
      await connectDB();
      const dbUser = await User.findOne({ email: session.user?.email });
      if (dbUser && session.user) {
        (session.user).id = dbUser._id;
        (session.user).role = dbUser.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
