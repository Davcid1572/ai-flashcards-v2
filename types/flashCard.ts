export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface GenerateRequest {
  text: string;
}

export interface GenerateResponse {
  flashcards: Flashcard[];
}
