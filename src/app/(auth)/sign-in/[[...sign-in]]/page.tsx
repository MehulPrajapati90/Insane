import { SignIn } from '@clerk/nextjs'

const page = () => {
    return (
        <>
            <h1 className='form-title'>Login In Your Account</h1>
            <SignIn />
        </>
    )
}

export default page;