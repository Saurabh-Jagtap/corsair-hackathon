
export function Footer() {
  return (
    <footer className="px-6 md:px-10 py-6 border-t border-[#D1D9E0] flex flex-wrap items-center justify-between gap-3">
      <span className="font-serif text-[15px] text-[#4A5568]">Triagent</span>
      <div className="flex gap-6">
        <a href="#" className="text-[12px] text-[#7A8B96]">Privacy</a>
        <a href="#" className="text-[12px] text-[#7A8B96]">Terms</a>
        <a href="#" className="text-[12px] text-[#7A8B96]">Contact</a>
      </div>
      <span className="text-[12px] text-[#7A8B96]">© 2026 Triagent</span>
    </footer>
  );
}