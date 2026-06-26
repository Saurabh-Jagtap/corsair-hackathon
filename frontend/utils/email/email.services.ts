import { resend } from "./resend";
import { resetPasswordTemplate, verificationEmailTemplate } from "./template";

class EmailService {
    async sendVerificationEmail(
        email: string,
        verificationUrl: string
    ) {
        const template = verificationEmailTemplate(verificationUrl);

        return await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: email,
            subject: template.subject,
            html: template.html,
        });
    }

    async sendResetPasswordEmail(email: string, resetUrl: string) {
        const template = resetPasswordTemplate(resetUrl);

        return await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: email,
            subject: template.subject,
            html: template.html,
        });
    }
}

export const emailService = new EmailService();