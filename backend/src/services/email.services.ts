import { corsair } from "../corsair.js";

export const getThreads = async (userId: string) => {
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

      const subject =
        headers.find((h: any) => h.name === "Subject")
          ?.value ?? "No Subject";

      const from =
        headers.find((h: any) => h.name === "From")
          ?.value ?? "Unknown Sender";

      const date =
        headers.find((h: any) => h.name === "Date")
          ?.value ?? "";

      const unread =
        message?.labelIds?.includes("UNREAD") ?? false;

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

  console.log(transformedThreads[0]);

  return transformedThreads;
};