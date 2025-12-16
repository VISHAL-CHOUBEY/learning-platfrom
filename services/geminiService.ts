import { GoogleGenAI, Content, Part } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, handle missing key gracefully
const ai = new GoogleGenAI({ apiKey });

export const getTutorResponse = async (
  history: Content[],
  currentMessage: string,
  context: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct system instruction based on the current lesson context
    const systemInstruction = `
      You are an expert AI Tutor for the SkillForge learning platform.
      
      Current Context:
      ${context}

      Guidelines:
      - Answer the student's question based on the provided context if available.
      - Be encouraging, concise, and helpful.
      - If the user asks for a quiz, generate a short multiple-choice question.
      - Use Markdown for code snippets or formatting.
      - Do not give away direct answers to quiz questions found in the course, but guide them to the solution.
    `;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: currentMessage });
    return result.text || "I'm having trouble thinking right now. Try again?";
  } catch (error) {
    console.error("AI Tutor Error:", error);
    return "Sorry, I encountered an error while connecting to the AI Tutor. Please check your API key.";
  }
};
