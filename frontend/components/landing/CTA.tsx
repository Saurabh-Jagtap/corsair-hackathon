
export function CTA() {
  return (
    <section className="bg-[#E8ECF0] px-6 md:px-10 py-20 text-center">
      <h2 className="font-serif text-[30px] md:text-[36px] leading-tight mb-4">
        Stop managing your inbox.
        <br />
        Let Triagent handle it.
      </h2>
      <p className="text-[15px] text-[#4A5568] mb-9">
        Free to start. No credit card. Works with your existing Gmail and
        Google Calendar.
      </p>
      <div className="flex flex-wrap justify-center gap-3.5">
        <button className="bg-[#2D4A5E] text-[#F4F6F7] text-[14px] font-medium px-7 py-3 rounded-lg shadow-[0_0_0_0_rgba(45,74,94,0.4)] animate-[pulse-shadow_3.5s_ease-in-out_infinite]">
          Continue with Google
        </button>
        <button className="border border-[#2D4A5E] text-[#2D4A5E] text-[14px] px-7 py-3 rounded-lg">
          Sign up with email
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse-shadow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(45, 74, 94, 0.25); }
          50% { box-shadow: 0 0 0 8px rgba(45, 74, 94, 0); }
        }
      `}</style>
    </section>
  );
}