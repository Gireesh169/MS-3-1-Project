import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import usageService from "../services/usageService";
import accessService from "../services/accessService";
import {
  BookOpen,
  Clock,
  Flame,
  Award,
  ArrowRight,
  TrendingUp,
  History,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [recentHistory, setRecentHistory] = useState([]);
  const [mostAccessed, setMostAccessed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        // Load data in parallel from real microservices
        const [statsData, subData, historyData, popularData] = await Promise.allSettled([
          usageService.getMyStats(),
          user?.username ? accessService.getSubscription(user.username) : Promise.resolve(null),
          usageService.getMyHistory(),
          usageService.getMostAccessed(5),
        ]);

        if (statsData.status === "fulfilled") setStats(statsData.value);
        if (subData.status === "fulfilled") setSubscription(subData.value);
        if (historyData.status === "fulfilled") setRecentHistory(historyData.value || []);
        if (popularData.status === "fulfilled") setMostAccessed(popularData.value || []);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950/70 border border-white/10 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
            <Sparkles size={14} className="text-cyan-400" />
            <span>Digital Knowledge Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-cyan-400 capitalize">{user?.username || "Scholar"}</span>!
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Explore curated digital books, continue your reading history, and monitor your academic telemetry.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/books"
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2"
            >
              <BookOpen size={16} />
              <span>Explore Books</span>
            </Link>
            <Link
              to="/subscription"
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all"
            >
              Manage Plan
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Books Read */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Books Explored
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white">
              {stats?.totalBooksRead ?? 0}
            </h3>
            <p className="text-xs text-slate-500 mt-1">Unique digital books accessed</p>
          </div>
        </div>

        {/* Metric 2: Reading Time */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Reading Time
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white">
              {stats?.totalReadingDurationMinutes ?? 0} <span className="text-base font-normal text-slate-400">mins</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">Total time spent reading</p>
          </div>
        </div>

        {/* Metric 3: Total Access Sessions */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Total Sessions
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Flame size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white">
              {stats?.totalAccessCount ?? 0}
            </h3>
            <p className="text-xs text-slate-500 mt-1">Total interactions logged</p>
          </div>
        </div>

        {/* Metric 4: Subscription Status */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Active Tier
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Award size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-emerald-400 uppercase">
              {subscription?.planType || "FREE TIER"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {subscription?.active ? "Active subscription" : "Standard student access"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Content: Recently Read & Most Accessed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recently Read Books */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <History size={18} className="text-cyan-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Recent Reading History</h2>
            </div>
            <Link to="/history" className="text-xs font-semibold text-cyan-400 hover:underline flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {recentHistory.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl space-y-3">
              <BookOpen size={32} className="mx-auto text-slate-600" />
              <p className="text-sm text-slate-400">No reading sessions recorded yet.</p>
              <Link
                to="/books"
                className="inline-block px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-all"
              >
                Browse Books Catalog
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentHistory.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white line-clamp-1">
                      {item.bookTitle || `Digital Book #${item.bookId}`}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-slate-400">
                      <span>{new Date(item.accessDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{item.durationMinutes} mins read</span>
                    </div>
                  </div>
                  <Link
                    to={`/reader/${item.bookId}`}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all"
                  >
                    Continue
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Platform Most Accessed Leaderboard */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-2">
            <TrendingUp size={18} className="text-amber-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Most Popular Books</h2>
          </div>

          {mostAccessed.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl text-sm text-slate-400">
              Leaderboard updates as students read titles.
            </div>
          ) : (
            <div className="space-y-3">
              {mostAccessed.map((book, idx) => (
                <div
                  key={book.bookId}
                  className="flex items-center space-x-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-amber-500/30 transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    #{idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {book.bookTitle || `Book ID: ${book.bookId}`}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {book.accessCount} readers • {book.totalDurationMinutes} mins total
                    </p>
                  </div>
                  <Link
                    to={`/books/${book.bookId}`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                    title="View Book"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
