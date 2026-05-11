import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("API BODY:", body);

    const { conversationId, senderId, text } = body;

    if (!conversationId || !senderId || !text) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        text,
      },
    });

    return Response.json({ success: true, message });
  } catch (err) {
    console.log(err);
    return Response.json({ success: false }, { status: 500 });
  }
}