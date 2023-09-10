import GoogleProvider from "next-auth/providers/google";
import { Account, AuthOptions, Profile } from "next-auth";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        // ...add more providers here
    ],
    jwt: {
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60,
    },
    pages: {
        signIn: "/admin/auth/signin",
        // signOut: "/auth/signout",
        // error: "/auth/error", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
    },

    callbacks: {
        async signIn({
            account,
            profile,
        }: {
            account: Account | null;
            profile?: (Profile & any) | undefined;
        }) {
            if (account?.provider === "google") {
                console.log(process.env);
                console.log("[CALLBACK] => ");
                console.log(profile);
                console.log(account);

                const checker = (Object.keys(process.env) as string[]).some(
                    (env: any) => {
                        console.log(
                            env
                                .toLowerCase()
                                .includes("google_authorized_account")
                        );

                        console.log(profile?.email, process.env[env]);

                        if (
                            env
                                .toLowerCase()
                                .includes("google_authorized_account")
                        ) {
                            return profile?.email === process.env[env];
                        } else {
                            return false;
                        }
                    }
                );

                console.log("[CHECKER] => ", checker);

                return checker;
            }

            return true; // Do different verification for other providers that don't have `email_verified`
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            return baseUrl;
        },
        async session({
            session,
            token,
            user,
        }: {
            session: any;
            token: any;
            user: any;
        }) {
            // Send properties to the client, like an access_token and user id from a provider.
            console.log("[SESSION]", session);
            console.log("[SESSION]", user);

            return session;
        },
    },
};
