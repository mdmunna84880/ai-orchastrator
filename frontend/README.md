# 🎨 Document Orchestrator AI - Frontend

> Modern React-based dashboard for AI-powered document processing and workflow automation.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📋 Table of Contents
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Component Architecture](#-component-architecture)
- [Environment Configuration](#-environment-configuration)
- [Getting Started](#-getting-started)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Styling & UX](#-styling--ux)
- [Build & Deployment](#-build--deployment)

---

## 💡 Overview

The frontend is a high-performance, single-page application (SPA) built with React and Vite. It provides an intuitive, modern interface for uploading documents, viewing AI-extracted data, and triggering n8n automation workflows.

**Key Responsibilities:**
- Document upload with drag-and-drop UX
- Human-in-the-loop data verification
- Workflow automation configuration
- Real-time feedback via toast notifications
- Success confirmation and receipt display

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.x | UI component library |
| **Vite** | 8.x | Build tool and dev server |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Axios** | 1.x | HTTP client for API calls |
| **React-Toastify** | 11.x | Promise-based notification system |
| **React-Icons** | 5.x | Icon library (Heroicons) |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting and quality enforcement |
| **@vitejs/plugin-react** | React Fast Refresh and Babel integration |

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── FileUpload.jsx       # Drag-and-drop file upload zone
│   │   ├── DataTable.jsx        # Structured data preview table
│   │   ├── AutomationPanel.jsx  # Email and prompt configuration
│   │   └── SuccessCard.jsx      # Workflow success receipt
│   ├── config/              # Configuration files
│   │   └── api.js               # Axios instance for backend communication
│   ├── pages/               # Page-level components
│   │   └── dashboard.jsx        # Main orchestrator view
│   ├── assets/              # Static assets (images, fonts)
│   ├── App.jsx              # Root application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles and Tailwind imports
├── public/                # Static public assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
├── package.json           # Dependencies and scripts
└── .env                   # Environment variables (not committed)
```

---

## 🧩 Component Architecture

### Component Hierarchy

```
App.jsx
└── Dashboard.jsx (pages)
    ├── FileUpload.jsx
    ├── AutomationPanel.jsx
    ├── DataTable.jsx
    └── SuccessCard.jsx
```

### Component Specifications

#### `Dashboard.jsx` (Page Component)
**Responsibility:** Main orchestrator that manages application state and coordinates component interactions.

**Props:** None (root-level component)

**State Managed:**
| State | Type | Default | Description |
|-------|------|---------|-------------|
| `file` | File | `null` | Uploaded document |
| `loading` | Boolean | `false` | Extraction loading state |
| `isAutomating` | Boolean | `false` | Automation workflow loading state |
| `extractedData` | Array | `null` | Extracted key-value pairs from Gemini |
| `n8nResult` | Object | `null` | Response from n8n automation |
| `email` | String | `"mdmunnatbm@gmail.com"` | Target email for automation |
| `question` | String | `"Summarize this document..."` | AI extraction prompt |

**Methods:**
- `handleExtract()` - Uploads file and triggers Gemini extraction
- `handleAutomate()` - Formats data and triggers n8n workflow

---

#### `FileUpload.jsx`
**Responsibility:** Provides drag-and-drop file selection interface.

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `file` | File | ✅ | Currently selected file |
| `setFile` | Function | ✅ | File state setter |

**Features:**
- Click-to-upload and drag-and-drop support
- Dynamic styling based on file presence
- Accepts PDF and text files
- File name display after selection

---

#### `DataTable.jsx`
**Responsibility:** Displays extracted structured data in a clean, readable format.

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | Array | ✅ | Array of `{ field, value }` objects |

**Features:**
- Field name formatting (removes underscores)
- Boolean value handling (Yes/No)
- Empty state fallback
- Responsive layout (stacked on mobile)

---

#### `AutomationPanel.jsx`
**Responsibility:** Provides input fields for email and AI prompt configuration.

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `email` | String | ✅ | Target email address |
| `setEmail` | Function | ✅ | Email state setter |
| `question` | String | ✅ | AI extraction prompt |
| `setQuestion` | Function | ✅ | Question state setter |
| `onAutomate` | Function | ✅ | Automation trigger handler |
| `isAutomating` | Boolean | ✅ | Loading state for workflow |

**Features:**
- Email input with validation
- Multi-line prompt editor
- Disabled state during automation
- Animated entry on mount

---

#### `SuccessCard.jsx`
**Responsibility:** Displays workflow completion receipt.

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `result` | Object | ✅ | n8n response data |

**Features:**
- Conditional rendering (only shows after automation)
- Delivery status badge
- AI summary display
- Animated entry on mount

---

## 🔐 Environment Configuration

Create a `.env` file in the `frontend/` directory:

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:5000/api
```

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_BACKEND_URL` | ✅ | Base URL for backend API endpoints (must include `/api` prefix) |

**Note:** Vite exposes environment variables prefixed with `VITE_` to the client via `import.meta.env`.

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn**
- Backend service running on configured port

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env file
   touch .env
   
   # Add backend URL
   echo "VITE_BACKEND_URL=http://localhost:5000/api" > .env
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` (or next available port).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build for production (optimized bundle) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🔄 State Management

The application uses React's built-in `useState` hook for state management, following a **lifted state pattern** where the `Dashboard` component owns the shared state and passes it down to child components via props.

### State Flow Diagram

```
┌─────────────────────────────────────┐
│   Dashboard.jsx                     │
│   - Owns: file, data, loading, etc  │
│   - Methods: handleExtract,         │
│              handleAutomate         │
└───────┬─────────────────┬───────────┘
        │                 │
        │ Props           │ Props
        ▼                 ▼
┌───────────────┐  ┌──────────────────┐
│ FileUpload    │  │ AutomationPanel  │
│ - file        │  │ - email          │
│ - setFile     │  │ - setEmail       │
│               │  │ - question       │
│               │  │ - setQuestion    │
│               │  │ - onAutomate     │
└───────────────┘  └──────────────────┘
                          │
                          │ Props
                          ▼
                   ┌──────────────┐
                   │ DataTable    │
                   │ - data       │
                   └──────────────┘
                          │
                          │ Props
                          ▼
                   ┌──────────────┐
                   │ SuccessCard  │
                   │ - result     │
                   └──────────────┘
```

### Data Transformation

Before automation, the extracted data is transformed:

```javascript
// Input (from Gemini):
[
  { field: "total_amount", value: "$500.00" },
  { field: "invoice_number", value: "INV-001" }
]

// Output (to n8n):
{
  status: "Urgent",
  total_amount: 500.00,  // Parsed number
  invoice_number: "INV-001"
}
```

---

## 🌐 API Integration

### Configuration

The application uses a centralized Axios instance (`src/config/api.js`):

```javascript
import axios from 'axios';

export const backendAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
```

### API Calls

#### 1. Upload & Extract
```javascript
const formData = new FormData();
formData.append('file', file);

const { data } = await backendAPI.post('/upload', formData);
```

**Expected Response:**
```json
{
  "success": true,
  "extractedData": {
    "key_points": [
      { "field": "Invoice Number", "value": "INV-001" }
    ]
  }
}
```

#### 2. Trigger Automation
```javascript
const payload = {
  extractedData: formattedData,
  question: question,
  email: email
};

const { data } = await backendAPI.post('/automate', payload);
```

**Expected Response:**
```json
{
  "success": true,
  "finalAnswer": "...",
  "emailBody": "...",
  "status": "SENT"
}
```

### Error Handling

All API calls are wrapped in `toast.promise()` for consistent user feedback:

```javascript
await toast.promise(
  backendAPI.post('/upload', formData),
  {
    pending: 'Extracting data via Gemini AI...',
    success: 'Document analyzed successfully!',
    error: 'Extraction failed. Check server connection.'
  }
);
```

---

## 🎨 Styling & UX

### Tailwind CSS Configuration

The application uses **Tailwind CSS v4** with the Vite plugin for seamless integration:

```javascript
// vite.config.js
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

```css
/* index.css */
@import "tailwindcss";
```

### Design System

| Token | Value | Usage |
|-------|-------|-------|
| **Primary** | `indigo-600` | CTAs, accents, highlights |
| **Secondary** | `slate-900` | Primary text, headers |
| **Success** | `emerald-500` | Automation success states |
| **Background** | `slate-50` | Page background |
| **Surface** | `white` | Card backgrounds |

### UX Features

#### 1. Loading States
- Disabled buttons during async operations
- Spinner icons on loading (`animate-spin`)
- Skeleton-style placeholders

#### 2. Animations
- `animate-in` - Entry animations for components
- `fade-in` - Smooth opacity transitions
- `slide-in-from-bottom-4` - Slide-up entrance
- `slide-in-from-right-8` - Slide-in from right
- `duration-500` - 500ms animation duration

#### 3. Micro-interactions
- `hover:shadow-md` - Card hover effects
- `active:scale-[0.98]` - Button press feedback
- `transition-all` - Smooth state changes
- `cursor-not-allowed` - Disabled state indication

#### 4. Responsive Design
- `lg:grid-cols-12` - 12-column grid on large screens
- `sm:flex-row` - Horizontal layout on small screens+
- `max-w-7xl mx-auto` - Centered content container
- `px-4 sm:px-6` - Responsive padding

#### 5. Notification System

React-Toastify provides toast notifications positioned at `top-right`:

```javascript
<ToastContainer position="top-right" theme="light" />
```

---

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

**Output:** `dist/` directory with optimized, minified assets.

**Build Features:**
- Code splitting and lazy loading ready
- Tree-shaking for unused code
- Asset fingerprinting for caching
- Minified JavaScript and CSS

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing before deployment.

### Deployment Options

| Platform | Configuration |
|----------|---------------|
| **Vercel** | Auto-detects Vite, zero config needed |
| **Netlify** | Build command: `npm run build`, Publish: `dist/` |
| **GitHub Pages** | Use `vite-plugin-gh-pages` for deployment |
| **Docker** | Multi-stage build with Nginx for serving |

### Docker Example

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🔮 Future Enhancements

- [ ] Add React Router for multi-page navigation
- [ ] Implement global state management (Zustand/Redux)
- [ ] Add file drag-and-drop with visual feedback zone
- [ ] Implement file preview (PDF.js integration)
- [ ] Add extraction history with local storage
- [ ] Implement user authentication (Firebase/Auth0)
- [ ] Add dark mode toggle with Tailwind variants
- [ ] Implement optimistic UI updates
- [ ] Add unit tests (Vitest + React Testing Library)
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Implement proper error boundaries
- [ ] Add loading skeletons (react-loading-skeleton)
- [ ] Support batch document uploads

---

## 📝 License

ISC

## 👨‍💻 Author

**Md Munna**
