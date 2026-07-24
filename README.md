# 🤖 Elitz — AI Chat Companion

Elitz is a lightweight, ChatGPT-style conversational interface powered by Google's Gemini API. It supports multiple chat threads, markdown-formatted AI responses, and persists conversation history locally in the browser.

## ✨ Features

- **Multi-chat management** — Create, switch between, and delete conversations from a collapsible sidebar
- **Gemini-powered responses** — Messages are sent directly to Google's `gemini-2.0-flash` model
- **Markdown rendering** — AI responses render formatted text, code blocks, and lists via `react-markdown`
- **Local persistence** — Chat history is saved to `localStorage`, so conversations survive page refreshes
- **Responsive layout** — Sidebar collapses on mobile with an overlay; adapts to desktop and mobile breakpoints
- **Toast notifications** — Rate limit and error handling surfaced via `react-toastify`

## 🛠️ Tech Stack

| Layer         | Technology                             |
| ------------- | -------------------------------------- |
| Framework     | React 19 + Vite                        |
| Styling       | Tailwind CSS v4                        |
| Routing       | React Router v7                        |
| AI Backend    | Google Gemini API (`gemini-2.0-flash`) |
| Markdown      | react-markdown                         |
| Notifications | react-toastify                         |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/) API key with Gemini API access enabled

### Installation

```bash
git clone https://github.com/OlatundeEmmanuelTantolorun/elitz-ai-chat.git
cd elitz-ai-chat
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_GOOGLE_API_KEY=your_gemini_api_key_here
```

> Your API key is used client-side to call the Gemini API directly. Do not commit `.env` to version control.

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── api/
│   └── gemini.js                  # Gemini API request handling
├── assets/
│   ├── logo.png                   # App logo
│   ├── robotModal.mp4             # Robot animation video
│   └── robotModal2.mp4            # Robot animation video 2
├── components/
│   ├── Message.jsx                # Individual chat bubble (user/AI)
│   ├── MessageInput.jsx           # Text input + send button
│   ├── Navbar.jsx                 # Top bar with chat metadata
│   ├── RateLimitWarning.jsx       # Rate limit notification component
│   └── Sidebar.jsx                # Chat list, new chat, delete chat
├── context/
│   └── ChatContext.jsx            # Global chat state, persistence, API calls
├── pages/
│   ├── Home.jsx                   # Landing / entry screen
│   └── Chat.jsx                   # Main chat view
├── App.jsx                        # Routes + providers
├── main.jsx                       # Entry point
└── index.css                      # Tailwind entry + global styles
```

## 📝 Usage Notes

- **Rate limits**: The free tier of the Gemini API allows 60 requests per minute. Exceeding this triggers a toast warning.
- **Tailwind constraint**: This project intentionally avoids custom colors in `tailwind.config.js` — Tailwind v4 has known incompatibilities with custom color tokens, so only built-in palette classes (e.g. `slate-950`, `amber-500`) are used throughout.

## 🗺️ Roadmap

- [ ] Streaming responses instead of full-response wait
- [ ] Authentication and per-user chat sync (currently local-only)
- [ ] Configurable model selection
- [ ] Export chat history

## 📄 License

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Olatunde Emmanuel Tantolorun**

- GitHub: [@OlatundeEmmanuelTantolorun](https://github.com/OlatundeEmmanuelTantolorun)

---

⭐ Star this repository if you find it useful!

Built with ❤️
