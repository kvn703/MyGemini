import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ChatSession, ChatMessage } from '../types/chat';

const STORAGE_KEY = 'gemini_chat_history';

export function useChatHistory() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from AsyncStorage on mount
    useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setSessions(parsed);
                if (parsed.length > 0) {
                    setCurrentSessionId(parsed[0].id);
                } else {
                    createNewSession();
                }
            } else {
                createNewSession();
            }
        } catch (e) {
            console.error("Failed to load chat history", e);
            createNewSession();
        } finally {
            setIsLoaded(true);
        }
    };

    // Save to AsyncStorage whenever sessions change
    useEffect(() => {
        if (isLoaded) {
            saveSessions(sessions);
        }
    }, [sessions, isLoaded]);

    const saveSessions = async (newSessions: ChatSession[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
        } catch (e) {
            console.error("Failed to save chat history", e);
        }
    };

    const createNewSession = () => {
        const newSession: ChatSession = {
            id: Date.now().toString(),
            title: 'New Chat',
            messages: [],
            createdAt: Date.now()
        };
        setSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(newSession.id);
        return newSession.id;
    };

    const selectSession = (id: string) => {
        setCurrentSessionId(id);
    };

    const updateSessionMessages = (id: string, messages: ChatMessage[]) => {
        setSessions(prev => prev.map(session => {
            if (session.id === id) {
                let title = session.title;
                if (session.title === 'New Chat' && messages.length > 0) {
                    const firstUserMsg = messages.find(m => m.role === 'user');
                    if (firstUserMsg) {
                        title = firstUserMsg.parts.slice(0, 30) + (firstUserMsg.parts.length > 30 ? '...' : '');
                    }
                }
                return { ...session, messages, title };
            }
            return session;
        }));
    };

    const deleteSession = (id: string) => {
        setSessions(prev => {
            const newSessions = prev.filter(s => s.id !== id);
            if (currentSessionId === id) {
                if (newSessions.length > 0) {
                    setCurrentSessionId(newSessions[0].id);
                } else {
                    // We need to create a new session if all are deleted, 
                    // but we can't easily call createNewSession inside the setter.
                    // We'll handle this effect in the component or just set ID to null and let effect handle it?
                    // Actually, let's just return empty and let the UI handle "No chats" or auto-create.
                    // For simplicity, let's auto-create in the next render cycle if needed, or just leave it empty.
                    setCurrentSessionId(null);
                }
            }
            return newSessions;
        });
    };

    // Auto-create if empty after delete
    useEffect(() => {
        if (isLoaded && sessions.length === 0) {
            createNewSession();
        }
    }, [sessions, isLoaded]);

    const currentSession = sessions.find(s => s.id === currentSessionId);

    return {
        sessions,
        currentSessionId,
        currentSession,
        createNewSession,
        selectSession,
        updateSessionMessages,
        deleteSession,
        isLoaded
    };
}
