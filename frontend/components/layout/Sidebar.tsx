"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Inbox",
    href: "/inbox",
  },
  {
    name: "Calendar",
    href: "/calendar",
  },
  {
    name: "Assistant",
    href: "/assistant",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-8">
        Corsair AI
      </h1>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-4 py-2 transition ${
              pathname === item.href
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};