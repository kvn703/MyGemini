import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User } from 'lucide-react';
import type { ChatMessage } from '../services/gemini';
import { useEffect, useRef } from 'react';
import { Box, Typography, Avatar, CircularProgress } from '@mui/material';

interface ChatAreaProps {
    messages: ChatMessage[];
    isLoading: boolean;
}

export function ChatArea({ messages, isLoading }: ChatAreaProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const scrollContainer = scrollRef.current;
            const isNearBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight < 100;

            if (isNearBottom || isLoading) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages, isLoading]);

    if (messages.length === 0) {
        return (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, textAlign: 'center' }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                    Hello, User
                </Typography>
                <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 400 }}>
                    How can I help you today?
                </Typography>
            </Box>
        );
    }

    return (
        <Box ref={scrollRef} sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, md: 4 }, scrollBehavior: 'smooth', minHeight: 0 }}>
            <Box sx={{ maxWidth: '800px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {messages.map((msg, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                        <Avatar sx={{ bgcolor: msg.role === 'user' ? 'grey.800' : 'primary.main', width: 32, height: 32 }}>
                            {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                        </Avatar>

                        <Box sx={{ flex: 1, overflow: 'hidden' }}>
                            <Box sx={{
                                display: 'inline-block',
                                textAlign: 'left',
                                bgcolor: msg.role === 'user' ? 'background.paper' : 'transparent',
                                borderRadius: 4,
                                px: msg.role === 'user' ? 3 : 0,
                                py: msg.role === 'user' ? 2 : 0,
                                maxWidth: '100%'
                            }}>
                                <Box sx={{
                                    '& p': { m: 0, mb: 1.5, lineHeight: 1.7, color: 'text.primary' },
                                    '& p:last-child': { mb: 0 },
                                    '& pre': {
                                        bgcolor: '#1a1a1a',
                                        p: 2,
                                        borderRadius: 2,
                                        overflowX: 'auto',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        my: 2
                                    },
                                    '& code': { fontFamily: 'monospace', fontSize: '0.9em' },
                                    '& ul, & ol': { pl: 3, mb: 1.5 },
                                    '& li': { mb: 0.5 },
                                    '& a': { color: 'primary.main' }
                                }}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.parts}
                                    </ReactMarkdown>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}

                {isLoading && (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <Bot size={18} />
                        </Avatar>
                        <Box sx={{ display: 'flex', alignItems: 'center', height: 32 }}>
                            <CircularProgress size={20} color="inherit" sx={{ color: 'text.secondary' }} />
                        </Box>
                    </Box>
                )}

            </Box>
        </Box>
    );
}
