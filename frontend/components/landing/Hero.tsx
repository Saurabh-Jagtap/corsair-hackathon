export function Hero() {
  return (
    <section className="px-6 md:px-10 pt-20 pb-16 max-w-3xl">
      <div className="text-[12px] uppercase tracking-wide text-[#4A7FA0] mb-5">
        Intelligent executive assistant
      </div>
      <h1 className="font-serif text-[36px] md:text-[48px] leading-[1.12] mb-6 max-w-2xl">
        Your inbox and calendar,
        <br />
        organized by intelligence.
      </h1>
      <p className="text-[15px] md:text-[16px] leading-relaxed text-[#4A5568] max-w-md mb-9">
        Triagent connects to Gmail and Google Calendar, reads what matters, and
        gives you a clear daily brief — so you spend less time sorting and
        more time deciding.
      </p>
      <div className="flex flex-wrap items-center gap-3.5">
        <button className="bg-[#2D4A5E] text-[#F4F6F7] text-[14px] font-medium px-7 py-3 rounded-lg">
          Continue with Google
        </button>
        <button className="border border-[#2D4A5E] text-[#2D4A5E] text-[14px] px-7 py-3 rounded-lg">
          See how it works
        </button>
      </div>
      <p className="text-[12px] text-[#7A8B96] mt-5">
        No credit card required · Read-only access by default · Revoke anytime
      </p>
    </section>
  );
}