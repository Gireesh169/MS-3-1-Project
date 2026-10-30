import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  History,
  CreditCard,
  User,
  LogOut,
  ShieldCheck,
  BarChart3,
  Layers,
  Menu,
  X,
  Compass,
} from "lucide-react";

export default function DashboardLayout() {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // User navigation links
  const userNavItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Explore Books", path: "/books", icon: BookOpen },
    { name: "Journals & Research", path: "/journals", icon: FileText },
    { name: "Reading History", path: "/history", icon: History },
    { name: "My Subscription", path: "/subscription", icon: CreditCard },
    { name: "My Profile", path: "/profile", icon: User },
  ];

  // Admin navigation links
  const adminNavItems = [
    { name: "Admin Overview", path: "/admin/dashboard", icon: ShieldCheck },
    { name: "Content Management", path: "/admin/content", icon: Layers },
    { name: "Access & Plans", path: "/admin/access", icon: CreditCard },
    { name: "Usage Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Catalog View", path: "/books", icon: BookOpen },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Header */}
      <header className="h-16 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-lg">
                📚
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors leading-none">
                ScholarSphere
              </span>
              <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest mt-0.5">
                {isAdmin ? "Admin Console" : "Digital Library"}
              </span>
            </div>
          </Link>
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white transition-all"
            title="3D Universe Landing"
          >
            <Compass size={14} className="text-cyan-400" />
            <span>3D Experience</span>
          </Link>

          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white capitalize leading-tight">
                {user?.username || "Scholar"}
              </p>
              <span
                className={`inline-block text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                  isAdmin
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                }`}
              >
                {isAdmin ? "ADMIN" : "STUDENT"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700/50 hover:border-red-500/30 transition-all"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col bg-slate-900/60 border-r border-slate-800/80 p-4 space-y-6 flex-shrink-0">
          <div className="px-2 py-1">
            <p className="text-[11px] font-mono uppercase font-bold text-slate-500 tracking-wider">
              {isAdmin ? "MANAGEMENT" : "NAVIGATION"}
            </p>
          </div>

          <nav className="flex-1 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-cyan-400" : "text-slate-400"} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Info Box in Sidebar */}
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Status</span>
              <span className="flex items-center space-x-1 text-emerald-400 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Gateway: <span className="font-mono text-slate-400">8090</span>
            </p>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col space-y-4 z-10">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-sm text-white">Menu</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                        isActive
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#040714]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
