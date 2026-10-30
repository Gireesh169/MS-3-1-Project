import React from "react";
<<<<<<< HEAD
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Role-Based Protected Route Guard
 * Enforces authentication and authorization based on allowed roles.
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-mono text-slate-400">Verifying ScholarSphere Credentials...</p>
        </div>
      </div>
    );
  }

  // Not logged in -> redirect to login
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role validation
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = (user.role || "USER").toUpperCase();
    const hasRole = allowedRoles.some((role) => {
      const r = role.toUpperCase();
      return userRole === r || userRole === `ROLE_${r}` || `ROLE_${userRole}` === r;
    });

    if (!hasRole) {
      // If user lacks admin permissions, redirect to user dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children ? children : <Outlet />;
}
=======
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../services/api";

/**
 * ProtectedRoute: Ensures only authenticated users with a valid JWT token
 * can access secure pages like /dashboard. Unauthenticated users are
 * redirected to /login.
 */
function ProtectedRoute() {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
>>>>>>> ac01a7e2003287589498a96922d12f091ddd2f03
