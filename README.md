# AI Flashcard Generator 🧠

Paste any text and instantly turn it into flip-through
Q&A flashcards powered by AI. Built to demonstrate
structured JSON output from large language models.

## Live Demo

[your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

## Features

- Paste any text — notes, articles, documentation
- AI generates 5-10 Q&A flashcards automatically
- Smooth 3D card flip animation — pure CSS, no library
- Navigation dots for quick jumping between cards
- Previous/Next navigation with boundary guards
- Deck completion celebration

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Groq API (llama-3.3-70b-versatile)

## The Interesting Part — Structured AI Output

Instead of asking the AI to respond freely, I prompt
it to return a strict JSON array of question/answer pairs.
The prompt uses explicit rules, a concrete example, and
assistant prefilling ("JSON array:") to prime the model.
The response is then cleaned, parsed, and validated
before being mapped to UI components.

## Running Locally

1. Clone the repo
   git clone https://github.com/YOURUSERNAME/ai-flashcards.git

2. Install dependencies
   npm install

3. Create .env.local and add your Groq API key
   GROQ_API_KEY=your_key_here

4. Start the dev server
   npm run dev

5. Open http://localhost:3000

## What I Learned

- Prompt engineering for structured JSON output
- Defensive parsing — cleaning and validating AI responses
- CSS 3D transforms for card flip animation
- Using React key prop to reset component state
- Assistant prefilling to prime model responses
- Temperature parameter for controlling AI creativity
