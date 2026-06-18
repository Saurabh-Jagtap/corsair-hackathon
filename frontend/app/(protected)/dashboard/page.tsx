"use client"
import { useSession } from '@/utils/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { StatsGrid } from '@/components/dashboard/StatsGrid'
import { AssistantShortcuts } from '@/components/dashboard/AssistantShortcuts'
import { UpcomingMeetings } from '@/components/dashboard/UpcomingMeetings'
import { RecentEmails } from '@/components/dashboard/RecentEmails'
import { ConnectedAccounts } from '@/components/dashboard/ConnectedAccounts'

const Page = () => {
  const router = useRouter()
  const { data: sessionData, isPending } = useSession()

  useEffect(() => {
    if (!isPending && !sessionData?.session) {
      router.push('/signin')
    }
  }, [sessionData, isPending, router])

  if (isPending) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#F4F6F7]">
        <p className="text-sm text-[#7A8B96]">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-[#F4F6F7]">
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">

        <DashboardHeader/>
        <StatsGrid/>
        <AssistantShortcuts/>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          <UpcomingMeetings/>
          <RecentEmails/>

        </div>

        <ConnectedAccounts/>

      </div>
    </div>
  )
}


export default Page