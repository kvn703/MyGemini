import React, { useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { theme } from '../theme';
import type { ChatMessage } from '../types/chat';

interface ChatAreaProps {
    messages: ChatMessage[];
    isLoading: boolean;
}

export function ChatArea({ messages, isLoading }: ChatAreaProps) {
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const renderItem = ({ item }: { item: ChatMessage }) => {
        const isUser = item.role === 'user';
        return (
            <View style={[
                styles.messageContainer,
                isUser ? styles.userMessage : styles.modelMessage
            ]}>
                <View style={[
                    styles.bubble,
                    isUser ? styles.userBubble : styles.modelBubble
                ]}>
                    {isUser ? (
                        <Text style={styles.userText}>{item.parts}</Text>
                    ) : (
                        <Markdown
                            style={markdownStyles}
                        >
                            {item.parts}
                        </Markdown>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {messages.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Hello, User</Text>
                    <Text style={styles.subEmptyText}>How can I help you today?</Text>
                </View>
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContent}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />
            )}
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={theme.colors.primary.main} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.default,
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },
    messageContainer: {
        marginBottom: 16,
        flexDirection: 'row',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    modelMessage: {
        justifyContent: 'flex-start',
    },
    bubble: {
        maxWidth: '85%',
        padding: 12,
        borderRadius: 16,
    },
    userBubble: {
        backgroundColor: theme.colors.background.paper,
        borderBottomRightRadius: 4,
    },
    modelBubble: {
        backgroundColor: 'transparent',
        paddingLeft: 0,
    },
    userText: {
        color: theme.colors.text.primary,
        fontSize: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: theme.colors.primary.main,
        fontWeight: 'bold',
    },
    subEmptyText: {
        color: theme.colors.text.secondary,
        fontSize: 24,
        fontWeight: '500',
    },
    loadingContainer: {
        padding: 8,
        alignItems: 'flex-start',
        marginLeft: 16,
    }
});

const markdownStyles = {
    body: {
        color: theme.colors.text.primary,
        fontSize: 16,
    },
    code_inline: {
        backgroundColor: theme.colors.background.paper,
        color: theme.colors.text.primary,
        borderRadius: 4,
    },
    fence: {
        backgroundColor: theme.colors.background.paper,
        color: theme.colors.text.primary,
        borderRadius: 8,
        padding: 8,
    },
};
