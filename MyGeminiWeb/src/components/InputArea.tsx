import { Send } from 'lucide-react';
import { useState } from 'react';
import { Box, IconButton, InputBase, Paper, Typography } from '@mui/material';

interface InputAreaProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function InputArea({ onSend, disabled }: InputAreaProps) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() && !disabled) {
            onSend(input);
            setInput("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto', px: 2, pb: 3 }}>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: 8,
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                    boxShadow: 'none',
                    transition: 'border-color 0.2s',
                    '&:focus-within': {
                        borderColor: 'text.secondary',
                    }
                }}
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            >
                <InputBase
                    sx={{ ml: 2, flex: 1, py: 2 }}
                    placeholder="Enter a prompt here"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    multiline
                    maxRows={6}
                    disabled={disabled}
                />

                <Box sx={{ display: 'flex', gap: 1, pr: 1 }}>
                    {input.trim().length === 0 ? (
                        null
                    ) : (
                        <IconButton
                            onClick={handleSend}
                            disabled={disabled}
                            sx={{
                                color: 'primary.contrastText',
                                bgcolor: 'primary.main',
                                '&:hover': { bgcolor: 'primary.dark' },
                                '&.Mui-disabled': { bgcolor: 'action.disabledBackground' }
                            }}
                        >
                            <Send size={18} />
                        </IconButton>
                    )}
                </Box>
            </Paper>
            <Typography variant="caption" align="center" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                GeminiWeb est un mini projet qui est comme gemini et il utilise juste le modele gemini-2.5-flash
            </Typography>
        </Box>
    );
}
