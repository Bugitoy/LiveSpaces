import prisma from "@/db/prisma";
import { NextAuthOptions } from "next-auth";
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID as string,
            clientSecret: GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (!profile?.email) {
                throw new Error( 'No email for sign in')
            }

            await prisma.user.upsert({
                where: { email: profile.email },
                create: {
                    email: profile.email,
                    name: (profile as any).name ?? undefined,
                    avatar: (profile as any).picture ?? undefined,
                },
                update: {
                    name: (profile as any).name ?? undefined,
                    avatar: (profile as any).picture ?? undefined,
                },
            })

            return true
        },
        async jwt ({ token, user, profile }) {
            if (user && (user as any).id) {
                token.id = (user as any).id as string
                return token
            }
            if (!token.id && (profile as any)?.email) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: (profile as any).email as string },
                })
                if (existingUser) {
                    token.id = existingUser.id
                }
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && token.id) {
                ;(session.user as any).id = token.id as string
            }
            return session
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }