import { useState } from "react";
import { Flashcard } from "@/types/flashcard";
import FlashCard from "@/components/FlashCard";

interface FlashCardDeckProps {
  flashcards: Flashcard[];
  onReset: () => void;
}

export default function FlashCardDeck({
  flashcards,
  onReset,
}: FlashCardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(flashcards.length - 1, prev + 1));
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === flashcards.length - 1;
  const currentCard = flashcards[currentIndex];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-300">Your Flashcards</h2>
        <button
          onClick={onReset}
          className="text-xs text-gray-500 hover:text-gray-300
                     transition-colors duration-150"
        >
          ← Generate New
        </button>
      </div>

      <FlashCard
        key={currentCard.id}
        card={currentCard}
        index={currentIndex}
        total={flashcards.length}
      />

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className="flex-1 py-3 rounded-xl text-sm font-medium
                     border border-gray-700 text-gray-400
                     hover:border-gray-500 hover:text-gray-300
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-all duration-150"
        >
          ← Previous
        </button>

        <div className="flex gap-1.5">
          {flashcards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-150 ${
                index === currentIndex
                  ? "bg-violet-500 w-4"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={isLast}
          className="flex-1 py-3 rounded-xl text-sm font-medium
                     border border-gray-700 text-gray-400
                     hover:border-gray-500 hover:text-gray-300
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-all duration-150"
        >
          Next →
        </button>
      </div>

      <div
        className="bg-gray-800/50 rounded-xl px-4 py-3 
                     border border-gray-700 text-center"
      >
        <p className="text-xs text-gray-500">
          {currentIndex + 1} of {flashcards.length} cards
          {isLast && (
            <span className="text-violet-400 ml-2">— Deck complete! 🎉</span>
          )}
        </p>
      </div>
    </div>
  );
}
