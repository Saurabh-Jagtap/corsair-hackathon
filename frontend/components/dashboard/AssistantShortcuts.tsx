import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

function ShortcutButton({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="rounded-lg border border-[#D1D9E0] bg-[#F4F6F7] p-3 text-sm font-medium text-[#2D4A5E] transition-colors hover:border-[#BDD0DA] hover:bg-[#EAF2F8]"
        >
            {label}
        </button>
    );
}

export const AssistantShortcuts = () => {
    const router = useRouter()
    return (
        <div>
            {/* AI Assistant shortcuts */}
            <div className="rounded-xl border border-[#D1D9E0] bg-white p-6">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-[#1A2B35]">
                    <Sparkles className="h-4 w-4 text-[#4A7FA0]" />
                    AI Assistant
                </h2>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <ShortcutButton
                        label="Daily Brief"
                        onClick={() =>
                            router.push(
                                "/assistant?prompt=Generate%20my%20daily%20brief"
                            )
                        }
                    />
                    <ShortcutButton
                        label="Priority Emails"
                        onClick={() =>
                            router.push(
                                "/assistant?prompt=Review%20my%20inbox%20and%20identify%20priority%20emails"
                            )
                        }
                    />
                    <ShortcutButton
                        label="Meetings"
                        onClick={() =>
                            router.push(
                                "/assistant?prompt=Summarize%20upcoming%20meetings"
                            )
                        }
                    />
                    <ShortcutButton
                        label="Focus Today"
                        onClick={() =>
                            router.push(
                                "/assistant?prompt=What%20should%20I%20focus%20on%20today"
                            )
                        }
                    />
                </div>
            </div>
        </div>
    )
}

