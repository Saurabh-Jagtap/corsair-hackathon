import { useQuery } from "@tanstack/react-query";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/calendar/events");

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      return res.json();
    },
  });
};