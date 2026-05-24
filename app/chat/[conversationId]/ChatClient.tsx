"use client";

import { useEffect, useState } from "react";
import { socket } from "@/app/lib/socket";

interface Message {
  text: string;
  senderId: string;
}

export default function ChatClient({
  conversationId,
  userId,
  initialMessages,
}: {
  conversationId: string;
  userId: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  // SOCKET SETUP + MARK AS READ ON OPEN
  useEffect(() => {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(
      "khetconnect_read_conversations"
    );

    let readIds: string[] = [];

    if (raw) {
      try {
        const parsed = JSON.parse(raw);

        if (Array.isArray(parsed)) {
          readIds = parsed;
        }
      } catch {
        readIds = [];
      }
    }

    if (!readIds.includes(conversationId)) {
      const updated = [...readIds, conversationId];

      window.localStorage.setItem(
        "khetconnect_read_conversations",
        JSON.stringify(updated)
      );
    }
  }
}, [conversationId]);
  // SEND MESSAGE
  const sendMessage = async () => {
  if (!input.trim()) return;

  const newMessage = {
    conversationId,
    senderId: userId,
    text: input,
  };

  try {
    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });

    const data = await res.json();

    if (data.success) {
      // instantly show message in UI
      setMessages((prev) => [
        ...prev,
        {
          text: input,
          senderId: userId,
        },
      ]);

      setInput("");
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
        <h1 className="font-semibold text-gray-800">Chat</h1>
        <span className="text-sm text-green-600">● Online</span>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => {
          const isMe = msg.senderId === userId;

          return (
            <div
              key={i}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[75%] px-4 py-2 text-sm rounded-2xl shadow-sm
                  ${isMe
                    ? "bg-green-600 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md border"}
                `}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="p-3 bg-white text-black border-t flex items-center gap-2 sticky bottom-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border text-black border-gray-300 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}