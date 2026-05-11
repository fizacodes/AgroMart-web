import { prisma } from "../lib/prisma";

export async function saveMessage({conversationId,senderId,text}:{conversationId:string;
    senderId:string; text:string;
}){
    return prisma.message.create({
        data:{
            conversationId,
            senderId,
            text
        }
    })
}

export async function getMessages(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
}