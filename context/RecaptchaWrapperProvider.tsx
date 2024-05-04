"use client";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const RecaptchaWrapperProvider: React.FC<{
    children: React.ReactNode;
    siteKey: string;
}> = ({ siteKey, children }) => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={`${siteKey}`}
            language="es-AR"
            scriptProps={{
                async: false, // optional, default to false,
                defer: false, // optional, default to false
                appendTo: "head", // optional, default to "head", can be "head" or "body",
                nonce: undefined, // optional, default undefined
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
};
