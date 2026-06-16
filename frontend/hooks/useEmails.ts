import { useQuery } from "@tanstack/react-query";

export const useEmails = () => {
  return useQuery({
    queryKey: ["emails"],
    queryFn: async () => {
      const res = await fetch("/api/gmail/threads");

      if (!res.ok) {
        throw new Error("Failed to fetch emails");
      }

      return res.json();
    },
  });
};