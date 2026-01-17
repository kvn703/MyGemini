import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("GEMINI_API_KEY is not set in .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface ChatMessage {
    role: "user" | "model";
    parts: string;
}

export const sendMessageStream = async (history: ChatMessage[], newMessage: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const chatHistory = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.parts }]
        }));

        const chat = model.startChat({
            history: chatHistory,
        });

        const result = await chat.sendMessageStream(newMessage);
        return result.stream;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw error;
    }
};

export const sendMessage = async (history: ChatMessage[], newMessage: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const chatHistory = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.parts }]
        }));

        const chat = model.startChat({
            history: chatHistory,
        });

        const result = await chat.sendMessage(newMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw error;
    }
};
