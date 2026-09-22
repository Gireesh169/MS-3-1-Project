import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, logout, isLoggedIn } from "../services/api";

function Navbar({ variant = "auto", onRoleChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const loggedIn = isLoggedIn();
  const user = getUser();

  // Determine if this is landing mode or dashboard mode
  const isDashboardView = variant === "dashboard" || (variant === "auto" && location.pathname === "/dashboard");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              📚
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors leading-none">
                ScholarSphere
              </span>
              <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase mt-0.5">
                Digital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!isDashboardView ? (
              // Landing Page Navigation
              <>
                <a href="#home" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Home
                </a>
                <a href="#categories" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Explore
                </a>
                <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  About
                </a>
                <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all"
                >
                  Get Started
                </Link>
              </>
            ) : (
              // Authenticated Dashboard Navigation
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-white px-3 py-1.5 rounded-lg bg-slate-800"
                >
                  Dashboard
                </Link>

                {/* User Info & Badge */}
                <div className="flex items-center pl-4 border-l border-slate-800 space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left leading-none">
                    <span className="block text-xs font-semibold text-slate-200">
                      {user.username}
                    </span>
                    <span className={`inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded mt-0.5 ${
                      user.role === "ADMIN" ? "bg-purple-900/60 text-purple-300 border border-purple-700" : "bg-blue-900/60 text-blue-300 border border-blue-700"
                    }`}>
                      {user.role}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="ml-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-red-300 hover:bg-red-950/40 rounded-lg border border-slate-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center space-x-2">
            {isDashboardView && (
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-900 text-blue-200">
                {user.role}
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
          {!isDashboardView ? (
            <>
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                Home
              </a>
              <a
                href="#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                Explore
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                About
              </a>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                Login
              </Link>
              <div className="pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="px-3 py-2 border-b border-slate-800 mb-2">
                <p className="text-sm font-semibold text-slate-200">{user.username}</p>
                <p className="text-xs text-slate-400">Role: <span className="text-blue-400 font-medium">{user.role}</span></p>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                Dashboard
              </Link>
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-950/40"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
