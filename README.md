# 🔗 Linkora — Full-Stack URL Shortener

A production-deployed URL shortening application built with **React, TypeScript, Node.js, Express, and MongoDB**.

Linkora converts long URLs into clean, shareable short links, redirects users to the original destination, and tracks link clicks through a simple dashboard.

## 🚀 Live Application

| Resource | Link |
| --- | --- |
| 🌐 Live Application | https://node-url-shortener-xi.vercel.app |
| ⚙️ REST API | https://node-url-shortener-api.onrender.com |
| 📚 Swagger API Docs | https://node-url-shortener-api.onrender.com/api-docs |
| 💚 API Health Check | https://node-url-shortener-api.onrender.com/api/v1/health |

> The backend is hosted separately from the frontend, so the first API request may take longer if the hosting service has been idle.

---

## ✨ Features

- 🔗 Create short URLs from long links
- ⚡ Redirect short links to their original URLs
- 📊 Track the number of link clicks
- 📋 View created links in a dashboard
- 📋 Copy generated short links
- 🗑️ Delete existing links
- ✅ URL input validation
- 🚦 API rate limiting
- 🛡️ Security headers using Helmet
- 🌍 Production CORS configuration
- ⚠️ Centralized API error handling
- 📝 Structured application logging
- 📚 Swagger / OpenAPI documentation
- 📱 Responsive React interface
- ☁️ Cloud database with MongoDB Atlas

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios
- TanStack Query
- React Hook Form
- Zod
- Lucide React

### Backend

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Zod
- Pino
- Helmet
- CORS
- Express Rate Limit

### Development & Deployment

- Git
- GitHub
- Swagger / OpenAPI
- MongoDB Atlas
- Render
- Vercel

---

## 🏗️ Architecture

```text
                         USER
                           │
                           ▼
              ┌────────────────────────┐
              │   React + TypeScript   │
              │        Vercel          │
              └───────────┬────────────┘
                          │
                          │ HTTPS / REST API
                          ▼
              ┌────────────────────────┐
              │ Node.js + Express API  │
              │         Render         │
              └───────────┬────────────┘
                          │
                          │ Mongoose
                          ▼
              ┌────────────────────────┐
              │     MongoDB Atlas      │
              │    url_shortener DB    │
              └────────────────────────┘
```

---

## 🔄 How It Works

```text
Long URL
   │
   ▼
POST /api/v1/urls
   │
   ▼
Validate URL
   │
   ▼
Generate unique short code
   │
   ▼
Store URL in MongoDB
   │
   ▼
Return short URL
   │
   ▼
User opens /:shortCode
   │
   ├── Increment click count
   │
   └── Redirect to original URL
```

Example:

```text
Original URL
https://example.com/a/very/long/url

                    ↓

Short URL
https://node-url-shortener-api.onrender.com/abc123
```

---

## 📁 Project Structure

```text
node-url-shortener/
│
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── types/
│       ├── utils/
│       ├── App.tsx
│       └── main.tsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── docs/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   └── tests/
│
└── README.md
```

---

## 🔌 REST API

Base URL:

```text
https://node-url-shortener-api.onrender.com
```

### Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/health` | Check API health |
| `POST` | `/api/v1/urls` | Create a shortened URL |
| `GET` | `/api/v1/urls` | Retrieve created URLs |
| `GET` | `/api/v1/urls/:id` | Retrieve a URL by ID |
| `DELETE` | `/api/v1/urls/:id` | Delete a URL |
| `GET` | `/:shortCode` | Redirect to original URL |

Interactive Swagger documentation:

```text
https://node-url-shortener-api.onrender.com/api-docs
```

---

## 💻 Run Locally

### Prerequisites

Make sure you have:

- Node.js
- npm
- MongoDB
- Git

### 1. Clone the repository

```bash
git clone https://github.com/MihirStack/node-url-shortener.git

cd node-url-shortener
```

### 2. Backend setup

```bash
cd server
npm install
```

Create:

```text
server/.env
```

Use `server/.env.example` as the template.

Example:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/url_shortener
CLIENT_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:3000
```

### 3. Frontend setup

Open another terminal:

```bash
cd client
npm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Start React:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🌍 Production Deployment

The application is deployed using three cloud services:

```text
GitHub
   │
   ├── client/
   │      │
   │      └── Vercel
   │
   └── server/
          │
          └── Render
                 │
                 └── MongoDB Atlas
```

### Frontend

Deployed on **Vercel**.

### Backend

Deployed as a Node.js web service on **Render**.

### Database

Production data is stored in **MongoDB Atlas**.

Environment variables and database credentials are configured directly on the deployment platforms and are not committed to the repository.

---

## 🔐 Security

The application includes:

- Helmet security headers
- CORS origin restrictions
- API rate limiting
- Zod request validation
- Environment-based configuration
- Centralized error handling
- Secrets excluded from Git
- MongoDB authentication

> `.env` files and production credentials are intentionally excluded from source control.

---

## 📚 What I Practiced Building This Project

This project was built to practice an end-to-end production workflow, including:

- Designing a REST API
- Structuring a Node.js/Express application
- Separating controllers, services, repositories, and routes
- Building reusable React components and hooks
- Managing server state with TanStack Query
- Connecting React to REST APIs with Axios
- MongoDB persistence with Mongoose
- Environment configuration
- API documentation with Swagger
- Git branching and source control
- Deploying frontend and backend independently
- Connecting a production frontend, API, and cloud database

---

## 🗺️ Future Improvements

Potential improvements include:

- Custom aliases
- URL expiration
- QR-code generation
- Authentication and user-specific links
- Advanced analytics
- Automated API tests
- Docker support
- CI/CD pipeline
- Custom domains

---

## 👨‍💻 Author

**Mihir Borsaniya**  
Full-Stack Developer

- 🌐 Portfolio: https://mihirborsaniya.vercel.app
- 💻 GitHub: https://github.com/MihirStack

---

If you find this project useful, consider giving the repository a ⭐.

---

If you find this project useful, consider giving the repository a ⭐.
