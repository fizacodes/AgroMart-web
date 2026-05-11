"use server"
import { prisma } from "../lib/prisma";

export async function getListingUserPage(filters: any) {
  return await prisma.listing.findMany({
    where: {
      category: filters?.category || undefined,
      city: filters?.city || undefined,
      province: filters?.province || undefined,

      price: {
        gte: filters?.minPrice || undefined,
        lte: filters?.maxPrice || undefined,
      },

      title: filters?.search
        ? {
            contains: filters.search,
            mode: "insensitive",
          }
        : undefined,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}