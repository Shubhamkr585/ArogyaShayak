"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm ArogyaShayak, your personal healthcare assistant. How can I help you today? You can ask me about Ayushman Bharat schemes, finding hospitals, or general health queries.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });
      const botMessage: Message = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting to the server right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col p-4 sm:p-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex-grow flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors">
          {/* Header */}
          <div className="bg-blue-600 p-4 text-white flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">ArogyaShayak AI</h1>
              <p className="text-blue-100 text-xs">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm sm:text-base">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-none shadow-sm px-4 py-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-800 transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
