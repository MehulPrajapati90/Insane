"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSetModel } from '../store';
import { useEffect } from 'react';
import SetUpForm from './setup-form';

interface SetUpProps {
    user: {
        name: string;
        id: string;
        email: string;
        clerkId: string;
        emailVerified: boolean;
        image: string | null;
        country: string | null;
        investmentGoals: string | null;
        riskTolerance: string | null;
        preferredIndustry: string | null;
        createdAt: Date;
        updatedAt: Date;
    }
}

const SetUpModel = ({ user }: SetUpProps) => {
    const { isSetup, setIsSetup } = useSetModel();

    const handleCloseForm = () => {
        setIsSetup();
    }

    useEffect(() => {
        if (!user.country || !user.investmentGoals || !user.preferredIndustry || !user.riskTolerance) {
            setIsSetup()
        }
    }, [user])
    return (
        <Dialog open={isSetup} onOpenChange={handleCloseForm}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Get's Started</DialogTitle>

                    <DialogDescription className='text-[12.5px] leading-3'>
                        Start your trading journey seamlessly !
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col justify-center items-center w-full min-h-auto'>
                    <SetUpForm />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SetUpModel;