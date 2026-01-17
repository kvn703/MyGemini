import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Keyboard } from 'react-native';
import { Send } from 'lucide-react-native';
import { theme } from '../theme';

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
            Keyboard.dismiss();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a prompt here"
                    placeholderTextColor={theme.colors.text.secondary}
                    value={input}
                    onChangeText={setInput}
                    multiline
                    maxLength={1000}
                    editable={!disabled}
                />
                {input.trim().length > 0 && (
                    <TouchableOpacity
                        onPress={handleSend}
                        disabled={disabled}
                        style={[styles.sendButton, disabled && styles.disabledButton]}
                    >
                        <Send size={20} color={theme.colors.primary.contrastText} />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.disclaimer}>
                GeminiWeb est un mini projet qui est comme gemini et il utilise juste le modele gemini-2.5-flash
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: theme.colors.background.default,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background.paper,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: theme.colors.divider,
    },
    input: {
        flex: 1,
        color: theme.colors.text.primary,
        fontSize: 16,
        maxHeight: 100,
        paddingTop: 8,
        paddingBottom: 8,
    },
    sendButton: {
        backgroundColor: theme.colors.primary.main,
        borderRadius: 20,
        padding: 8,
        marginLeft: 8,
    },
    disabledButton: {
        backgroundColor: theme.colors.action.disabledBackground,
    },
    disclaimer: {
        color: theme.colors.text.secondary,
        fontSize: 10,
        textAlign: 'center',
        marginTop: 8,
    }
});
