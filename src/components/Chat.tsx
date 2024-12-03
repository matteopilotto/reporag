"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { useNamespace } from "./NamespaceContext";

export function Chat() {
  const { currentNamespace } = useNamespace();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      namespace: currentNamespace,
    },
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 relative">
      <div className="mx-auto max-w-2xl h-screen">
        <div className="h-[calc[100vh-180px] overflow-y-auto space-y-4 p-4 pb-40">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${m.role === "user" ? "bg-green-200" : "bg-gray-200"}`}
              >
                {m.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-[76px] w-[calc(100%-var(--sidebar-width))] h-24 bg-grandient-to-t from-white via-white/100 to-transparent pointer-events-none max-w-2xl mx-auto" />
        <form
          onSubmit={handleSubmit}
          className="fixed bottom-0 w-[calc(100%-var(--sidebar-width))] max-w-2xl bg-white px-4 pb-16 z-10"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            className="w-full rounded-lg border border-gray-300 p-4"
          />
        </form>
      </div>
    </div>
  );
}
