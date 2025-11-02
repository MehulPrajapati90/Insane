"use server";

import { client } from "@/lib/db";
import { inngest } from "@/lib/ingest/client";
import { currentUser } from "@clerk/nextjs/server";

interface GettingStartedProps {
    country: string,
    investmentGoals: string,
    riskTolerance: string,
    preferredIndustry: string,
}

export const gettingStarted = async ({ country, investmentGoals, preferredIndustry, riskTolerance }: GettingStartedProps) => {
    const user = await currentUser();
    try {
        const response = await client.user.update({
            where: {
                clerkId: user?.id
            },
            data: {
                country: country,
                investmentGoals: investmentGoals,
                riskTolerance: riskTolerance,
                preferredIndustry: preferredIndustry
            }
        })

        if (response) {
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email: response?.email,
                    name: response.name,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry
                }
            })
        }

        return {
            success: true,
            data: response,
            message: "Updated successfully"
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            error: "failed to updated"
        }
    }
}