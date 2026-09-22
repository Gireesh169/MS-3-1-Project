import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../services/api";

function NotFound() {
  const loggedIn = isLoggedIn();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-3xl mb-4">
        📚
      </div>
      <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">404</h1>
      <p className="mt-2 text-base text-slate-400">Page not found</p>
      <p className="mt-1 text-sm text-slate-500 max-w-sm">
        The page you are looking for does not exist or has been relocated.
      </p>
      <div className="mt-6">
        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-slate-700 text-sm font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            ← Return to Home
          </Link>
          <Link
            to={loggedIn ? "/dashboard" : "/login"}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            {loggedIn ? "Go to Dashboard" : "Go to Login"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
