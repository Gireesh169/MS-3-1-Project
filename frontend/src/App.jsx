import React from "react";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

// Public Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

// Student / User Pages
import DashboardPage from "./pages/DashboardPage";
import BooksPage from "./pages/BooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import JournalsPage from "./pages/JournalsPage";
import ReaderPage from "./pages/ReaderPage";
import HistoryPage from "./pages/HistoryPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import ProfilePage from "./pages/ProfilePage";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminContentPage from "./pages/AdminContentPage";
import AdminAccessPage from "./pages/AdminAccessPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Public 3D Cinematic Scroll Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* 2. Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 3. Standalone Digital Reader (Fullscreen Protected Route) */}
          <Route
            path="/reader/:id"
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <ReaderPage />
              </ProtectedRoute>
            }
          />

          {/* 4. Authenticated Student / USER Routes (Inside Dashboard Layout) */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/journals" element={<JournalsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* 5. Authenticated ADMIN Routes (Inside Admin Dashboard Layout) */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/content" element={<AdminContentPage />} />
            <Route path="/admin/access" element={<AdminAccessPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          </Route>

          {/* 6. Catch-All Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Landing Page (Public Entry Point) */}
        <Route path="/" element={<Landing />} />

        {/* 2. Public Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 3. Protected Application Pages (Unauthenticated users are redirected to /login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* 4. Catch-All Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
>>>>>>> ac01a7e2003287589498a96922d12f091ddd2f03
  );
}

export default App;
