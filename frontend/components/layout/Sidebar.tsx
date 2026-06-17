"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/utils/auth-client";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "☀️",
  },
  {
    name: "Inbox",
    href: "/inbox",
    icon: "📥",
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: "📅",
  },
  {
    name: "Assistant",
    href: "/assistant",
    icon: "🤖",
  },
  {
    name: "Connect",
    href: "/connect",
    icon: "🔌",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-[196px] flex flex-col bg-[#1A2B35] shrink-0 min-h-screen">
      {/* Logo */}
      <div className="px-[18px] py-5 border-b border-[#243A47]">
        <span className="font-serif text-[16px] text-[#E8ECF0]">
          Triagent
        </span>
      </div>

      {/* Navigation */}
      <nav className="p-3 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#243A47]"
                  : "hover:bg-[#1F3140]"
                }`}
            >
              <span className="text-[15px] opacity-80">
                {item.icon}
              </span>

              <span
                className={`text-[13px] ${isActive
                    ? "text-[#E8ECF0]"
                    : "text-[#8EABB8]"
                  }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="mt-auto p-3 border-t border-[#243A47]">
        <div className="flex items-center gap-2.5 px-1.5 py-2">
          <div className="w-7 h-7 rounded-full bg-[#2D4A5E] flex items-center justify-center text-[11px] font-medium text-[#BDD0DA]">
            {session?.user?.name
              ?.slice(0, 2)
              ?.toUpperCase() ?? "SA"}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-[#C8D8E5] truncate">
              {session?.user?.name ??
                "User"}
            </div>

            <div className="text-[11px] text-[#8EABB8] truncate">
              {session?.user?.email}
            </div>
          </div>
        </div>
      </div>
    </aside>

  );
};
