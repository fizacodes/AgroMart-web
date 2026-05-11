import ChatClient from "./ChatClient";
import { cookies } from "next/headers";
import { getMessages } from "@/app/actions/message";

export default async function Page({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;

  const cookieStore =await cookies();
  const userId = cookieStore.get("userId")?.value;

  const messages = await getMessages(conversationId);

  return (
    <ChatClient
      conversationId={conversationId}
      userId={userId as string}
      initialMessages={messages}
    />
  );
}