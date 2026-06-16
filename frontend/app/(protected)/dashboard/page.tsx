"use client"
import { signOut, useSession } from '@/utils/auth-client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Page = () => {
  const router = useRouter()
  const { data: sessionData, isPending } = useSession()

  const { data: threadsData, isLoading: threadsLoading } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const res = await fetch("/api/gmail/threads");
      return res.json();
    },
  });

  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("api/calendar/events");
      return res.json();
    }
  })

  const handleSignOut = async (e: any) => {
    e.preventDefault()

    const res = await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin"); // redirect to login page
        },
      },
    })
  }

  useEffect(() => {
    if (!isPending && !sessionData?.session) {
      router.push('/signin')
    }
  }, [sessionData, isPending, router])

  if (isPending) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Welcome</h3>
      <p>{sessionData?.user.name}</p>
      <p>{sessionData?.user.email}</p>
      <button className='mx-4' onClick={(e) => handleSignOut(e)} >signout</button>

      <hr />

      <h2>Threads</h2>

      <div>
        <b>Emails: </b>
        {/* <span> {threadsData.data.threads.length} </span> */}
        <b>Upcoming Events: </b>
      </div>

      {threadsLoading ? (
        <p>Loading threads...</p>
      ) : (
        <pre>
          {JSON.stringify(threadsData, null, 2)}
        </pre>
      )}
      {eventsLoading ? (
        <p>Loading events...</p>
      ): (
        <pre>
          {JSON.stringify(eventsData, null, 2)}
        </pre>
      )
    }

    </div>
  )
}

export default Page
