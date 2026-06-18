"use client"
import { useState } from "react"
import ToggleSwitch from "./ToggleSwitch"

type SegmentedProps = {
  title: string
  description: string
  options: string[]
  defaultValue: string
}

export const SegmentedPreference = ({
  title,
  description,
  options,
  defaultValue,
}: SegmentedProps) => {
  const [selected, setSelected] = useState(defaultValue)

  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-t border-[#E8ECF0] first:border-t-0 first:pt-0">
      <div className="flex-1">
        <div className="text-[13px] text-[#1A2B35] mb-0.5">{title}</div>
        <div className="text-[12px] text-[#9AA8B2] leading-relaxed">{description}</div>
      </div>
      <div className="flex bg-[#F4F6F7] rounded-md p-0.5 shrink-0">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setSelected(opt)}
            className={`text-[11.5px] px-2.5 py-1.5 rounded-[5px] transition-colors ${
              selected === opt
                ? "bg-white text-[#1A2B35] font-medium border border-[#D1D9E0]"
                : "text-[#7A8B96]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

type TogglePrefProps = {
  title: string
  description: string
  defaultOn?: boolean
}

export const TogglePreference = ({ title, description, defaultOn = false }: TogglePrefProps) => {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-t border-[#E8ECF0] first:border-t-0 first:pt-0">
      <div className="flex-1">
        <div className="text-[13px] text-[#1A2B35] mb-0.5">{title}</div>
        <div className="text-[12px] text-[#9AA8B2] leading-relaxed">{description}</div>
      </div>
      <ToggleSwitch defaultOn={defaultOn} />
    </div>
  )
}