import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
    adapter : PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret : process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn : '/sign-in',
    },
    secret : process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };