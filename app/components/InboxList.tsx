"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ConversationItem {
  id: string;
  buyerId?: string;
  sellerId?: string;
  buyer?: { name: string };
  seller?: { name: string };
  messages: Array<{ text: string; senderId: string }>;
}

type InboxListProps = {
  conversations: ConversationItem[];
  currentUserId: string;
  role: "buyer" | "seller";
  dashboardPath: string;
};

const STORAGE_KEY = "khetconnect_read_conversations";

export default function InboxList({
  conversations,
  currentUserId,
  role,
  dashboardPath,
}: InboxListProps) {
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setReadIds(parsed as string[]);
      }
    } catch {
      setReadIds([]);
    }
  }, []);

  const markRead = (conversationId: string) => {
    if (readIds.includes(conversationId)) return;

    const updated = [...readIds, conversationId];
    setReadIds(updated);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="w-full md:w-80 bg-white border-r flex flex-col">
      <div className="p-4 text-black border-b font-semibold text-lg flex items-center justify-between">
        <span>Inbox</span>
        <Link href={dashboardPath} className="md:hidden text-sm text-[#1F7A3F] hover:text-[#186a35]">
          ← Back
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const otherName = role === "seller" ? conv.buyer?.name || conv.buyerId : conv.seller?.name || conv.sellerId;
          const lastMessage = conv.messages[0];
          const hasNewMessage = Boolean(lastMessage && lastMessage.senderId !== currentUserId && !readIds.includes(conv.id));

          return (
            <Link
              key={conv.id}
              href={`/chat/${conv.id}`}
              onClick={() => markRead(conv.id)}
              className="block px-4 py-3 border-b hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  👤
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800 truncate">{otherName}</p>
                    {hasNewMessage && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-green-100 text-green-800">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{lastMessage?.text || "No messages yet"}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
