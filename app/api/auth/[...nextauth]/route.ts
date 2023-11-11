import NextAuth, { Account, AuthOptions, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { decode } from "next-auth/jwt";
import { authOptions } from "@/utils/auth/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
