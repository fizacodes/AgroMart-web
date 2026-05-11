// app/dashboard/seller/inbox/page.tsx
import { cookies } from "next/headers";
import { getSellerConversations } from "@/app/actions/getSellerConversations";
import InboxList from "@/app/components/InboxList";

export default async function SellerInbox() {
  const cookieStore = await cookies();

  const sellerId = cookieStore.get("userId")?.value;

  // 🚨 Protect route
  if (!sellerId) {
    return <div className="p-6">Not logged in</div>;
  }

  const conversations = await getSellerConversations(sellerId);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <InboxList
        conversations={conversations}
        currentUserId={sellerId}
        role="seller"
        dashboardPath="/dashboard/seller"
      />

      {/* RIGHT SIDE (EMPTY STATE / CHAT AREA) */}
      <div className="hidden md:flex flex-1 items-center justify-center text-gray-500 text-lg">
        Select a conversation to start chatting
      </div>
    </div>
  );
}