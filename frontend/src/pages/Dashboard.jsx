import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import { getUser } from "../services/api";

function Dashboard() {
  const initialUser = getUser();
  // State for active role (defaults to user's saved role, but allows switching for review demo)
  const [currentRole, setCurrentRole] = useState(initialUser.role || "USER");
  const [activeModal, setActiveModal] = useState(null);

  const toggleRole = () => {
    const nextRole = currentRole === "USER" ? "ADMIN" : "USER";
    setCurrentRole(nextRole);
    localStorage.setItem("role", nextRole);
  };

  const handleCardClick = (title, targetService, port) => {
    setActiveModal({
      title,
      service: targetService,
      port,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Top Navbar */}
      <Navbar variant="dashboard" onRoleChange={setCurrentRole} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Welcome Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Welcome back, {initialUser.username} 👋
                </h1>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${
                    currentRole === "ADMIN"
                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}
                >
                  {currentRole}
                </span>
              </div>
              <p className="text-sm text-slate-600">
                {currentRole === "ADMIN"
                  ? "Manage the ScholarSphere platform."
                  : "Explore your digital knowledge space."}
              </p>
            </div>

            {/* B.Tech Project Review: One-Click Role Switcher */}
            <div className="bg-slate-100 p-2 rounded-xl border border-slate-200 flex items-center space-x-2 self-start sm:self-auto">
              <span className="text-xs text-slate-500 font-medium pl-1">Review Demo:</span>
              <button
                type="button"
                onClick={toggleRole}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-800 border border-slate-300 shadow-sm hover:bg-slate-50 transition-colors"
                title="Switch between User and Admin dashboard for demo review"
              >
                Switch to {currentRole === "USER" ? "ADMIN Dashboard 🛡️" : "USER Dashboard 👤"}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 18. USER DASHBOARD VIEW (when role === "USER")                            */}
        {/* ========================================================================= */}
        {currentRole === "USER" && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  My Digital Knowledge Resources
                </h2>
                <span className="text-xs text-slate-500">Connected to Microservices Gateway</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. Books */}
                <div
                  onClick={() => handleCardClick("Digital Books", "Content Service", "8082")}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    📚
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Books
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Explore digital books
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600">
                    <span>Browse Collection</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>

                {/* 2. Journals */}
                <div
                  onClick={() => handleCardClick("Academic Journals", "Content Service", "8082")}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    📰
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Journals
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Academic publications
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-600">
                    <span>Read Journals</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>

                {/* 3. Research */}
                <div
                  onClick={() => handleCardClick("Research Documents", "Content Service", "8082")}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    📄
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Research
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Research documents
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
                    <span>Access Papers</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>

                {/* 4. Subscription */}
                <div
                  onClick={() => handleCardClick("Subscription Plan", "Access Service", "8083")}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    ⭐
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Subscription
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    View your current plan
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-600">
                    <span>Manage Plan</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Reading Activity & Info Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Architecture Status &amp; Integration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-semibold text-slate-700">Authentication Service</div>
                  <div className="text-slate-500 mt-0.5">Port 8081 • JWT Active</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-semibold text-slate-700">Content Service</div>
                  <div className="text-slate-500 mt-0.5">Port 8082 • Ready for linking</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-semibold text-slate-700">Access &amp; Usage Services</div>
                  <div className="text-slate-500 mt-0.5">Port 8083/8084 • Ready for linking</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 19. ADMIN DASHBOARD VIEW (when role === "ADMIN")                           */}
        {/* ========================================================================= */}
        {currentRole === "ADMIN" && (
          <div className="space-y-8">
            <div className="bg-purple-950/90 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs uppercase font-bold text-purple-300 tracking-wider bg-purple-900/80 px-2.5 py-1 rounded-full border border-purple-700">
                Administrator View
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                Admin Dashboard
              </h2>
              <p className="text-purple-200 text-sm mt-1">
                Manage the ScholarSphere platform.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Administrative Operations
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 1. Manage Content */}
                <div
                  onClick={() => handleCardClick("Manage Content", "Content Service", "8082")}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-purple-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    📚
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    Manage Content
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Upload and manage books, journals and research documents.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-purple-600">
                    <span>Manage Repository</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>

                {/* 2. Upload Content */}
                <div
                  onClick={() => handleCardClick("Upload Content", "Content Service", "8082")}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-purple-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    ➕
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Upload Content
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Add new digital resources.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600">
                    <span>Upload New</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>

                {/* 3. Users */}
                <div
                  onClick={() => handleCardClick("User Management", "Authentication & Access Service", "8081 / 8083")}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-purple-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    👥
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Users
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Manage platform users.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-600">
                    <span>Manage Users</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>

                {/* 4. Usage */}
                <div
                  onClick={() => handleCardClick("Platform Usage", "Usage Service", "8084")}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-purple-400 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    📊
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Usage
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    View platform activity.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-600">
                    <span>Analytics</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modal Dialog for Microservice Connector Preview */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                🔗
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{activeModal.title}</h4>
                <p className="text-xs text-slate-500">ScholarSphere Microservice Module</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 mb-6 text-slate-700">
              <p>
                <span className="font-semibold">Target Service:</span> {activeModal.service}
              </p>
              <p>
                <span className="font-semibold">Backend Port:</span> http://localhost:{activeModal.port}
              </p>
              <p className="text-slate-500 pt-1 border-t border-slate-200">
                This feature connects to {activeModal.service} via the API Gateway in subsequent project phases.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
