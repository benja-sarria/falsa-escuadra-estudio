/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    experimental: {
        serverActions: {
            allowedOrigins: [
                "falsaescuadraestudio.com",
                "localhost:4000",
                "193.203.174.192",
                "test.falsaescuadraestudio.com",
            ],
            allowedForwardedHosts: [
                "localhost:4000",
                "falsaescuadraestudio.com",
                "test.falsaescuadraestudio.com",
                "192.203.174.192",
            ],
        },
    },
};
