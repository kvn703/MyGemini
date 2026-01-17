import { useState, useEffect } from 'react';
import type { ChatSession } from '../types/chat';
import type { ChatMessage } from '../services/gemini';

const STORAGE_KEY = 'gemini_chat_history';

export function useChatHistory() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setSessions(parsed);
                if (parsed.length > 0) {
                    setCurrentSessionId(parsed[0].id);
                } else {
                    createNewSession();
                }
            } catch (e) {
                console.error("Failed to parse chat history", e);
                createNewSession();
            }
        } else {
            createNewSession();
        }
    }, []);

    // Save to local storage whenever sessions change
    useEffect(() => {
        if (sessions.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        }
    }, [sessions]);

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

    const deleteSession = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSessions(prev => {
            const newSessions = prev.filter(s => s.id !== id);
            if (currentSessionId === id) {
                if (newSessions.length > 0) {
                    setCurrentSessionId(newSessions[0].id);
                } else {
                    const newSession: ChatSession = {
                        id: Date.now().toString(),
                        title: 'New Chat',
                        messages: [],
                        createdAt: Date.now()
                    };
                    setCurrentSessionId(newSession.id);
                    return [newSession];
                }
            }
            return newSessions;
        });
    };

    const clearAllSessions = () => {
        setSessions([]);
        localStorage.removeItem(STORAGE_KEY);
        createNewSession();
    };

    const currentSession = sessions.find(s => s.id === currentSessionId);

    return {
        sessions,
        currentSessionId,
        currentSession,
        createNewSession,
        selectSession,
        updateSessionMessages,
        deleteSession,
        clearAllSessions
    };
}
