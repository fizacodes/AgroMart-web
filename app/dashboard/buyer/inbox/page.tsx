// app/dashboard/buyer/inbox/page.tsx

import { cookies } from "next/headers";
import { getBuyerConversations } from "@/app/actions/getBuyerConversations";
import InboxList from "@/app/components/InboxList";

export default async function BuyerInbox() {
  const cookieStore = await cookies();

  const buyerId = cookieStore.get("userId")?.value;

  // 🚨 Protect route
  if (!buyerId) {
    return <div className="p-6">Not logged in</div>;
  }

  const conversations = await getBuyerConversations(buyerId);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <InboxList
        conversations={conversations}
        currentUserId={buyerId}
        role="buyer"
        dashboardPath="/dashboard/buyer"
      />

      {/* RIGHT SIDE (EMPTY STATE) */}
      <div className="hidden md:flex flex-1 items-center justify-center text-gray-500 text-lg">
        Select a conversation to start chatting
      </div>
    </div>
  );
}