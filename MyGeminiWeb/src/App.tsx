import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { InputArea } from './components/InputArea';
import { sendMessageStream, type ChatMessage } from './services/gemini';
import { theme } from './theme';
import { useChatHistory } from './hooks/useChatHistory';
import '@fontsource/inter/400.css';

function App() {
  const {
    sessions,
    currentSessionId,
    currentSession,
    createNewSession,
    selectSession,
    updateSessionMessages,
    deleteSession
  } = useChatHistory();

  const [isLoading, setIsLoading] = useState(false);
  const messages = currentSession?.messages || [];
  const handleSend = async (text: string) => {
    if (!currentSessionId) return;

    const userMessage: ChatMessage = { role: 'user', parts: text };
    const updatedMessages = [...messages, userMessage];

    updateSessionMessages(currentSessionId, updatedMessages);
    setIsLoading(true);

    try {
      const placeholderMsg: ChatMessage = { role: 'model', parts: '' };
      const messagesWithPlaceholder = [...updatedMessages, placeholderMsg];
      updateSessionMessages(currentSessionId, messagesWithPlaceholder);

      const stream = await sendMessageStream(updatedMessages, text);
      let fullText = '';

      for await (const chunk of stream) {
        const chunkText = chunk.text();
        fullText += chunkText;

        const newMessages = [...messagesWithPlaceholder];
        newMessages[newMessages.length - 1] = { role: 'model', parts: fullText } as ChatMessage;
        updateSessionMessages(currentSessionId, newMessages);
      }
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: 'background.default' }}>
        <Sidebar
          onNewChat={handleNewChat}
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={selectSession}
          onDeleteSession={deleteSession}
        />

        <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1000px', mx: 'auto', height: '100%', overflow: 'hidden' }}>
            <ChatArea messages={messages} isLoading={isLoading} />

            <Box sx={{ flexShrink: 0 }}>
              <InputArea onSend={handleSend} disabled={isLoading} />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
