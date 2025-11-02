"use client";

import { Button } from "@/components/ui/button";
import { CountrySelectField } from "@/modules/auth/components/country-select-list";
import SelectField from "@/modules/auth/components/select-field";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/modules/utils";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { gettingStarted } from "../actions";
import { useSetModel } from "../store";


const SetUpForm = () => {
    const { setIsSetup } = useSetModel();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        },
        mode: 'onBlur'
    },);

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await gettingStarted(data);

            if(result?.success) {
                toast.success(`${"Let's get started!"}`)
            }

            setIsSetup();
        } catch (e) {
            console.error(e);
            toast.error('Sign up failed', {
                description: e instanceof Error ? e.message : 'Failed to create an account.'
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex py-3 flex-col justify-center gap-3">

                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />

                <SelectField
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                <SelectField
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk level"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <Button type="submit" disabled={isSubmitting} className="w-full mt-3 py-5 text-sans text-zinc-800 font-semibold bg-yellow-400 hover:bg-white transition-all ease-in-out duration-200 tracking-[-0.3px]">
                    {isSubmitting ? <LoaderCircle size={25} className="animate-spin text-zinc-900" /> : 'Start Your Investing Journey'}
                </Button>
            </form>
        </>
    )
}

export default SetUpForm