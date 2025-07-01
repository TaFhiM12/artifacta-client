import { useState, useRef, useEffect, use } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  FaScroll,
  FaHistory,
  FaGem,
  FaPaperPlane,
  FaHourglassHalf,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";

const LOCAL_STORAGE_KEY = "artifactAI_messages";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
import { Helmet } from 'react-helmet';

const ArtifactAIAssistant = () => {
  const {user} = use(AuthContext);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const MODEL_PRIORITY = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro-latest",
    "gemini-pro",
  ];

  useEffect(() => {
    const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        const messagesWithDates = parsedMessages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error("Failed to parse saved messages:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      for (const modelName of MODEL_PRIORITY) {
        try {
          if (!chatRef.current) {
            const model = genAI.getGenerativeModel({
              model: modelName,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1500,
                topP: 0.9,
              },
            });

            chatRef.current = model.startChat({
              history: messages.map((msg) => ({
                role: msg.role,
                parts: [{ text: msg.text }],
              })),
            });
          }

          const result = await chatRef.current.sendMessage(input);
          const response = await result.response;
          const text = response.text();

          setMessages((prev) => [
            ...prev,
            {
              role: "model",
              text,
              timestamp: new Date(),
            },
          ]);
          return;
        } catch (modelError) {
          if (modelError.message.includes("404")) {
            continue; // Try next model
          }
          throw modelError;
        }
      }
      throw new Error("All model attempts failed");
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `⚠️ Research Assistant Error: ${
            error.message || "Knowledge retrieval failed"
          }`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to clear this conversation? This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    });

    if (result.isConfirmed) {
      setMessages([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      chatRef.current = null;
      Swal.fire("Cleared!", "Your conversation has been cleared.", "success");
    }
  };

  if(!user){
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }



  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[620px] overflow-hidden mt-70 md:mt-30 md:bg-gradient-to-b md:from-stone-100 md:to-amber-50 mx-auto rounded-lg md:px-10 md:py-6">
    <Helmet>
      <title>Artifacta Research Assistant</title>
      <meta
        name="description"
        content="Chat with the Artifacta Research Assistant powered by Google Gemini AI."
      />
    </Helmet>
    
      <header className="w-full text-amber-50 p-4 top-0">
        <div className="container mx-auto flex items-center gap-4">
          <div className="p-3 bg-white rounded-full shadow-inner border border-amber-500">
            <img src="./chat.png" className="w-10" alt="Chat Assistant" />
          </div>
          <div className="flex-1 hidden md:inline">
            <h1 className="text-2xl font-bold text-amber-800 tracking-wide">
              Artifacta Research Assistant
            </h1>
            <p className="text-xs text-stone-500 flex items-center gap-1 ">
              <FaHistory className="text-xs" />
              <span>
                Powered by Google Gemini AI • Specialized in Historical
                Artifacts
              </span>
            </p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearConversation}
              className="p-2 text-stone-800 hover:text-white hover:bg-amber-700 rounded-full transition-colors"
              title="Clear conversation"
            >
              <FaTrash className="text-sm" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col container mx-auto px-4 py-4 overflow-hidden">
        {error && (
          <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-r-lg shadow-sm mb-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-600 rounded-full text-amber-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-amber-900">
                  Research Limitation
                </h3>
                <p className="text-sm text-amber-800">
                  {error.includes("quota") ? (
                    <>
                      Knowledge retrieval quota exceeded. Please wait or
                      <a
                        href="https://ai.google.dev/pricing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium ml-1 hover:underline"
                      >
                        consult our librarians
                      </a>
                    </>
                  ) : (
                    error
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto mb-4" ref={messagesContainerRef}>
          <div className="bg-white rounded-xl shadow-lg border border-amber-200 relative min-h-full">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] opacity-10 pointer-events-none"></div>

            <div className="p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="mb-6 p-5 bg-amber-100 rounded-full border border-amber-200">
                    <FaScroll className="text-3xl text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-800 mb-2">
                    Artifact Research Assistant
                  </h3>
                  <p className="text-amber-600 max-w-md mb-4">
                    Ask me about historical artifacts, their origins,
                    preservation techniques, or significance.
                  </p>
                  <div className="text-xs text-amber-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Try: "Explain the significance of the Rosetta Stone"
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-3xl rounded-lg p-4 ${
                          msg.role === "user"
                            ? "bg-amber-600 text-white rounded-br-none"
                            : "bg-amber-50 border border-amber-200 rounded-bl-none"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              msg.role === "user"
                                ? "bg-amber-700"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {msg.role === "user" ? (
                              "Y"
                            ) : (
                              <img
                                src="./chat.png"
                                className="w-5"
                                alt="AI Assistant"
                              />
                            )}
                          </div>
                          <span
                            className={`text-[0.7rem] ${
                              msg.role === "user"
                                ? "text-amber-200"
                                : "text-amber-600"
                            }`}
                          >
                            {msg.role === "user" ? "You" : "Artifact Scholar"} •{" "}
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                        <div
                          className={`text-xs ${
                            msg.role === "user"
                              ? "text-amber-50"
                              : "text-amber-800"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl rounded-lg rounded-bl-none bg-amber-50 border border-amber-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                        <FaGem className="text-xs" />
                      </div>
                      <span className="text-xs text-amber-600">
                        Artifact Scholar
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-700">
                      <FaHourglassHalf className="animate-pulse" />
                      <span>Researching ancient records...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Input Area at Bottom */}
        <div className="bg-white rounded-lg shadow-md border border-amber-200 p-2">
          <div className="flex gap-2">
            <textarea
              className="textarea flex-1 bg-amber-50 border-amber-200 focus:border-amber-400 focus:ring-amber-300 text-amber-900"
              placeholder="Inscribe your query about ancient artifacts..."
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSend()
              }
              disabled={loading}
            />
            <button
              className="btn bg-amber-600 hover:bg-amber-700 border-amber-700 text-white self-end h-full"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <div className="flex items-center gap-1 h-10">
                  <FaPaperPlane />
                  <span className="hidden sm:inline">Send</span>
                </div>
              )}
            </button>
          </div>
          <div className="text-xs text-amber-600 mt-4 ml-1">
            Press{" "}
            <kbd className="kbd kbd-sm bg-amber-100 border-amber-300">
              Enter
            </kbd>{" "}
            to send,
            <kbd className="kbd kbd-sm bg-amber-100 border-amber-300 mx-1">
              Shift
            </kbd>{" "}
            +
            <kbd className="kbd kbd-sm bg-amber-100 border-amber-300">
              Enter
            </kbd>{" "}
            for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactAIAssistant;
