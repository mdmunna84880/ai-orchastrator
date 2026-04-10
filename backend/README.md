# 🔧 Document Orchestrator AI - Backend

> Node.js/Express microservice handling PDF ingestion, AI-powered data extraction via Google Gemini, and n8n workflow automation.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-%238E75B2.svg?style=for-the-badge&logo=google&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-%23FF6E6E.svg?style=for-the-badge&logo=n8n&logoColor=white)

## 📋 Table of Contents
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Data Flow](#-data-flow)
- [Error Handling](#-error-handling)

---

## 💡 Overview

The backend service acts as the core processing engine for the Document Orchestrator AI application. It receives PDF documents from the frontend, extracts raw text using `pdf-parse`, leverages Google's Gemini AI to structure the extracted data into clean JSON, and optionally triggers n8n automation workflows for email dispatch and stakeholder notifications.

**Key Responsibilities:**
- PDF text extraction and parsing
- AI-powered structured data extraction
- RESTful API for frontend communication
- n8n webhook integration for workflow automation

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** (ES Modules) | Runtime environment |
| **Express.js v5** | HTTP routing and middleware |
| **Multer** | In-memory file upload handling |
| **PDF-Parse** | Raw text extraction from PDFs |
| **@google/genai** | Gemini AI integration for structured extraction |
| **Axios** | HTTP client for n8n webhook calls |
| **CORS** | Cross-origin request handling |
| **Dotenv** | Environment variable management |

---

## 🔌 API Endpoints

### Health Check
```
GET /
```
**Response:** `"Backend is running."`

---

### Upload & Extract
```
POST /api/upload
```
**Content-Type:** `multipart/form-data`

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | ✅ | PDF or text document to process |
| `question` | String | ✅ | Question/context for data extraction |

**Success Response (200):**
```json
{
  "success": true,
  "extractedText": "...",
  "extractedData": {
    "key_points": [
      { "field": "Invoice Number", "value": "INV-001" },
      { "field": "Amount", "value": "$500.00" }
    ]
  }
}
```

**Error Responses:**
- `400` - No file provided
- `500` - Processing or extraction failed

---

### Trigger Automation
```
POST /api/automate
```
**Content-Type:** `application/json`

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | String | ✅ | Original extracted text |
| `question` | String | ✅ | Original extraction question |
| `extractedData` | Object | ✅ | Structured data from Gemini |
| `email` | String | ✅ | Target email for n8n workflow |

**Success Response (200):**
```json
{
  "success": true,
  "finalAnswer": "...",
  "emailBody": "...",
  "status": "success"
}
```

**Error Responses:**
- `400` - Email not provided
- `500` - n8n webhook call failed

---

## 📂 Project Structure

```
backend/
├── routes/
│   └── index.js          # Main route handlers (upload + automate)
├── utils/
│   ├── gemini.js         # Gemini AI integration logic
│   └── cleanJSON.js      # JSON sanitization utility
├── server.js             # Express app entry point
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables (not committed)
└── .gitignore            # Git ignore rules
```

### File Responsibilities

| File | Purpose |
|------|---------|
| `server.js` | Express app setup, middleware configuration, route mounting |
| `routes/index.js` | Upload handler with Multer, PDF parsing, Gemini integration, n8n automation trigger |
| `utils/gemini.js` | Gemini API client with structured extraction prompt |
| `utils/cleanJSON.js` | Extracts valid JSON from LLM responses, handles formatting edge cases |

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000

# Google AI Studio API Key
GEMINI_API_KEY=your_gemini_api_key_here

# n8n Webhook URL (for automation workflow)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
```

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | ❌ | Server port (defaults to `5000`) |
| `GEMINI_API_KEY` | ✅ | Google AI Studio API key for Gemini access |
| `N8N_WEBHOOK_URL` | ✅ | n8n webhook endpoint for automation workflow |

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn**
- Google Gemini API key ([Get one here](https://aistudio.google.com/))
- Active n8n instance (for automation features)

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env file
   touch .env
   
   # Add your credentials (see Environment Variables section)
   ```

4. **Start the server:**
   ```bash
   # Development
   node --dns-result-order=ipv4first server.js
   
   # Note: The --dns-result-order=ipv4first flag prevents Node 18+ DNS resolution issues with Gemini API
   ```

   The server will start on `http://localhost:5000` (or your configured PORT).

### Adding to package.json Scripts (Optional)

For convenience, add this to your `package.json`:
```json
{
  "scripts": {
    "start": "node --dns-result-order=ipv4first server.js",
    "dev": "node --dns-result-order=ipv4first server.js"
  }
}
```

Then run:
```bash
npm start
```

---

## 🔄 Data Flow

```
┌─────────────────┐
│   Frontend UI   │
│  (React App)    │
└────────┬────────┘
         │
         │ POST /api/upload (FormData)
         ▼
┌─────────────────────────────────────┐
│   Multer (In-memory storage)        │
│   - Receives file buffer            │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   PDF-Parse                         │
│   - Extracts raw text from PDF      │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   Gemini AI (@google/genai)         │
│   - Structured data extraction      │
│   - Returns JSON key-value pairs    │
└────────┬────────────────────────────┘
         │
         │ JSON Response
         ▼
┌─────────────────────────────────────┐
│   Frontend (Verification UI)        │
└────────┬────────────────────────────┘
         │
         │ POST /api/automate (JSON)
         ▼
┌─────────────────────────────────────┐
│   n8n Webhook (Axios)               │
│   - Forwards payload to n8n         │
│   - Triggers email/workflow logic   │
└────────┬────────────────────────────┘
         │
         │ Success Response
         ▼
┌─────────────────────────────────────┐
│   Frontend (Success Receipt)        │
└─────────────────────────────────────┘
```

---

## ⚠️ Error Handling

The backend implements consistent error handling across all endpoints:

### Standard Response Format
```json
{
  "success": true/false,
  "extractedText": "...",      // Only on upload success
  "extractedData": {},          // Only on upload success
  "finalAnswer": "...",         // Only on automation success
  "emailBody": "...",           // Only on automation success
  "status": "...",              // Only on automation success
  "error": "Error message"      // Only on failure
}
```

### Common Error Scenarios

| Scenario | Status Code | Cause |
|----------|-------------|-------|
| No file uploaded | `400` | Missing file in multipart request |
| Missing email | `400` | Email field not provided in automation request |
| PDF parsing failed | `500` | Corrupted or unsupported file format |
| Gemini API error | `500` | Invalid API key, rate limit, or timeout |
| n8n webhook failed | `500` | n8n instance unreachable or webhook error |

### Logging
All errors are logged server-side with `console.error()` for debugging. Production deployments should integrate with a proper logging service (e.g., Winston, Sentry).

---

## 🔮 Future Enhancements

- [ ] Add request validation middleware (Joi/Zod)
- [ ] Implement rate limiting for API protection
- [ ] Add file type validation (PDF only, size limits)
- [ ] Database integration for extraction history (MongoDB/PostgreSQL)
- [ ] File storage solution (AWS S3, Cloudinary)
- [ ] Authentication/Authorization (JWT)
- [ ] Structured logging with Winston
- [ ] Unit and integration tests
- [ ] OpenAPI/Swagger documentation
- [ ] Docker containerization


## 👨‍💻 Author

**Md Munna**
