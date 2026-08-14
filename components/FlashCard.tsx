"use client";

import { useState } from "react";
import { Flashcard } from "@/types/flashcarrd";

interface FlashCardProps {
  card: Flashcard;
  index: number;
  total: number;
}

export default function FlashCard({ card, index, total }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-500 text-sm">
        Card {index + 1} of {total} — click card to flip
      </p>

      <div
        onClick={handleFlip}
        className="w-full cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "260px",
          }}
        >
          {/* Front — Question */}
          <div
            className="absolute inset-0 flex flex-col items-center 
                       justify-center p-8 rounded-2xl bg-gray-800 
                       border border-gray-700"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span
              className="text-xs font-medium text-violet-400 
                            uppercase tracking-widest mb-4"
            >
              Question
            </span>
            <p
              className="text-white text-lg font-medium text-center 
                         leading-relaxed"
            >
              {card.question}
            </p>
            <span className="text-gray-600 text-xs mt-6">
              Tap to reveal answer
            </span>
          </div>

          {/* Back — Answer */}
          <div
            className="absolute inset-0 flex flex-col items-center 
                       justify-center p-8 rounded-2xl bg-violet-900/40 
                       border border-violet-700/50"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <span
              className="text-xs font-medium text-violet-400 
                            uppercase tracking-widest mb-4"
            >
              Answer
            </span>
            <p
              className="text-white text-lg font-medium text-center 
                         leading-relaxed"
            >
              {card.answer}
            </p>
            <span className="text-gray-500 text-xs mt-6">
              Tap to see question
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
