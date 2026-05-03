# JanVote - Interactive Election Guide for India

JanVote is a high-performance, AI-powered interactive learning platform designed to demystify India's democratic process. Built with a focus on **Civic Education**, it provides a gamified, accessible, and secure environment for citizens of all ages to understand how elections work.

---

## 🏛️ 1. Chosen Vertical: Civic Education
JanVote targets the **Civic Tech & Education** vertical. In a country with over 900 million voters, understanding the complex electoral machinery is crucial. JanVote bridges the gap between official documentation and citizen understanding using interactive visuals and AI.

## 🧠 2. Approach and Logic
The application follows a **"Progressive Disclosure"** model:
- **ELI10 Mode (Explain Like I'm 10)**: A toggle that simplifies complex political jargon into child-friendly language.
- **Visual Learning**: Uses a vertical timeline to represent the linear flow of an election.
- **Feedback Loops**: Instant results in simulations and quizzes provide immediate cognitive reinforcement.
- **AI-First Support**: An integrated AI assistant handles edge-case questions that static content cannot cover.

## 🛠️ 3. How the Solution Works
- **Frontend**: Built with **React** and **Vite** for near-instant load times.
- **Styling**: Uses **TailwindCSS** with a "Glassmorphic" design system for a premium, modern feel.
- **Backend (Serverless)**: Leverages **Google Firebase** for real-time data storage (Firestore) and user behavior tracking (Analytics).
- **AI Engine**: Integrated with **Google Gemini AI** via the `@google/genai` SDK for dynamic conversational learning.
- **Deployment**: Containerized with **Docker** and deployed on **Google Cloud Run** for global scalability.

## 📋 4. Assumptions Made
- **Connectivity**: Assumes users have basic internet access (optimized via Gzip and static asset caching).
- **Language**: Initial version focuses on English, with plans for multi-lingual regional support.
- **Mock Data**: Uses representative state data (UP, MH, etc.) for simulation to maintain performance while being illustrative.

---

## 🎯 5. Evaluation Focus Areas

### 💎 Code Quality
- **Modular Architecture**: Clean separation of concerns between pages, components, hooks, and utility modules.
- **Type Safety**: Implemented **PropTypes** across all components to ensure robust data handling and documentation.
- **Error Boundaries**: Implemented a global `ErrorBoundary` to prevent app-wide crashes and provide graceful fallback UI.
- **Modern Patterns**: Heavy use of `useCallback`, `useMemo`, and custom hooks (`useProgress`, `useAnalytics`) for clean, reusable logic.

### 🛡️ Security
- **XSS Protection**: Integrated **DOMPurify** and a custom `sanitizeInput` utility to scrub all user inputs and AI outputs.
- **Rate Limiting**: Custom client-side rate limiter prevents API abuse (max 10 messages/min).
- **Hardened Nginx**: Custom `nginx.conf` with **HSTS**, **X-Frame-Options (DENY)**, **X-Content-Type-Options**, and a strict **Content Security Policy (CSP)**.
- **Input Validation**: Strict length enforcement (500 chars) and type checking on all forms.

### ⚡ Efficiency
- **Gzip Compression**: Enabled in Nginx to reduce payload sizes for faster mobile loading.
- **Asset Caching**: Static assets (fonts, icons, JS) are cached with `public, immutable` headers for 6 months.
- **Zero-Flicker States**: Optimized Framer Motion animations and React memoization prevent unnecessary re-renders.

### 🧪 Testing
- **High Coverage**: 31 comprehensive tests using **Vitest** and **React Testing Library**.
- **Breadth**: Tests cover UI components (`Navbar`, `StepCard`), complex pages (`Home`, `Simulation`), security utilities, and error boundaries.
- **Environment**: Robust test setup including JSDOM mocks for `IntersectionObserver`, `scrollIntoView`, and `Firebase`.

### ♿ Accessibility (A11y)
- **Semantic HTML**: Proper use of `<main>`, `<header>`, `<article>`, and `<nav>` landmarks.
- **Keyboard Nav**: "Skip to Main Content" link, full tab-index management, and `Enter` key support for all interactive cards.
- **ARIA Standards**: Implementation of `aria-live` for chat updates, `role="alert"` for errors, and descriptive `aria-labels` for icon-only buttons.
- **Color Contrast**: Designed with high-contrast ratios for both Light and Dark modes.

### ☁️ Google Services
- **Google Cloud Run**: Highly efficient containerized deployment.
- **Google Gemini AI**: Direct SDK integration for the interactive chat assistant.
- **Firebase Firestore**: Active read/write operations for the live **Leaderboard**, **Quiz Results**, and **Chat Logs**.
- **Firebase Analytics**: Systematic event tracking (`logPageView`, `logCustomEvent`) to monitor user journey and feature adoption.

---

**Built with ❤️ for Democratic Empowerment.**
**Developer**: Anindya Mukhopadhyay
**GitHub**: [anindya-mukhopadhyay](https://github.com/anindya-mukhopadhyay)
