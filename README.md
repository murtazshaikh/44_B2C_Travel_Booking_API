
# B2C Booking API

A secure, scalable, API-only backend for a B2C travel platform built using **Next.js**, **MongoDB**, **JWT**, and **OpenAI**.  
This backend powers features like user authentication, bookings, traveller profiles, and AI-generated summaries.

---

## ✈️ Features

- 🔐 User signup & login with **JWT-based auth**
- 👤 Authenticated **user profile** (GET/PUT)
- 🎫 Manage **bookings** (create, list by status)
- 🧍 Manage **travellers** (add, update, delete)
- 🧠 Generate **booking summaries using OpenAI**
- ✅ Fully tested with Postman

---

## 🛠 Tech Stack

- **Next.js API Routes** (No frontend)
- **MongoDB** (cloud)
- **JWT** for authentication
- **Bcrypt** for password hashing
- **OpenAI API v4** for AI summaries
- **Postman** for API testing

---

## 🚀 Getting Started

### 1. Clone the repo

```bash

git clone https://github.com/murtazshaikh/44_B2C_Travel_Booking_API.git
cd 44_B2C_Travel_Booking_API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root with:

```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-token-secret
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Then restart your server:

```bash
npm run dev
```

---

## 🧪 Postman API Testing

Use the provided `postman_collection.json` file to test all routes.

### Required Headers for Protected Routes:

```http
Authorization: Bearer <accessToken>
Content-Type: application/json
```

---

## 📚 API Endpoints

### 🔐 Auth

| Method | Endpoint              | Description              |
|--------|------------------------|--------------------------|
| POST   | `/api/auth/signup`    | Register a new user      |
| POST   | `/api/auth/login`     | Login + get JWT tokens   |

### 👤 User Profile

| Method | Endpoint           | Description            |
|--------|---------------------|------------------------|
| GET    | `/api/user/profile` | Get user info          |
| PUT    | `/api/user/profile` | Update name/password   |

### 🎫 Bookings

| Method | Endpoint                             | Description                  |
|--------|---------------------------------------|------------------------------|
| POST   | `/api/bookings`                      | Create a new booking         |
| GET    | `/api/bookings?status=upcoming`      | Upcoming bookings            |
| GET    | `/api/bookings?status=completed`     | Completed bookings           |
| POST   | `/api/bookings/:id/summary`          | AI summary for a booking     |

### 🧍 Travellers

| Method | Endpoint                             | Description              |
|--------|---------------------------------------|--------------------------|
| POST   | `/api/travellers`                    | Add new traveller        |
| PUT    | `/api/travellers/:traveller_id`      | Update traveller         |
| DELETE | `/api/travellers/:traveller_id`      | Delete traveller         |

---

## 📂 Folder Structure

```
b2c-booking-api/
│
├── pages/
│   └── api/
│       ├── auth/
│       │   ├── signup.js
│       │   └── login.js
│       ├── user/
│       │   └── profile.js
│       ├── bookings/
│       │   ├── index.js
│       │   └── [id]/
│       │       └── summary.js
│       └── travellers/
│           ├── index.js
│           └── [traveller_id].js
│
├── lib/
│   └── mongodb.js
│
├── middleware/
│   └── verifyToken.js
│
├── models/
│   ├── User.js
│   └── Order.js
│
├── .env.local
├── postman_collection.json
├── README.md
└── package.json
```

---

---

## 📦 Postman Collection

You’ll find a full `postman_collection.json` in the root folder. It includes:

- All endpoint requests
- Headers setup
- Sample body payloads
- Token auth flows

Import it into Postman using:  
**File > Import > Upload `postman_collection.json`**

---

## 📄 License

This project is for educational and demo purposes.  
Feel free to use, modify, and expand on it.

---

## 🙌 Author

Built with ❤️ for the B2C Booking Platform.
