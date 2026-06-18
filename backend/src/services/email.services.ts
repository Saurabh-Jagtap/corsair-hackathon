import { corsair } from "../corsair.js";

type SendEmailParams = {
    tenantId: string;
    to: string;
    subject: string;
    body: string;
};

export const getThreadsService = async (userId: string) => {
  const threads = await corsair
    .withTenant(userId)
    .gmail.api.threads.list();

  const transformedThreads = await Promise.all(
    threads.threads.slice(0, 20).map(async (thread: any) => {
      const details = await corsair
        .withTenant(userId)
        .gmail.api.threads.get({
          id: thread.id,
        });

      const message = details.messages?.[0];

      const headers = message?.payload?.headers ?? [];

      const subject =headers.find((h: any) => h.name === "Subject")?.value ?? "No Subject";

      const from = headers.find((h: any) => h.name === "From")?.value ?? "Unknown Sender";

      const date =headers.find((h: any) => h.name === "Date")?.value ?? "";

      const unread = message?.labelIds?.includes("UNREAD") ?? false;

      return {
        id: thread.id,
        subject,
        from,
        date,
        snippet: thread.snippet,
        unread,
      };
    })
  );

  return transformedThreads;
};

export class EmailService {
    static async sendEmail({
        tenantId,
        to,
        subject,
        body,
    }: SendEmailParams) {

        const tenant =
            corsair.withTenant(tenantId);

        const email = [
            `To: ${to}`,
            `Subject: ${subject}`,
            `Content-Type: text/plain; charset=utf-8`,
            "",
            body,
        ].join("\r\n");

        const raw = Buffer
            .from(email)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        return tenant.gmail.api.messages.send({
            raw,
        });
    }
}