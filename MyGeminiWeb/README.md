# MyGeminiWeb

A modern, high-performance clone of the Google Gemini chat interface, built with **React**, **TypeScript**, and **Material UI**.

## ✨ Features

- **Authentic UI**: Meticulously designed to replicate the premium look and feel of Google Gemini.
- **Gemini 2.5 Flash**: Powered by Google's latest, fastest, and most efficient generative AI model.
- **Streaming Responses**: Experience real-time text generation with character-by-character streaming.
- **Conversation History**: Your chats are automatically persisted locally. Create new chats, switch between them, or delete old ones.
- **Responsive Design**: A fully fluid interface that works perfectly on desktop, tablet, and mobile.
- **Dark Mode**: Built with a custom dark theme optimized for readability and aesthetics.

## 🛠️ Tech Stack

- **Core**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **UI Framework**: [Material UI (MUI)](https://mui.com/)
- **Styling**: Emotion (via MUI), Custom Theme
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- A **Google Gemini API Key** (Get it for free at [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kvn703/MyGeminiWeb.git
   cd MyGeminiWeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory (`MyGeminiWeb/.env`) and add your API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:5173` to start chatting!

## 📂 Project Structure

```
src/
├── components/      # UI Components (Sidebar, ChatArea, InputArea)
├── hooks/           # Custom Hooks (useChatHistory)
├── services/        # API Services (Gemini integration)
├── types/           # TypeScript Definitions
├── theme.ts         # MUI Theme Configuration
├── App.tsx          # Main Application Component
└── main.tsx         # Entry Point
```


## 📄 License

This project is a side project for experience purposes.
