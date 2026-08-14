"use client";

import { useState } from "react";
import { Flashcard } from "@/types/flashcard";
import TextInput from "@/components/TextInput";
import FlashCardDeck from "@/components/FlashCardDeck";

export default function Home() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Please paste some text first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setFlashcards([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setFlashcards(data.flashcards);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFlashcards([]);
    setText("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            🧠 AI Flashcard Generator
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Paste any text and instantly turn it into flip-through flashcards
          </p>
        </div>

        {flashcards.length === 0 ? (
          <div
            className="bg-gray-800/50 rounded-2xl border 
                         border-gray-700 p-6 flex flex-col gap-5"
          >
            <TextInput value={text} onChange={setText} isLoading={isLoading} />

            {error && (
              <p
                className="text-red-400 text-sm bg-red-400/10 
                           px-4 py-3 rounded-lg"
              >
                {error}
              </p>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading || !text.trim()}
              className="w-full py-3 rounded-xl font-medium text-sm
                         bg-violet-600 hover:bg-violet-500 text-white
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-150 active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-4 h-4 border-2 border-white/30 
                                  border-t-white rounded-full animate-spin"
                  />
                  Generating flashcards...
                </span>
              ) : (
                "Generate Flashcards"
              )}
            </button>

            {isLoading && (
              <p className="text-center text-xs text-gray-500">
                Reading your text and generating cards... this may take a few
                seconds.
              </p>
            )}
          </div>
        ) : (
          <FlashCardDeck flashcards={flashcards} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
