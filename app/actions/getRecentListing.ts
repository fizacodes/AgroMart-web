'use server';

import { prisma } from "../lib/prisma";

export async function getSellerListings(sellerId: string) {
  const listings = await prisma.listing.findMany({
    where: { sellerId },
    orderBy: { createdAt: "desc" },
    take: 5, // 🔥 only latest 5 listings
  });

  return listings;
}