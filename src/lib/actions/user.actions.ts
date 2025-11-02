"use server";

import { client } from "../db";

export const getAllUsersForNewsEmail = async () => {
    try {
        const users = await client.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return users;
    } catch (e) {
        console.log(e);
        return [];
    }
}