import React from 'react'
import { SignInButton,SignedIn,SignedOut } from '@clerk/clerk-react'
const Home = () => {
  return (
    <>
    <SignedOut>
        <SignInButton/>

    </SignedOut>
    <SignedIn>
        <div className='text-lg'>
            bd
        </div>
    </SignedIn>
    </>
  )
}

export default Home
