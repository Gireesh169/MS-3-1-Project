import React from "react";
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
