"use client";
import { ChatMessage } from "@/app/chat/types";
import { UUID } from "crypto";
import { Dispatch, SetStateAction } from "react";
import Button from "../../../../components/ui/Button";
import { ConfigButton } from "./ConfigButton";
import { MicButton } from "./MicButton";

interface ChatInputProps {
  isSendingMessage: boolean;
  sendMessage: (chatId?: UUID, msg?: ChatMessage) => Promise<void>;
  setMessage: Dispatch<SetStateAction<ChatMessage>>;
  message: ChatMessage;
  chatId?: UUID;
}

export function ChatInput({
  chatId,
  isSendingMessage,
  message,
  sendMessage,
  setMessage,
}: ChatInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isSendingMessage) sendMessage(chatId);
      }}
      className="sticky bottom-0 p-5 bg-white dark:bg-black rounded-t-md border border-black/10 dark:border-white/25 border-b-0 w-full max-w-3xl flex items-center justify-center gap-2 z-20"
    >
      <textarea
        autoFocus
        value={message[1]}
        onChange={(e) => setMessage((msg) => [msg[0], e.target.value])}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents the newline from being entered in the textarea
            if (!isSendingMessage) sendMessage(chatId); // Call the submit function here
          }
        }}
        className="w-full p-2 border border-gray-300 dark:border-gray-500 outline-none rounded dark:bg-gray-800"
        placeholder="Begin conversation here..."
      />
      <Button type="submit" isLoading={isSendingMessage}>
        {isSendingMessage ? "Thinking..." : "Chat"}
      </Button>
      <MicButton />
      <ConfigButton />
    </form>
  );
}
