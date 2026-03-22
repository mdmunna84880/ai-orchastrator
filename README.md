# 🚀 Document Orchestrator AI

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-%23FF6E6E.svg?style=for-the-badge&logo=n8n&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-%238E75B2.svg?style=for-the-badge&logo=google&logoColor=white)

> An intelligent, full-stack Business Analyst Dashboard that bridges the gap between raw document ingestion and automated workflows.

![Dashboard Preview](https://via.placeholder.com/1200x600.png?text=📸+Replace+this+with+a+screenshot+of+your+beautiful+dashboard)

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [The Data Flow](#-the-data-flow)
- [Future Scope](#-future-scope)

---

## 💡 About the Project

This application allows users to upload PDF invoices, uses Google's Gemini AI to extract structured data, provides a modern UI for human verification, and automatically triggers an n8n webhook to dispatch context-aware email summaries to stakeholders. 

It was built to demonstrate **Human-in-the-Loop (HITL)** AI automation, ensuring data accuracy before executing business workflows.

---

## ✨ Key Features

Built in modular phases using a **Feature-Based Architecture**:

* **Intelligent Ingestion:** A premium drag-and-drop zone with instant file validation and async loading states.
* **Human Verification:** Extracted JSON is dynamically rendered into a clean, readable data grid for user confirmation before automation occurs.
* **Workflow Orchestration:** Direct integration with **n8n** via Node.js, allowing users to attach custom AI prompts and target email addresses to the payload.
* **Executive UI/UX:** Asynchronous operations are handled gracefully using `react-toastify` promises, culminating in a beautiful Success Receipt card confirming email delivery.

---

## 🛠️ Tech Stack

### Frontend
* **React (Vite)** - Blazing fast UI development
* **Tailwind CSS** - Utility-first styling & micro-animations
* **React-Toastify** - Stateful, promise-based notifications
* **React-Icons** - Clean iconography

### Backend (Microservice)
* **Node.js & Express** - REST API routing
* **Multer** - In-memory file buffer handling
* **PDF-Parse** - Raw text extraction from documents
* **Google GenAI SDK** - LLM-powered structured data extraction

### Automation
* **n8n** - Webhook ingestion, logic branching (IF nodes), and Gmail API integration.

---

## 📂 System Architecture

The frontend follows a strict, scalable component architecture ensuring separation of concerns:

```text
src/
├── components/          # Modular, single-responsibility UI pieces
│   ├── AutomationPanel.jsx
│   ├── DataTable.jsx
│   ├── FileUpload.jsx
│   └── SuccessCard.jsx
├── config/              # Centralized configurations
│   └── api.js           # Axios instance for backend routing
├── pages/               
│   └── Dashboard.jsx    # The main orchestrator view
├── App.jsx              # Application entry point
└── index.css            # Tailwind directives
```

---

## 🚦 Getting Started

### Prerequisites
Ensure you have the following installed/configured:
* Node.js (v18+)
* An active n8n instance (Cloud or Self-hosted)
* Google Gemini API Key

### Environment Variables
Create a `.env` file in your **backend** directory and add the following:

| Variable | Description |
| :--- | :--- |
| `PORT` | The port your backend runs on (e.g., `5000`) |
| `GEMINI_API_KEY` | Your Google AI Studio API Key |
| `N8N_WEBHOOK_URL` | The production webhook URL from your n8n workflow |

### Installation

**1. Backend Setup**
```bash
cd backend
npm install express multer pdf-parse axios @google/genai dotenv
node --dns-result-order=ipv4first server.js
```
*(Note: The `--dns-result-order=ipv4first` flag prevents Node 18+ fetch timeouts with the Gemini API).*

**2. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 The Data Flow

1. **Upload:** User drops a PDF into the React UI.
2. **Extract:** React posts the file (`FormData`) to `localhost:5000/api/upload`.
3. **Parse & Structure:** Node.js parses the PDF text, queries Gemini, and returns a strictly formatted JSON object.
4. **Verify:** React displays the data in the interactive `DataTable`.
5. **Trigger:** User clicks "Automate". React formats the data safely and hits `localhost:5000/api/automate`.
6. **Automate & Deliver:** Node.js forwards the payload to the **n8n Webhook**, which evaluates the logic and dispatches a Gmail alert.
7. **Confirm:** React receives the success response and smoothly renders the `SuccessCard` receipt.

---

## 🚀 Future Scope
* [ ] Implement secure user authentication (JWT/Firebase).
* [ ] Add a historical database (MongoDB/PostgreSQL) to log past extractions.
* [ ] Support for multiple document ingestion (Batch processing).

---

## 👨‍💻 Author
**Md Munna** 