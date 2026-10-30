import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/api";
import { academicImages } from "../assets/images/imageUrls";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Flash message if redirected from registration
  const [successMessage] = useState(location.state?.message || "");

  // Form State
  const [formData, setFormData] = useState({
    username: location.state?.username || "",
    password: "",
  });

  const [selectedRole, setSelectedRole] = useState("USER");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.username.trim()) {
      setErrorMessage("Please enter your username.");
      return;
    }
    if (!formData.password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      // Connect to Auth Service on port 8081
      await loginUser(
        {
          username: formData.username.trim(),
          password: formData.password,
        },
        selectedRole
      );

      // On successful authentication, redirect to protected dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 400) {
          setErrorMessage("Invalid username or password. Please verify credentials.");
        } else {
          setErrorMessage(err.response.data?.message || "Login failed. Please check your credentials.");
        }
      } else if (err.request) {
        setErrorMessage(
          "Cannot connect to Authentication Service (http://localhost:8081). Please verify backend is running."
        );
      } else {
        setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center">
      {/* Container wrapper */}
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12">
        
        {/* ========================================================================= */}
        {/* 13. LEFT COLUMN: ACADEMIC VISUAL WITH OVERLAY (Desktop only / hidden mobile) */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative bg-slate-950 overflow-hidden items-center justify-center p-12">
          {/* Background Academic Image */}
          <img
            src={academicImages.authVisual}
            alt="Academic Digital Library"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          {/* Dark Translucent Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/50" />

          {/* Quotation & Branding Content Over Image */}
          <div className="relative z-10 max-w-lg text-white space-y-8">
            <Link to="/" className="inline-flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
              <span className="text-3xl">📚</span>
              <span className="text-xl font-bold tracking-tight">ScholarSphere Digital</span>
            </Link>

            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Knowledge is<br />
                always within reach.
              </h2>
              <div className="w-16 h-1 bg-blue-500 rounded" />
              <p className="text-2xl text-slate-300 font-light tracking-wide pt-2">
                Books. Research. Ideas.
              </p>
            </div>

            <div className="pt-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800">
              Access peer-reviewed articles, reference volumes, and academic research documents anytime, anywhere.
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 14. RIGHT COLUMN: LOGIN FORM                                              */}
        {/* ========================================================================= */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-5 bg-white flex flex-col justify-center px-6 sm:px-12 xl:px-16 py-12">
          <div className="max-w-md w-full mx-auto space-y-8">
            
            {/* Top Back Link & Mobile Branding */}
            <div>
              <Link
                to="/"
                className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
              >
                <span className="mr-1.5 group-hover:-translate-x-0.5 transition-transform">←</span>
                <span>Back to Home</span>
              </Link>

              <div className="flex items-center space-x-2 lg:hidden mb-4">
                <span className="text-2xl">📚</span>
                <span className="text-lg font-bold text-slate-900">ScholarSphere Digital</span>
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Sign in to continue to ScholarSphere Digital.
              </p>
            </div>

            {/* Flash Success Message */}
            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                />
              </div>

              {/* Password Field with Show/Hide Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {/* B.Tech Demo Review Helper: Demo Role Selector */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-600">
                    Sign in Demo Persona:
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("USER")}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        selectedRole === "USER"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      USER
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("ADMIN")}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        selectedRole === "ADMIN"
                          ? "bg-purple-600 text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      ADMIN
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  <span>Sign In →</span>
                )}
              </button>

            </form>

            {/* Bottom Links */}
            <div className="pt-4 text-center border-t border-slate-100">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
