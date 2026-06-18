"use client"
import { SegmentedPreference, TogglePreference } from "@/components/settings/PreferenceCard"
import SettingsNavigation from "@/components/settings/SettingsNavigation"

const SettingsPage = () => {
  // Placeholder values — no session wiring per instructions
  const user = {
    name: "Alex Morgan",
    email: "alex@company.com",
    initials: "AM",
  }

  return (
    <div className="flex flex-col md:flex-row bg-white min-h-full">
      <SettingsNavigation />

      <div className="flex-1 p-6 md:p-10 max-w-2xl">
        <h1 className="font-serif text-[21px] text-[#1A2B35] mb-6">AI Preferences</h1>

        {/* Profile preview */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#E8ECF0]">
          <div className="w-14 h-14 rounded-full bg-[#2D4A5E] flex items-center justify-center text-[18px] font-medium text-[#BDD0DA] shrink-0">
            {user.initials}
          </div>
          <div>
            <div className="text-[15px] font-medium text-[#1A2B35]">{user.name}</div>
            <div className="text-[12.5px] text-[#9AA8B2] mt-0.5">{user.email}</div>
          </div>
        </div>

        {/* Connections summary */}
        <div className="mb-8">
          <div className="text-[12px] font-medium text-[#1A2B35] mb-3">Connected accounts</div>
          <div className="bg-[#F4F6F7] border border-[#D1D9E0] rounded-lg p-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-[13px] text-[#1A2B35]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2A7A4B] shrink-0" />
              Gmail
              <span className="text-[11px] text-[#2A7A4B] bg-[#EAF5EF] px-2 py-0.5 rounded-full ml-auto">
                Connected
              </span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[#1A2B35]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2A7A4B] shrink-0" />
              Google Calendar
              <span className="text-[11px] text-[#2A7A4B] bg-[#EAF5EF] px-2 py-0.5 rounded-full ml-auto">
                Connected
              </span>
            </div>
          </div>
        </div>

        {/* AI Preferences */}
        <div className="mb-8">
          <div className="text-[12px] font-medium text-[#1A2B35] mb-3">How Triagent works for you</div>

          <SegmentedPreference
            title="Summary length"
            description="How much detail Triagent includes in email and meeting summaries"
            options={["Brief", "Standard", "Detailed"]}
            defaultValue="Standard"
          />
          <SegmentedPreference
            title="Draft tone"
            description="The tone Triagent uses when drafting replies on your behalf"
            options={["Formal", "Neutral", "Casual"]}
            defaultValue="Neutral"
          />
          <TogglePreference
            title="Auto-flag priority emails"
            description="Let Triagent mark urgent emails automatically, rather than only on request"
          />
          <TogglePreference
            title="Suggest meeting prep automatically"
            description="Generate prep notes for meetings without being asked"
          />
          <TogglePreference
            title="Daily briefing"
            description="Generate a morning summary on the Today page"
          />
        </div>

        {/* Other sections — informational only */}
        <div>
          <div className="text-[12px] font-medium text-[#1A2B35] mb-3">Other sections in Settings</div>
          <div className="flex flex-col gap-2 text-[12.5px] text-[#4A5568] leading-relaxed">
            <div>🛡️ Security — sessions, sign-out, two-factor status</div>
            <div>🗄️ Data & Permissions — what's stored, delete your data</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage