"use server";

import { prisma } from "../lib/prisma";

export async function getBuyerConversations(buyerId: string) {
  const conversations = await prisma.conversation.findMany({
    where: {
      buyerId,
    },
    orderBy: {
      createdAt: "desc", // ✅ correct for your schema
    },
    include: {
      seller: true, // ✅ valid relation in your schema
      messages: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return conversations;
}