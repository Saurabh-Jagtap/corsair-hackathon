"use client"
import { signUp } from '@/utils/auth-client'
import { useState } from 'react'

const Page = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async (e: any) => {
        e.preventDefault()

        if (!name.trim() || !email.trim() || !password.trim()) {
            alert("All fields are required!")
            return
        }

        console.log({
            name,
            email,
            password
        });

        const res = await signUp.email({
            name,
            email,
            password,
            callbackURL: "/signin",
        })

        setName('')
        setEmail('')
        setPassword('')

        console.log(res)
    }

    

    return (
        <div>
            <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={(e) => handleSignup(e)} >signup</button>
        </div>
    )
}

export default Page
