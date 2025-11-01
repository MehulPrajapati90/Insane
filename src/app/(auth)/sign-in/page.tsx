"use client";

import { Button } from '@/components/ui/button';
import FooterLink from '@/modules/auth/components/footer-link';
import InputField from '@/modules/auth/components/input-field';
import { useForm } from 'react-hook-form';

const SignIn = () => {
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur'
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <h1 className='form-title'>Login In Your Account</h1>

            <form action="" onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

                <InputField
                    name="email"
                    label="Email"
                    placeholder="John@gmail.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email is required', minLength: 2 }}
                    type='email'
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="john@123"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                    type='password'
                />

                <Button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5'>
                    {isSubmitting ? 'Wellcome back Anon!' : 'LogIn'}
                </Button>

                <FooterLink text="Don't have an account" linkText='Create an Account' href='/sign-up' />
            </form>
        </>
    )
}

export default SignIn;