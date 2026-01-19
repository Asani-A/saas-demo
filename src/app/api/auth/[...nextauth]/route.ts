import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

const handler = NextAuth({
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
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
      } catch (error) {
        console.error("❌ SIGNIN ERROR:", error);
        return false;
      }
    }, // <--- This comma was likely missing or misplaced

    async session({ session }) {
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user?.email });
        
        if (dbUser && session.user) {
          session.user.id = dbUser._id.toString();
          session.user.role = dbUser.role;
        }
        return session;
      } catch (error) {
        console.error("❌ SESSION ERROR:", error);
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };
