import { emailLayout } from "./email-layout";

export function verificationEmailTemplate(
  verificationUrl: string
) {
  return {
    subject: "Verify your Triagent account",

    html: emailLayout({
      title: "Verify your email",
      description:
        "Thanks for signing up for Triagent. Verify your email address to activate your account and start using your AI workspace.",

      buttonText: "Verify Email",

      buttonUrl: verificationUrl,

      footer:
        "If you didn't create a Triagent account, you can safely ignore this email.",
    }),
  };
}

export function resetPasswordTemplate(
  resetUrl: string
) {
  return {
    subject: "Reset your Triagent password",

    html: emailLayout({
      title: "Reset your password",

      description:
        "We received a request to reset your Triagent password. Click the button below to choose a new one.",

      buttonText: "Reset Password",

      buttonUrl: resetUrl,

      footer:
        "If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.",
    }),
  };
}