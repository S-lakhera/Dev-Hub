
A modern, full-stack platform for developers to showcase portfolios, share projects, and publish technical blogs. Built with the MERN stack.

## 🚀 Tech Stack
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **JWT (Two-Token Strategy)**
- **ImageKit** (File Uploads)

---

## 🔐 Authentication System (Base URL: `/api/auth`)

### 1. Register User
- **Route:** `POST /register`
- **Body (JSON):**
  
```json
  {
    "name": "Shashank Lakhera",
    "email": "shashank@example.com",
    "password": "securepassword123"
  }

```

* **Response (201):** Sets `accessToken` and `refreshToken` in cookies.
* **Notes:** Password is automatically hashed using bcrypt pre-save hook.

### 2. Login User

* **Route:** `POST /login`
* **Body (JSON):**
```json
{
  "email": "shashank@example.com",
  "password": "securepassword123"
}

```


* **Response (200):** Returns user details and sets auth cookies.

### 3. Refresh Token

* **Route:** `POST /refresh`
* **Description:** Uses the `refreshToken` cookie to issue a new `accessToken`.

---

## 👤 Developer Profile (Base URL: `/api/users`)

### 1. Update Profile (Protected)

* **Route:** `PATCH /update`
* **Body (Form-Data):**
* `bio`: String
* `skills`: Array (e.g., ["React", "Node"])
* `profilePicture`: File (Image)


* **Response (200):** Returns updated user document.

### 2. Get My Details

* **Route:** `GET /me` (Protected)
* **Description:** Returns logged-in user's data (without password).

---

## 📁 Project Showcase (Base URL: `/api/projects`)

### 1. Create Project (Protected)

* **Route:** `POST /`
* **Body (JSON):**
```json
{
  "title": "Portfolio Site",
  "description": "Built with Next.js",
  "techStack": ["Next.js", "Tailwind"],
  "githubLink": "[https://github.com/](https://github.com/)...",
  "liveLink": "https://..."
}

```



### 2. Project Discovery (Public Feed)

* **Route:** `GET /feed?tech=React&search=Port`
* **Description:** Filter by tech stack or search by title.

---

## 📝 Tech Blog System (Base URL: `/api/blogs`)

### 1. Get All Blogs (Public)

* **Route:** `GET /`
* **Description:** Returns blogs with author details (populated).

---

## ⚡ Setup & Installation

1. `npm install`
2. Create `.env` with `MONGO_URI`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, and `IMAGEKIT` keys.
3. `npm run dev`
"""
