# AI StudyHub - Production-Ready AI Study Planner

AI StudyHub is a modern, full-stack web application designed to optimize student productivity using AI-driven scheduling, Spaced Repetition, and gamification.

## 🚀 Features

- **Smart Personalization**: Adaptive schedules based on progress.
- **AI Assistant**: Rule-based chatbot for study advice and task prioritization.
- **Focus Mode**: Customizable Pomodoro timer with session tracking.
- **Spaced Repetition**: Intelligent rescheduling of tasks to maximize retention.
- **Performance Analytics**: Visual data on subject performance and study hours.
- **Gamification**: Stay motivated with streaks, points, and achievements.
- **Modern UI**: Clean, glassmorphic design with Dark/Light mode support.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons, Recharts.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JWT-based secure auth.

## 📦 Setup & Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or via Atlas)

### 1. Install Dependencies
Run the following command in the root directory:
```bash
npm run install-all
```

### 2. Configure Environment
Update the `.env` file in the `server/` directory if needed:
- `MONGODB_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret key for authentication.

### 3. Run the Application
Start both the client and server concurrently:
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📂 Folder Structure
```text
/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route pages (Dashboard, AI, etc.)
│   │   ├── context/    # Auth and State management
│   │   └── services/   # API communication
├── server/           # Node.js Express backend
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   └── middleware/   # Auth middleware
└── package.json      # Root project management
```

## 🚀 Deployment

For a detailed walkthrough on how to host this application on **Vercel** and **Render**, please see the [deployment_guide.md](deployment_guide.md) file in the root directory.

### Quick Links:
- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Render](https://render.com/)

---

## 📝 Usage Tips
- **AI Chat**: Try asking "What should I study now?" or "How is my progress?"
- **Focus Mode**: Click the large play button to start a session.
- **Goals**: Break down your semester into smaller actionable goals for better progress tracking.
