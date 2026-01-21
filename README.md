# AI API Playground 🤖

A modern web application that allows you to test 25+ AI models with your own API key. Built with React, TypeScript, and Tailwind CSS.

![AI API Playground](https://via.placeholder.com/1200x600/1e293b/ffffff?text=AI+API+Playground)

## Features

- 🔐 **Secure API Key Storage** - Your API key is stored locally and never shared
- 🤖 **25+ AI Models** - Including models from OpenAI, Google, Qwen, DeepSeek, MoonshotAI, and more
- 💬 **Real-time Chat** - Modern chat interface with message streaming
- 📊 **Model Details** - View comprehensive information about each model
- 🎨 **Modern UI** - Responsive design with dark mode support
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance

## Supported Models

### OpenAI
- GPT-OSS 120B, GPT-5.2, GPT-5.1, GPT-5 Mini

### Google
- Gemini 3 Flash/Pro Preview, Gemini 2.5 Flash/Lite

### Qwen
- Qwen3 32B, Qwen3 235B, Qwen3 Next 80B, Qwen3 VL 235B

### MoonshotAI
- Kimi K2 Thinking, Kimi K2 0905

### DeepSeek
- DeepSeek V3.2 Speciale/Exp, DeepSeek R1 0528, R1 Distill Qwen 32B

### And more from Z.AI, xAI, NVIDIA, ByteDance Seed

## Quick Start

### Deploy to GitHub Pages (Recommended)

1. **Fork this repository** on GitHub

2. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/ai-api-playground"
   ```

3. **Enable GitHub Pages**:
   - Go to your forked repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

4. **Push your changes** - The website will automatically deploy

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ai-api-playground.git
   cd ai-api-playground
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

## How to Use

1. **Enter your API key** in the configuration panel
2. **Select an AI model** from the dropdown menu
3. **Start chatting** in the interface

## API Integration

This playground currently simulates AI responses for demonstration. To connect to actual APIs, you would need to:

1. Implement API calls for each provider in `src/hooks/useAIApi.ts`
2. Add the specific endpoints and authentication methods
3. Handle rate limiting and error responses

## Project Structure

```
ai-api-playground/
├── public/
├── src/
│   ├── components/ui/     # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── sections/         # Page sections/components
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main application component
│   └── index.css         # Global styles
├── package.json
├── vite.config.ts
└── README.md
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [Your Name](https://github.com/yourusername)
