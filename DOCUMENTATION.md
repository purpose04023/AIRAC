# ARIA: Autonomous Revenue Intelligence Agent

ARIA is an advanced autonomous agent designed to navigate freelance platforms (Upwork, Fiverr, Freelancer), discover high-value opportunities, and execute technical tasks using a built-in reasoning engine and workspace.

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18.x or higher
- **NPM/Bun/PNPM**: For package management
- **OpenAI API Key**: For the Cognitive Engine (GPT-4o/o1)

### Setup Instructions
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-repo/aria-agent.git
    cd aria-agent
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    npx playwright install
    ```
3.  **Configure Environment**:
    Create a `.env` file in the root directory:
    ```env
    OPENAI_API_KEY=your_key_here
    ```
4.  **Run in Development Mode**:
    ```bash
    npm run dev
    ```
5.  **Access the Dashboard**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Architecture Detail

- **Perception Layer (The "Eyes")**: Uses Playwright for high-fidelity DOM extraction (Antigravity style) and real-time screen captures.
- **Cognitive Engine (The "Brain")**: An orchestrator that manages the mission flow from scanning to delivery, using LLMs for decision making.
- **Execution Layer (The "Hands")**: A localized sandbox for code execution, dependency management, and automated verification.
- **Memory & Safety**: Human-in-the-loop triggers for high-stakes actions and persistent profile management.

---

## 🌐 Deployment Guide

To use ARIA effectively as an autonomous agent, you need a environment that supports long-running processes and browser automation.

### Option 1: Vercel (Frontend & Serverless) - *Best for UI only*
- **Pros**: Easy setup, great UI performance.
- **Cons**: Serverless functions have timeout limits, and running Playwright/Browsers is restricted.
- **Verdict**: Use this only for the Dashboard, but the "Brain" should live elsewhere.

### Option 2: Railway or Render (Recommended)
- **Pros**: Supports full Dockerized containers, easy Playwright setup, and persistent background processes.
- **Deployment Steps**:
  1. Link your GitHub repo to Railway.
  2. Add the `OPENAI_API_KEY` to variables.
  3. Ensure the `start` command runs `npm start`.
  4. Railway will automatically provision the browser environment.

### Option 3: VPS (DigitalOcean / AWS EC2) - *Maximum Autonomy*
- **Pros**: Complete control over IP addresses (crucial for platform logins), unlimited run-time.
- **Verdict**: Recommended for production-level ARIA instances. Use a proxy service to avoid being flagged by platform security.

---

## 🛠️ Usage Tips
- **Initial Login**: When you first "Wake Up" ARIA, monitor the "Action Required" cards. It will prompt you to log in to platforms manually to establish session cookies.
- **Missions**: Start with specific queries like "React Performance Audit" or "Python Web Scraper" to give ARIA a clear focus.
- **Verification**: Use the "Agent Mind" view to understand why ARIA is taking specific actions.

---

*Note: This is an experimental agent. Always monitor its activity and review its proposals before they are submitted.*
