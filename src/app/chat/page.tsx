"use client";
import { useState, useEffect } from "react";

interface Message {
  sender: "user" | "milo" | "system";
  text: string;
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input.trim(),
      timestamp: getTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();

      const botMessage: Message = {
        sender: "milo",
        text: data.reply,
        timestamp: getTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: "⚠️ Milo had trouble responding.", timestamp: getTime() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript);
    };

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 flex flex-col p-4 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-center">Chat with Milo</h2>

      <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-[#1e1e1e] shadow-inner">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[80%] text-sm ${
              msg.sender === "user"
                ? "ml-auto bg-green-100 dark:bg-green-700 text-green-900 dark:text-white"
                : msg.sender === "milo"
                ? "mr-auto bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                : "mx-auto text-gray-500 text-center"
            }`}
          >
            <p className="mb-1">{msg.text}</p>
            <p className="text-[10px] text-right opacity-60">{msg.timestamp}</p>
          </div>
        ))}
        {isTyping && (
          <div className="text-sm text-gray-500 dark:text-gray-400 italic animate-pulse">
            🤖 Milo is typing...
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to Milo..."
          className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] p-3 rounded-md text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleSpeechToText}
          className={`w-10 h-10 rounded-full border flex items-center justify-center ${
            isRecording ? "bg-red-100 border-red-400" : "bg-gray-200 dark:bg-gray-800 border-gray-300"
          }`}
          title="Speak"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 1v10m0 0a3 3 0 01-3-3V5a3 3 0 016 0v3a3 3 0 01-3 3zm0 0v4m4-4H8"
            />
          </svg>
        </button>
        <button
          onClick={handleSend}
          className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
