"use client"
import { useState } from "react"

const ToggleSwitch = ({ defaultOn = false }: { defaultOn?: boolean }) => {
  const [on, setOn] = useState(defaultOn)

  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      aria-pressed={on}
      className={`w-[34px] h-[19px] rounded-full relative shrink-0 mt-0.5 transition-colors duration-200 ${
        on ? "bg-[#2D4A5E]" : "bg-[#D1D9E0]"
      }`}
    >
      <span
        className={`absolute top-[2px] w-[15px] h-[15px] rounded-full bg-white transition-all duration-200 ${
          on ? "right-[2px]" : "left-[2px]"
        }`}
      />
    </button>
  )
}

export default ToggleSwitch