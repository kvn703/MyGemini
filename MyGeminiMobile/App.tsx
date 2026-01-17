import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { Menu } from 'lucide-react-native';
import { theme } from './src/theme';
import { Sidebar } from './src/components/Sidebar';
import { ChatArea } from './src/components/ChatArea';
import { InputArea } from './src/components/InputArea';
import { useChatHistory } from './src/hooks/useChatHistory';
import { sendMessage } from './src/services/gemini';
import type { ChatMessage } from './src/types/chat';

export default function App() {
  const {
    sessions,
    currentSessionId,
    currentSession,
    createNewSession,
    selectSession,
    updateSessionMessages,
    deleteSession
  } = useChatHistory();

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messages = currentSession?.messages || [];

  const handleSend = async (text: string) => {
    if (!currentSessionId) return;

    const userMessage: ChatMessage = { role: 'user', parts: text };
    const updatedMessages = [...messages, userMessage];

    updateSessionMessages(currentSessionId, updatedMessages);
    setIsLoading(true);

    try {
      const placeholderMsg: ChatMessage = { role: 'model', parts: '...' };
      const messagesWithPlaceholder = [...updatedMessages, placeholderMsg];
      updateSessionMessages(currentSessionId, messagesWithPlaceholder);

      const responseText = await sendMessage(updatedMessages, text);

      const newMessages = [...messagesWithPlaceholder];
      newMessages[newMessages.length - 1] = { role: 'model', parts: responseText };
      updateSessionMessages(currentSessionId, newMessages);

    } catch (error) {
      console.error("Failed to get response:", error);
      const errorMessage: ChatMessage = {
        role: 'model',
        parts: `**Error**: Failed to get response from Gemini.\n\nDetails: ${error instanceof Error ? error.message : String(error)}`
      };
      const newMessages = [...updatedMessages, errorMessage];
      updateSessionMessages(currentSessionId, newMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    createNewSession();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={theme.colors.background.default} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Menu size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}
      >
        <ChatArea messages={messages} isLoading={isLoading} />
        <InputArea onSend={handleSend} disabled={isLoading} />
      </KeyboardAvoidingView>

      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onNewChat={handleNewChat}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={selectSession}
        onDeleteSession={deleteSession}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.colors.background.default,
    zIndex: 10,
  },
  menuButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
});
