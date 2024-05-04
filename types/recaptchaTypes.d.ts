interface RecaptchaResponseData {
    success: boolean;
    score: number;
    error?: string;
    challenge_ts: string;
    hostname: string;
    action: string;
}
