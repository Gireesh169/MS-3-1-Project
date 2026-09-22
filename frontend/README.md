# ScholarSphere Digital — Frontend

A clean, modern, and responsive React + Vite + Tailwind CSS frontend designed for the **ScholarSphere Digital** microservices platform (**PS029 : Digital Knowledge Platform & Content Access Management System**).

---

## 🚀 Features

- **Authentication Flows**:
  - User Registration with form validation (email format, password strength, matching passwords, role selection).
  - User Login with show/hide password toggle, loading spinner, and clear error banners.
  - JWT storage in `localStorage` and request interceptors.
- **Role-Based Dashboards**:
  - **USER Dashboard**: Digital resource catalog (Books, Journals, Research Documents), Subscription tier entitlement, and Reading activity tracker.
  - **ADMIN Dashboard**: Content management, Upload document launcher, User rights administration, and Microservices cluster monitor.
  - **Review Demo Toggle**: Allows examiners to seamlessly preview both USER and ADMIN interfaces on the fly.
- **Route Protection**:
  - `/dashboard` is protected by `ProtectedRoute.jsx`. Unauthenticated users are redirected to `/login`.
- **Responsive Navbar**:
  - Dynamic navigation links based on role (`USER` vs `ADMIN`).
  - Mobile hamburger drawer menu.

---

## 📁 Project Structure

```text
frontend/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Responsive header with role-based links
│   │   └── ProtectedRoute.jsx  # Route guard requiring JWT token
│   │
│   ├── pages/
│   │   ├── Login.jsx           # Sign-in page with show/hide password
│   │   ├── Register.jsx        # Registration with validation & role picker
│   │   ├── Dashboard.jsx       # USER & ADMIN personalized dashboards
│   │   └── NotFound.jsx        # Clean 404 fallback page
│   │
│   ├── services/
│   │   └── api.js              # Centralized Axios config & auth helpers
│   │
│   ├── App.jsx                 # React Router routing configuration
│   ├── main.jsx                # React DOM root mounting
│   └── index.css               # Tailwind directives & typography
│
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🛠️ How to Run Locally

### 1. Start the Frontend

```bash
cd frontend
npm run dev
```

The application will be live at:
👉 **`http://localhost:5173`**

### 2. Configure Backend Endpoint

In [`src/services/api.js`](src/services/api.js):

```javascript
// Point directly to Authentication Service:
export const BASE_URL = "http://localhost:8081";

// Or point to API Gateway once routing is ready:
// export const BASE_URL = "http://localhost:8080";
```

*(Note: Vite's dev server is also pre-configured with a proxy for `/api` to avoid CORS issues.)*

---

## 🎓 Viva / Review Explanation Points

1. **JWT Authentication**: Upon submitting valid credentials to `POST /api/auth/login`, the backend issues a stateless JWT token, which is stored in `localStorage` under `token`.
2. **Stateless Security**: Every subsequent HTTP request attaches the token via the Axios request interceptor in `api.js` using the standard `Authorization: Bearer <token>` header.
3. **Protected Route Pattern**: `ProtectedRoute.jsx` reads `isLoggedIn()`. If no valid token exists, the user is redirected to `/login`.
4. **Role Isolation**: The dashboard checks `user.role` to render either the student reader interface or the administrative management console.
