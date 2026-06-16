type EventCardProps = {
  summary: string;
  start: string;
  end: string;
};

export const EventCard = ({
  summary,
  start,
  end,
}: EventCardProps) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold">
        {summary}
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        {new Date(start).toLocaleString()}
      </p>

      <p className="text-sm text-gray-500">
        {new Date(end).toLocaleString()}
      </p>
    </div>
  );
};