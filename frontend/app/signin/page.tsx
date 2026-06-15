"use client"
import { signIn } from '@/utils/auth-client'
import { useState } from 'react'

const Page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async (e: any) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            alert("All fields are required!")
            return
        }

        console.log({
            email,
            password
        });

        const res = await signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
        })

        if (res.error) {
            console.error(res.error)
            alert(res.error.message)
            return
        }

        setEmail('')
        setPassword('')

        console.log(res)
    }

    const handleGoogleSignin = async (e: any) => {
        e.preventDefault()

        const res = await signIn.social({
            provider: "google",
            callbackURL: "/dashboard"
        });

        if (res.error) {
            alert(res.error.message)
        }
    }
    return (
        <div>
            <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='mx-4' onClick={(e) => handleSignIn(e)} >signin</button>

            <br></br>
            <br></br>

            <button onClick={(e) => handleGoogleSignin(e)} >Continue with google</button>
        </div>
    )
}

export default Page
