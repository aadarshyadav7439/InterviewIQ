# 🎯 InterviewIQ

<div align="center">

### Practice smarter. Prepare with purpose. Interview with confidence.

**An AI-powered interview preparation platform designed to help candidates practice, improve, and perform better.**

</div>

---

## 🧠 What is InterviewIQ?

InterviewIQ is a full-stack AI-powered interview preparation platform built for candidates who want a more structured way to prepare for interviews.

Instead of jumping between random interview questions, notes, and websites, InterviewIQ brings the preparation journey into one workspace.

Choose a target company and role, practice realistic AI-generated interviews, receive personalized feedback, review your performance, manage your profile, upload your resume, and connect with other candidates through the community.

> **Less guessing. More preparation. Better interviews.**

---

# ✨ Features

## 🤖 AI-Powered Interviews

Create personalized interview sessions based on your preparation requirements.

- 🎯 Select a target company
- 💼 Choose your target role
- 🧩 Choose the interview type:
  - Technical
  - Behavioral
  - Mixed
- 📊 Select a difficulty level:
  - Easy
  - Medium
  - Hard
- ❓ Generate AI-powered interview questions
- 💬 Submit answers during the interview
- 🧠 Receive AI-generated evaluation and feedback
- 🏆 Get question-wise scores
- 📈 Receive an overall interview score and feedback

---

## 🏢 Company Preparation

Prepare for companies you are actually targeting.

```text
Choose Company
      +
Choose Role
      ↓
Start Interview
      ↓
Practice & Improve
```

InterviewIQ passes the selected company and role directly into the interview preparation flow.

---

## 📄 Resume Management

Upload your resume and keep it connected to your interview preparation journey.

- 📤 PDF resume upload
- 🔒 PDF file validation
- 📄 Resume text extraction
- ☁️ Cloud-based file storage
- 🍃 Resume metadata stored in MongoDB

```text
Your Resume
     ↓
PDF Upload
     ↓
Validation
     ↓
Text Extraction
     ↓
Cloud Storage
     ↓
Ready for Preparation
```

---

## 📊 Performance & Feedback

Every interview gives you actionable feedback.

Track:

- Individual question scores
- Question-wise feedback
- Overall interview score
- Final interview feedback
- Completed interview history
- Areas for improvement

Because preparation should continue even after the interview session ends.

---

## 👤 Personal Profile

Make your InterviewIQ workspace your own.

Manage:

- Name
- Education
- College
- Degree
- Branch
- Graduation year
- Skills
- Target company
- Target role

### 🎨 Custom Avatars

Users can select from custom InterviewIQ avatars.

Your selected avatar appears across the platform, including:

- Profile
- Navigation
- Community posts
- Community comments

---

## 🌍 Community

Interview preparation is better when people share what they learn.

The InterviewIQ Community allows users to:

- 📝 Create posts
- 💡 Share interview experiences
- ❓ Ask preparation-related questions
- ❤️ Like helpful posts
- 💬 Add comments
- 👥 Learn from other candidates

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| ⚛️ React | User Interface |
| ⚡ Vite | Frontend Tooling |
| 🧭 React Router | Client-Side Routing |
| 🎨 Tailwind CSS | Styling |
| 🔗 Axios | API Communication |
| ✨ Lucide React | Icons |

## Backend

| Technology | Purpose |
|---|---|
| 🟢 Node.js | JavaScript Runtime |
| 🚂 Express.js | REST API |
| 🍃 MongoDB | Database |
| 🔷 Mongoose | Database Modeling |
| 🔐 JWT | Authentication |
| 📁 Multer | File Upload Handling |

## AI & Cloud Services

| Service | Purpose |
|---|---|
| 🧠 Google Gemini | AI Question Generation & Evaluation |
| ☁️ Cloudinary | Resume Storage |
| 🍃 MongoDB Atlas | Cloud Database |

---

# 🧱 Architecture

```text
                    ┌─────────────────┐
                    │      USER       │
                    └────────┬────────┘
                             │
                             ▼
              ┌──────────────────────────┐
              │      INTERVIEWIQ UI      │
              │                          │
              │ React + Vite + Tailwind  │
              └────────────┬─────────────┘
                           │
                        REST API
                           │
                           ▼
              ┌──────────────────────────┐
              │     EXPRESS BACKEND      │
              │                          │
              │  Auth • Profile          │
              │  Interviews • Resume     │
              │  Companies • Community   │
              │  AI Services             │
              └───────┬────────┬─────────┘
                      │        │
                      ▼        ▼
             ┌─────────────┐  ┌──────────────┐
             │   MongoDB   │  │  Gemini AI   │
             │    Atlas    │  │              │
             └─────────────┘  └──────────────┘
                      │
                      ▼
               ┌─────────────┐
               │ Cloudinary  │
               └─────────────┘
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/InterviewIQ.git
cd InterviewIQ
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

---

## 3️⃣ Configure Backend Environment Variables

Create:

```text
server/.env
```

Add:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ Never commit your `.env` file or expose API keys publicly.

---

## 4️⃣ Start the Backend

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The backend will run on:

```text
http://localhost:8000
```

---

## 5️⃣ Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

---

## 6️⃣ Configure Frontend Environment Variables

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 7️⃣ Start InterviewIQ

```bash
npm run dev
```

The application will typically be available at:

```text
http://localhost:5173
```

🎉 **InterviewIQ is ready to use.**

---

# 🔐 Environment Variables

## Backend

| Variable | Description |
|---|---|
| `PORT` | Port used by the Express server |
| `MONGODB_URI` | MongoDB database connection string |
| `JWT_SECRET` | Secret used for JWT authentication |
| `GEMINI_API_KEY` | Google Gemini API key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

## Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

---

# 🗺️ Application Flow

```text
┌───────────────┐
│   Sign Up     │
│    / Login    │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│   Dashboard   │
└───────┬───────┘
        │
        ├───────────────────┐
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│    Profile    │   │    Resume     │
└───────────────┘   └───────────────┘
        │
        ▼
┌───────────────────────┐
│ Choose Company + Role │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Create AI Interview   │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ AI Generates Questions│
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Answer Questions      │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ AI Evaluation         │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Scores + Feedback     │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Improve & Repeat      │
└───────────────────────┘
```

---

# 📁 Project Structure

```text
InterviewIQ/
│
├── client/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── avatars/
│   │   │
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🌟 Future Improvements

InterviewIQ is currently built as an MVP. Potential future improvements include:

- 📊 Advanced analytics and performance tracking
- 🎙️ More advanced voice interview experiences
- 📄 AI-powered resume scoring
- 🔔 Notifications
- 💬 Real-time community features
- 🏢 More detailed company-specific preparation
- 📈 Long-term progress visualization
- 🤝 Interview preparation matching and collaboration

---

# 👨‍💻 Author

**Aadarsh Yadav**

Computer Science Engineering Student

---

<div align="center">

## 🎯 Prepare with purpose. Practice with AI. Perform with confidence.

**Built with ❤️ using React, Node.js, Express, MongoDB, and AI**

⭐ If you found this project interesting, consider giving it a star!

</div>