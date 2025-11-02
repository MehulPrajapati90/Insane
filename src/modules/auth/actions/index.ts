"use server";

// import { inngest } from "@/lib/ingest/client";

// export const signUpWithEmail = async ({ email, password, country, fullName, investmentGoals, preferredIndustry, riskTolerance }: SignUpFormData) => {
//     try {


//         // if (user) {
//         //     await inngest.send({
//         //         name: "app/user.created",
//         //         data: {
//         //             email: email,
//         //             name: fullName,
//         //             country: country,
//         //             investmentGoals: investmentGoals,
//         //             riskTolerance: riskTolerance,
//         //             preferredIndustry: preferredIndustry
//         //         }
//         //     })
//         // }



//         return {
//             success: true, message: "Sign up successfull",
//         }
//     } catch (e) {
//         console.log('Sign up failed', e);
//         return { success: false, error: "Sign up failed" }
//     }
// }


import { client } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return {
                succes: false,
                error: "No Authenticated user found"
            }
        }

        const { id, firstName, lastName, imageUrl, emailAddresses } = user;

        const Currentuser = await client.user.upsert({
            where: {
                clerkId: id
            },
            update: {
                name: `${firstName} ${lastName}`,
                image: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || "",
            },
            create: {
                clerkId: id,
                name: `${firstName} ${lastName}`,
                image: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || "",
            }
        })

        return {
            success: true,
            user: Currentuser,
            message: "User onBoarded successfully"
        }
    } catch (e) {
        console.error("Error Onboarding User!", e);
        return {
            success: false,
            error: "Failed to onboard user!"
        }
    }
}

export const currentDbUser = async () => {
    const user = await currentUser();

    if (!user) {
        return {
            success: false,
            error: "Unauthorized!"
        }
    }

    try {
        const dbUser = await client.user.findUnique({
            where: {
                clerkId: user.id
            }
        })

        if (!dbUser) {
            return {
                success: false,
                error: "User Not-found"
            }
        }

        return {
            success: true,
            user: dbUser,
            error: "fetched Successfully!"
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            error: "Fetch Error!"
        }
    }
}