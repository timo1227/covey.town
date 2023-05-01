import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../utils/mongodb';
import dbconnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { compare } from 'bcrypt';

if (
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET ||
  !process.env.NEXTAUTH_SECRET
) {
  throw new Error('Google Secrets and Github Secrets must be defined');
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        // Connect to database
        await dbconnect();
        // Find user in database with email address
        const user = await User.findOne({ email: credentials?.email });

        // Email not found
        if (!user) {
          throw new Error('No user found');
        }

        // Check the hashed password against the plain text password
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const isValid = await compare(credentials!.password, user.hashedPassword);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        // Return user object
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/Login',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
});
