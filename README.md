# Triagent

> AI-Powered Executive Assistant for Email & Calendar Management

Triagent is an AI-powered productivity platform that combines Gmail, Google Calendar, and intelligent automation into a single workspace. Users can manage emails, schedule meetings, generate daily briefs, and execute productivity workflows using natural language.

Built for modern professionals who want to spend less time managing tools and more time getting work done.

---

## 📸 Screenshots

### Landing

<img width="1902" height="911" alt="Screenshot 2026-06-18 222031" src="https://github.com/user-attachments/assets/51b8eec0-cfc0-4a7a-9060-58621141e16b" />

### Dashboard

<img width="1900" height="908" alt="Screenshot 2026-06-18 220138" src="https://github.com/user-attachments/assets/a92a9eb9-d668-48d0-8527-ee37e26306f3" />

### Inbox

<img width="1901" height="906" alt="Screenshot 2026-06-18 220304" src="https://github.com/user-attachments/assets/dd7598d6-6273-4ce5-b63c-3b96adebc778" />

### Calendar

<img width="1896" height="906" alt="Screenshot 2026-06-18 220329" src="https://github.com/user-attachments/assets/3fc511f1-d08a-46eb-9a06-0674cb26f57c" />

### Assistant

<img width="1901" height="906" alt="Screenshot 2026-06-18 221742" src="https://github.com/user-attachments/assets/877b55ef-fc61-46a6-8c90-d8cfb3f539c3" />

---

## ✨ Features

### 🤖 AI Executive Assistant

Interact with your workspace using natural language.

* Generate daily productivity briefs
* Review and prioritize inbox emails
* Summarize upcoming meetings
* Receive focus recommendations
* Execute actions directly from chat

### 📧 Gmail Integration

Connect Gmail and manage emails seamlessly.

* Read inbox emails
* Analyze email activity
* Send emails through AI commands
* Compose and send emails manually from the Inbox page

### 📅 Google Calendar Integration

Manage meetings and events directly from Triagent.

* View calendar events
* Summarize upcoming meetings
* Create calendar events using AI
* Send calendar invitations
* Schedule meetings through natural language

### ⚡ Action-Oriented AI Workflows

Triagent doesn't just answer questions—it performs actions.

Examples:

* Generate my daily brief
* Review my inbox and identify priority emails
* What should I focus on today?
* Schedule a meeting tomorrow from 3 PM to 4 PM
* Send an email to [john@example.com](mailto:john@example.com)

### 📊 Dashboard Analytics

A centralized command center that provides:

* Email statistics
* Unread email counts
* Upcoming meetings
* Connected integrations
* AI shortcuts for common workflows

### 🔗 OAuth Integrations

Securely connect external services.

Currently supported:

* Gmail
* Google Calendar

### ⚙️ Settings & Account Management

* Better Auth authentication
* User profile management
* Integration management

---

## 🏗️ Architecture

```text
User
  │
  ▼
Frontend (Next.js)
  │
  ▼
Backend API (Express.js)
  │
  ▼
AI Agent Layer
(OpenAI Agents SDK + Corsair MCP)
  │
  ├── Gmail
  └── Google Calendar
```

The AI assistant acts as an orchestration layer capable of reading information, reasoning about tasks, and executing real-world actions through connected services.

---

## 🛠️ Tech Stack

### Frontend

* React
* Next.js
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* Drizzle ORM

### Authentication

* Better Auth

### AI & Integrations

* OpenAI Agents SDK
* GPT-4.1 Mini
* Corsair MCP
* Gmail API
* Google Calendar API

### Package Management

* pnpm
* Monorepo Workspace

---

## 📂 Project Structure

```text
.
├── backend
├── docs
├── frontend
├── packages
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

### Backend

Contains:

* API routes
* Controllers
* Services
* OAuth handlers
* AI agent configuration
* Gmail & Calendar integrations

### Frontend

Contains:

* Dashboard
* Inbox
* Calendar
* Assistant
* Connect
* Settings
* Authentication flows

### Packages

Shared workspace packages used across applications.

---

## 🚀 Getting Started

### Prerequisites

* Node.js 20+
* pnpm
* PostgreSQL
* Google OAuth credentials
* OpenAI API key
* Corsair account

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/triagent.git
cd triagent
```

Install dependencies:

```bash
pnpm install
```

### Environment Variables

Create environment files for both frontend and backend.

Example:

```env
DATABASE_URL=

OPENAI_API_KEY=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

CORSAIR_API_KEY=
```

### Run Development Servers

```bash
pnpm dev
```

---

## 🤖 Example Prompts

Generate a daily brief:

```text
Generate my daily brief
```

Review inbox:

```text
Review my inbox and identify priority emails
```

Focus recommendations:

```text
What should I focus on today?
```

Create a meeting:

```text
Create a calendar event tomorrow from 3 PM to 4 PM called Demo Meeting
```

Send an email:

```text
Send an email to john@example.com with subject "Hello" and body "Nice to meet you"
```

---

## 🔮 Future Improvements

* Streaming AI responses
* Multi-provider email support
* Meeting rescheduling workflows
* AI-generated email drafts
* Advanced productivity analytics
* Mobile application
* Team collaboration features

---

## 🎯 Why Triagent?

Most productivity tools require users to switch between email, calendars, and task management systems.

Triagent brings everything together through a single AI-powered interface that can understand requests, retrieve information, and perform actions on behalf of the user.

Instead of navigating multiple tools, users simply describe what they want to accomplish.

---

## 📄 License

This project was built as part of a hackathon and is currently under active development.
