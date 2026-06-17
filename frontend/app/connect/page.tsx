"use client";

const ConnectPage = () => {
  const connectGmail = () => {
    window.location.href = "/api/connect/gmail";
  };

  const connectCalendar = () => {
    window.location.href = "/api/connect/calendar";
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Connect Accounts
      </h1>

      <div className="space-y-4">
        <button
          onClick={connectGmail}
          className="border rounded-lg px-4 py-2"
        >
          Connect Gmail
        </button>

        <button
          onClick={connectCalendar}
          className="border rounded-lg px-4 py-2"
        >
          Connect Calendar
        </button>
      </div>
    </div>
  );
};

export default ConnectPage;