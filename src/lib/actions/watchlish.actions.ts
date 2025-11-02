"use server";

import { client } from "../db";

export const getWatchlistSymbolsByEmail = async (email: string) => {
    try {
        const user = await client.user.findUnique({
            where: { email },
            select: { id: true },
        });

        if (!user) return [];

        const items = await client.watchlist.findMany({
            where: { userId: user.id },
            select: { symbol: true },
        });

        return items.map((i) => i.symbol);
    } catch (err) {
        console.error("Error fetching watchlist:", err);
        return [];
    }
}