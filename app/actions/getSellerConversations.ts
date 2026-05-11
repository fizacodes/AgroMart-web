"use server";

import { prisma } from "../lib/prisma";


export async function getSellerConversations(sellerId: string) {
  const conversations = await prisma.conversation.findMany({
    where: {
      sellerId,
    },
    include: {
      buyer: true, // optional (to show buyer name)
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" }, // last message
      },
    },
  });

  return conversations;
}