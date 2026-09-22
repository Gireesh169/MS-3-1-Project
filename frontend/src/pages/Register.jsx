import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { academicImages } from "../assets/images/imageUrls";

function Register() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

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

    // Client validation
    if (!formData.username.trim()) {
      setErrorMessage("Please enter a valid username.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please provide a valid academic email address.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-check.");
      return;
    }

    setIsLoading(true);

    try {
      // Connect to Auth Service on port 8081
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Navigate to login with success flash message
      navigate("/login", {
        state: {
          username: formData.username,
          message: "Account created successfully! Please sign in.",
        },
      });
    } catch (err) {
      console.error("Registration Error:", err);
      if (err.response) {
        setErrorMessage(
          err.response.data?.message ||
            err.response.data ||
            "Registration failed. Username or email may already be registered."
        );
      } else if (err.request) {
        setErrorMessage(
          "Cannot reach Authentication Service (http://localhost:8081). Please ensure backend is running."
        );
      } else {
        setErrorMessage(err.message || "An error occurred during registration.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center">
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: ACADEMIC VISUAL WITH OVERLAY (Desktop only)                  */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative bg-slate-950 overflow-hidden items-center justify-center p-12">
          {/* Background Image */}
          <img
            src={academicImages.libraryWorkspace}
            alt="Digital Library Workspace"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />

          {/* Dark Translucent Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/50" />

          {/* Quotation & Branding */}
          <div className="relative z-10 max-w-lg text-white space-y-8">
            <Link to="/" className="inline-flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
              <span className="text-3xl">📚</span>
              <span className="text-xl font-bold tracking-tight">ScholarSphere Digital</span>
            </Link>

            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Empowering<br />
                academic discovery.
              </h2>
              <div className="w-16 h-1 bg-blue-500 rounded" />
              <p className="text-xl text-slate-300 font-light tracking-wide pt-2">
                Join our digital community of students, educators, and researchers.
              </p>
            </div>

            <div className="pt-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800">
              Instant access to books, academic journals, and research documents on an open, scalable microservices framework.
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: REGISTRATION FORM                                           */}
        {/* ========================================================================= */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-5 bg-white flex flex-col justify-center px-6 sm:px-12 xl:px-16 py-10">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Top Back Link & Header */}
            <div>
              <Link
                to="/"
                className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-4 group"
              >
                <span className="mr-1.5 group-hover:-translate-x-0.5 transition-transform">←</span>
                <span>Back to Home</span>
              </Link>

              <div className="flex items-center space-x-2 lg:hidden mb-3">
                <span className="text-2xl">📚</span>
                <span className="text-lg font-bold text-slate-900">ScholarSphere Digital</span>
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Create Account
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Join ScholarSphere Digital
              </p>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username */}
              <div>
                <label
                  htmlFor="reg-username"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Username
                </label>
                <input
                  id="reg-username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. jdoe"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="reg-email"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Email
                </label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@university.edu"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="reg-password"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-slate-500 hover:text-slate-700 focus:outline-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="reg-confirmPassword"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="reg-confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-type your password"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                />
              </div>

              {/* Role Selection (Default USER) */}
              <div>
                <label
                  htmlFor="reg-role"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Role
                </label>
                <select
                  id="reg-role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all cursor-pointer"
                >
                  <option value="USER">USER (Standard Student/Reader)</option>
                  <option value="ADMIN">ADMIN (Platform Administrator)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Standard users register with the <span className="font-semibold">USER</span> role.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm mt-2"
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  <span>Create Account</span>
                )}
              </button>

            </form>

            {/* Bottom Links */}
            <div className="pt-3 text-center border-t border-slate-100">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
