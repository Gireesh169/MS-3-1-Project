import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import contentService from "../services/contentService";
import accessService from "../services/accessService";
import usageService from "../services/usageService";
import {
  BookOpen,
  User,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Users,
  ArrowLeft,
} from "lucide-react";

export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [stats, setStats] = useState(null);
  const [myCount, setMyCount] = useState(0);
  const [hasAccess, setHasAccess] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookData() {
      try {
        setLoading(true);

        // Fetch book info from Content Service
        const bookData = await contentService.getContentById(id);
        setBook(bookData);

        // Fetch stats and permissions in parallel
        const [statsData, countData, canViewData] = await Promise.allSettled([
          usageService.getBookStats(id),
          usageService.getMyBookAccessCount(id),
          user?.username ? accessService.canView(user.username, bookData?.type || "BOOK") : Promise.resolve(true),
        ]);

        if (statsData.status === "fulfilled") setStats(statsData.value);
        if (countData.status === "fulfilled") setMyCount(countData.value || 0);
        if (canViewData.status === "fulfilled") {
          // If response is boolean false, set false
          setHasAccess(canViewData.value === true);
        }
      } catch (err) {
        console.error("Error loading book details:", err);
      } finally {
        setLoading(false);
      }
    }

    loadBookData();
  }, [id, user]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-slate-400">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-mono">Retrieving book metadata from Content Service...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Book Not Found</h2>
        <p className="text-sm text-slate-400">The requested content could not be located in the catalog.</p>
        <Link
          to="/books"
          className="inline-block px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
        >
          Return to Books Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Catalog</span>
      </button>

      {/* Main Book Hero */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 shadow-2xl">
        {/* Left Column: Visual Book Spine */}
        <div className="md:col-span-4 flex flex-col items-center">
          <div className="w-48 aspect-[1/1.4] rounded-2xl bg-gradient-to-tr from-slate-950 via-blue-950 to-cyan-900 p-6 flex flex-col justify-between border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/40 relative overflow-hidden group">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                {book.type || "BOOK"}
              </span>
              <h4 className="text-base font-bold text-white line-clamp-3 leading-snug">
                {book.title}
              </h4>
            </div>

            <div className="border-t border-white/10 pt-3">
              <p className="text-xs text-slate-300 font-medium truncate">{book.author}</p>
              <p className="text-[9px] text-cyan-400/80 uppercase font-mono mt-0.5">ScholarSphere Edition</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs font-mono text-slate-500">Repository ID: #{book.id}</span>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="md:col-span-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-400 text-xs font-bold font-mono">
                {book.type || "BOOK"}
              </span>
              {hasAccess ? (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 size={13} />
                  <span>Access Permitted</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  <AlertTriangle size={13} />
                  <span>Subscription Upgrade Needed</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {book.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 font-medium text-slate-300">
                <User size={14} className="text-slate-500" />
                <span>{book.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Calendar size={14} className="text-slate-500" />
                <span>{book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "Catalog Item"}</span>
              </span>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Synopsis & Description
              </h4>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                {book.description || "No detailed synopsis has been provided for this digital title."}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
            {hasAccess ? (
              <Link
                to={`/reader/${book.id}`}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center space-x-2"
              >
                <BookOpen size={16} />
                <span>Launch Digital Reader</span>
              </Link>
            ) : (
              <Link
                to="/subscription"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-2"
              >
                <span>Upgrade to Read Title</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Book Telemetry & Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Eye size={14} className="text-cyan-400" />
            <span>TOTAL SESSIONS</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{stats?.totalAccessCount ?? 0}</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Clock size={14} className="text-amber-400" />
            <span>TOTAL DURATION</span>
          </div>
          <p className="text-2xl font-extrabold text-white">
            {stats?.totalReadingDurationMinutes ?? 0} <span className="text-xs text-slate-500">mins</span>
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Users size={14} className="text-purple-400" />
            <span>UNIQUE READERS</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{stats?.uniqueReadersCount ?? 0}</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <BookOpen size={14} className="text-emerald-400" />
            <span>YOUR SESSIONS</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{myCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
