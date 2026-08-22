# 🎯 InterviewIQ

<div align="center">

### Practice smarter. Prepare with purpose. Interview with confidence.

**An AI-powered interview preparation platform that helps candidates practice realistic interviews, receive personalized feedback, and improve with every session.**

</div>

---

## 🚀 About

**InterviewIQ** is a full-stack AI-powered interview preparation platform built to make interview practice more structured and personalized.

Users can choose a target company and role, create AI-powered interviews, answer questions, receive feedback and scores, manage their profile and resume, and connect with other candidates through the community.

> **Less guessing. More preparation. Better interviews.**

---

## ✨ Features

### 🤖 AI Interviews

- Select a **company** and **target role**
- Choose **Technical, Behavioral, or Mixed** interviews
- Select **Easy, Medium, or Hard** difficulty
- Generate AI-powered interview questions
- Receive question-wise scores and feedback
- Get an overall interview score and final feedback
- Track completed interview history

### 📄 Resume Support

- Upload PDF resumes
- PDF validation and text extraction
- Cloud-based resume storage
- Resume data stored in MongoDB

### 👤 Profile & Personalization

- Manage education, skills, and career goals
- Set target company and role
- Choose from custom InterviewIQ avatars
- Avatar integration across the profile and community

### 🌍 Community

- Create and share posts
- Like helpful posts
- Add comments and join discussions
- Share interview experiences with other candidates

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, React Router, Tailwind CSS, Axios, Lucide React

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer

**AI & Cloud:** Google Gemini, Cloudinary, MongoDB Atlas

---

## 🧱 Architecture

```text
User
  │
  ▼
React + Vite Frontend
  │
  │ REST API
  ▼
Express.js Backend
  ├── MongoDB Atlas
  ├── Google Gemini AI
  └── Cloudinary
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aadarshyadav7439/InterviewIQ.git
cd InterviewIQ
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

The application will typically be available at:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend

| Variable | Description |
|---|---|
| `PORT` | Express server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT authentication secret |
| `GEMINI_API_KEY` | Google Gemini API key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

> ⚠️ Never commit `.env` files or expose API keys publicly.

---

## 📁 Project Structure

```text
InterviewIQ/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🌱 Future Improvements

- Advanced performance analytics
- Improved AI voice interview experience
- AI-powered resume scoring
- Real-time notifications
- More company-specific preparation features

---

## 👨‍💻 Author

**Aadarsh Yadav**  
Computer Science Engineering Student

---

<div align="center">

### 🎯 Prepare with purpose. Practice with AI. Perform with confidence.

**Built with ❤️ using React, Node.js, Express, MongoDB, and AI**

</div>