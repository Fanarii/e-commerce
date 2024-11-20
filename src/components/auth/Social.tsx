import React from 'react'
import { Button } from '../ui/button'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { signIn } from 'next-auth/react' 
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

const Social = () => {
    const onClick = (provider: "google" | "facebook") => {
        signIn(provider, {
            callbakUrl: DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <div className='flex w-full gap-x-2 mt-3'>
            <Button onClick={() => onClick("google")} size={'lg'} variant='outline' className='w-full'><FaGoogle className='h-5 w-5' /></Button>
            <Button size={'lg'} variant='outline' className='w-full'><FaFacebook className='h-5 w-5' /></Button>
        </div>
    )
}

export default Social