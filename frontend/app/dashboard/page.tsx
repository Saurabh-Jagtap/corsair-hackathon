"use client"
import { signOut, useSession } from '@/utils/auth-client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
  const router = useRouter()
  const { data, isPending } = useSession()

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
    if (!isPending && !data?.session) {
      router.push('/signin')
    }
  }, [data, isPending, router])

  if (isPending) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Welcome</h3>
      <p>{data?.user.name}</p>
      <p>{data?.user.email}</p>
      <button className='mx-4' onClick={(e) => handleSignOut(e)} >signout</button>
    </div>
  )
}

export default Page
