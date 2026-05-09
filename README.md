# LeadFlow - Mini CRM 🚀

A modern, lightweight Customer Relationship Management (CRM) application built with the MERN stack. It is designed to help teams capture, manage, and convert leads efficiently with a beautiful, highly responsive user interface.

## 🌍 Live Demo
**Frontend (Vercel)**: https://vinod-kappa.vercel.app  
**Backend API (Render)**: https://vinod-qkv5.onrender.com

## 🛠️ Tech Stack

**Frontend (/client)**
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4, Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router v7
- **Analytics**: Recharts
- **Notifications**: React Hot Toast

**Backend (/server)**
- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Security**: Helmet, Express Rate Limit

## 📁 Project Structure
```text
Task-2/
├── client/                 # React frontend application
│   ├── src/                # Components, pages, context, and services
│   ├── .env                # Frontend environment variables
│   └── vercel.json         # Vercel deployment & proxy rules
├── server/                 # Express backend API
│   ├── controllers/        # Route controllers (Auth, Leads)
│   ├── models/             # Mongoose database schemas
│   ├── routes/             # Express API routes
│   ├── middleware/         # Auth and error handling middlewares
│   └── .env                # Backend environment variables
└── README.md
```

## 🚀 Features
- **Role-Based Access Control (RBAC)**: Distinct experiences for Public visitors, Standard Users, and Administrators.
- **Dynamic Dashboard**: Real-time analytics, including interactive area and pie charts powered by `Recharts`.
- **Lead Management**: Comprehensive lead tracking, status updates (New, Contacted, Converted), and internal follow-up notes.
- **Integrated Communication**: "Save & Email User" feature instantly saves notes and opens the native email client pre-filled with the prospect's details.
- **Modern UI/UX**: Glassmorphism design, responsive layouts, and seamless scroll/hover animations using Framer Motion.

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas Cluster)

### 1. Install Dependencies
Navigate to the backend and frontend directories to install their respective dependencies:

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run the Application
Start the Backend Server (from the `/server` directory):
```bash
npm run dev
```
Start the Frontend Client (from the `/client` directory):
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## 👤 Author
**Vinod Kumar Banothu**

- **GitHub**: https://github.com/banothuvinodkumar
- **LinkedIn**: https://www.linkedin.com/in/vinod-kumar-banothu-559a14325
- **Email**: itsvinodkumarcse@gmail.com