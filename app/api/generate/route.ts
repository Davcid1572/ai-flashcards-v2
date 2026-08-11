import groq from "@/lib/groq";
import { GenerateRequest, GenerateResponse } from "@/types/flashCard";

function getPrompt(text: string): string {
  return `You are a flashcard generator. Analyze the following text and generate between 5 and 10 flashcards.

Rules you MUST follow:
- Respond with ONLY a valid JSON array. No explanation, no markdown, no code blocks.
- Each flashcard must have exactly two fields: "question" and "answer".
- Questions should test understanding, not just memorization.
- Answers should be concise — one or two sentences maximum.
- Do not number the questions.
- Do not wrap the response in any object — return a raw JSON array.

Example of the EXACT format you must return:
[
  { "question": "What is an API?", "answer": "A set of rules that allows different software programs to communicate with each other." },
  { "question": "What does REST stand for?", "answer": "Representational State Transfer — an architectural style for designing networked applications." }
]

Text to generate flashcards from:
${text}

JSON array:`;
}

function assignIds(flashcards: { question: string; answer: string }[]) {
  return flashcards.map((card, index) => ({
    id: `card-${index}-${Date.now()}`,
    question: card.question,
    answer: card.answer,
  }));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text }: GenerateRequest = body;

    if (!text || text.trim().length === 0) {
      return Response.json({ error: "No text provided" }, { status: 400 });
    }

    if (text.trim().split(/\s+/).length < 30) {
      return Response.json(
        {
          error:
            "Please provide at least 30 words to generate meaningful flashcards.",
        },
        { status: 400 },
      );
    }

    if (text.length > 50000) {
      return Response.json(
        { error: "Text is too long. Please use a shorter passage." },
        { status: 400 },
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      stream: false,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: getPrompt(text),
        },
      ],
    });

    const rawContent = completion.choices[0]?.message?.content || "";

    let parsed: { question: string; answer: string }[];

    try {
      const cleaned = rawContent
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      parsed = JSON.parse(cleaned);

      if (!Array.isArray(parsed)) {
        throw new Error("Response is not an array");
      }

      parsed = parsed.filter(
        (card) =>
          typeof card.question === "string" &&
          typeof card.answer === "string" &&
          card.question.trim().length > 0 &&
          card.answer.trim().length > 0,
      );

      if (parsed.length === 0) {
        throw new Error("No valid flashcards in response");
      }
    } catch {
      console.error("Failed to parse AI response:", rawContent);
      return Response.json(
        { error: "Failed to generate flashcards. Please try again." },
        { status: 500 },
      );
    }

    const flashcards = assignIds(parsed);
    const response: GenerateResponse = { flashcards };

    return Response.json(response);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    console.error("Generate API error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
