import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminUser = ["zarivate@gmail.com"];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    // This is to verify the user that's currently logged in to ensure only the exact person is accessing the admin portal
    session: ({ session, token, user }) => {
      // Check to see if the session email matches up with the designated admin email, if so allow them to log in else don't
      if (adminUser.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAuthorized(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminUser.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "Unauthorized user";
  }
}
