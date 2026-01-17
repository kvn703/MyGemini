import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage } from "../types/chat";

// Access the API key from environment variables
// In Expo, variables prefixed with EXPO_PUBLIC_ are available available globally
const API_KEY = process.env.GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

export const sendMessage = async (history: ChatMessage[], message: string) => {
    if (!API_KEY) {
        throw new Error("API Key not found. Please check your .env file.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
        history: history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.parts }]
        })),
        generationConfig: {
            maxOutputTokens: 8000,
        },
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
};
