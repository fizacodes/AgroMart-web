"use client";

import { useRouter } from "next/navigation";
import { getOrCreateConversation } from "@/app/actions/getConveration";

export default function ChatButton({ listingId }: { listingId: string }) {
  const router = useRouter();

  const handleChat = async () => {
    const res = await getOrCreateConversation(listingId);

    if (res.success) {
      router.push(`/chat/${res.conversationId}`);
    } else {
      alert(res.error);
    }
  };

  return (
    <button
      onClick={handleChat}
      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
    >
      Chat with Seller
    </button>
  );
}