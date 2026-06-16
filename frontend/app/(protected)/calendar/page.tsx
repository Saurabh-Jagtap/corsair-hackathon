"use client";

import { EventCard } from "@/components/calendar/EventCard";
import { useEvents } from "@/hooks/useEvents";

const CalendarPage = () => {
  const { data, isLoading, error } = useEvents();

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Failed to load events.</div>;
  }

  const events = data?.data?.items ?? [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Calendar
      </h1>

      <button className="mb-6 border px-4 py-2 rounded-lg">
        + Create Meeting
      </button>

      <div className="space-y-4">
        {events.map((event: any) => (
          <EventCard
            key={event.id}
            summary={event.summary}
            start={event.start?.dateTime}
            end={event.end?.dateTime}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;