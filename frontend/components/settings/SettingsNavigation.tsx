const NAV_ITEMS = [
  { label: "Profile", icon: "👤" },
  { label: "Connections", icon: "🔌" },
  { label: "AI Preferences", icon: "✦", active: true },
  { label: "Notifications", icon: "🔔" },
  { label: "Security", icon: "🛡️" },
  { label: "Data & Permissions", icon: "🗄️" },
]

const SettingsNavigation = () => {
  return (
    <nav className="bg-[#F4F6F7] md:border-r border-[#D1D9E0] p-5 md:w-[180px] shrink-0">
      <div className="text-[11px] uppercase tracking-wide text-[#9AA8B2] px-2 mb-3">
        Settings
      </div>
      <div className="flex md:flex-col gap-0.5 overflow-x-auto md:overflow-visible">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-[12.5px] whitespace-nowrap relative cursor-default ${
              item.active
                ? "bg-[#E8ECF0] text-[#1A2B35] font-medium md:border-l-[2.5px] md:border-[#2D4A5E] md:-ml-[2.5px] md:pl-[calc(0.625rem+2.5px)]"
                : "text-[#4A5568]"
            }`}
          >
            <span className="text-[14px]">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default SettingsNavigation