import Link from "next/link";

export function Nav() {
    
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-[#D1D9E0]">
      <span className="font-serif text-[17px]">Triagent</span>
      <div className="hidden md:flex items-center gap-7">
        <a href="#how-it-works" className="text-[13px] text-[#4A5568]">How it works</a>
        <a href="#features" className="text-[13px] text-[#4A5568]">Features</a>
        <Link href="/signin" className="text-[13px] text-[#4A5568]">Sign in</Link>
        <Link href={"/signup"} className="bg-[#2D4A5E] text-[#F4F6F7] text-[13px] font-medium px-4 py-1.5 rounded-md">
          Get started
        </Link>
      </div>
    </nav>
  );
}