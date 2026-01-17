# MyGeminiMobile

A native mobile application clone of the Google Gemini interface, built with **React Native**, **Expo**, and **TypeScript**.


## ✨ Features

- **Native Experience**: Built with React Native for a smooth, native feel on iOS and Android.
- **Gemini Integration**: Powered by the `gemini-2.5-flash` model for fast and accurate responses.
- **Persistent History**: Chats are saved locally on your device using `AsyncStorage`.
- **Dark Mode**: A sleek, battery-saving dark theme inspired by the original Gemini app.
- **Markdown Support**: Renders code blocks, lists, and formatting beautifully.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Storage**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)
- **AI SDK**: [Google Generative AI](https://www.npmjs.com/package/@google/generative-ai)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **Expo Go** app installed on your physical device (iOS/Android) OR an Emulator/Simulator.
- A **Google Gemini API Key**.

### Installation

1. **Navigate to the mobile directory**
   ```bash
   cd MyGeminiMobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `MyGeminiMobile` directory and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   *(Note: Ensure your code is configured to read this variable correctly, e.g., using `process.env` or `expo-env`)*

4. **Start the Project**
   ```bash
   npx expo start
   ```

5. **Run on Device**
   - **Physical Device**: Scan the QR code displayed in the terminal with the **Expo Go** app.
   - **Simulator/Emulator**: Press `i` for iOS Simulator or `a` for Android Emulator.

## 📂 Project Structure

```
MyGeminiMobile/
├── App.tsx              # Main Entry Point
├── src/
│   ├── components/      # Native UI Components (ChatArea, InputArea, Sidebar)
│   ├── hooks/           # Logic Hooks (useChatHistory)
│   ├── services/        # API Integration (gemini.ts)
│   ├── types/           # TypeScript Interfaces
│   └── theme.ts         # Design Tokens & Colors
└── .env                 # Environment Configuration
```

## 📄 License

This project is a side project for experience purposes. 
