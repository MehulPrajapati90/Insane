"use client";

import { SignUp } from '@clerk/nextjs';

const page = () => {
    return (
        <>
            <h1 className='form-title'>Sign Up & Personalize</h1>
            <SignUp />
        </>
    )
}

export default page;