import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import contentService from "../services/contentService";
import accessService from "../services/accessService";
import usageService from "../services/usageService";
import {
  ArrowLeft,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Lock,
  Sun,
  Moon,
  Coffee,
} from "lucide-react";

export default function ReaderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 24;

  // Reader customization state
  const [theme, setTheme] = useState("dark"); // "dark", "sepia", "light"
  const [fontSize, setFontSize] = useState(16); // in px
  const [readingSeconds, setReadingSeconds] = useState(0);

  const readingSecondsRef = useRef(0);

  useEffect(() => {
    async function initReader() {
      try {
        setLoading(true);
        const bookData = await contentService.getContentById(id);
        setBook(bookData);

        // Check access permission via Access Service
        if (user?.username) {
          const allowed = await accessService.canView(user.username, bookData?.type || "BOOK");
          setHasAccess(allowed);
        }

        // Record initial access session in Usage Service
        usageService
          .recordUsage({
            bookId: Number(id),
            bookTitle: bookData?.title || `Book #${id}`,
            durationMinutes: 1, // Minimum 1 minute initial session
          })
          .catch((e) => console.warn("Failed to record initial reading telemetry:", e));
      } catch (err) {
        console.error("Reader initialization error:", err);
      } finally {
        setLoading(false);
      }
    }

    initReader();

    // Start reading timer
    const interval = setInterval(() => {
      setReadingSeconds((prev) => {
        readingSecondsRef.current = prev + 1;
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      // On unmount, record elapsed minutes
      const finalMinutes = Math.max(1, Math.round(readingSecondsRef.current / 60));
      usageService
        .recordUsage({
          bookId: Number(id),
          bookTitle: book?.title || `Book #${id}`,
          durationMinutes: finalMinutes,
        })
        .catch(() => {});
    };
  }, [id, user]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-mono text-slate-400">Loading digital content into reader...</p>
        </div>
      </div>
    );
  }

  // Access Denied Screen
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-amber-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
            <Lock size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Subscription Required</h2>
            <p className="text-sm text-slate-400">
              Your current ScholarSphere subscription does not grant viewing permissions for{" "}
              <span className="font-semibold text-white">{book?.type || "this content type"}</span>.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              to="/subscription"
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg shadow-amber-500/20 transition-all text-center"
            >
              Upgrade Subscription Plan
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Theme styling configurations
  const themeClasses = {
    dark: "bg-slate-950 text-slate-200 border-slate-800",
    sepia: "bg-[#f4ecd8] text-[#433422] border-[#e2d4b7]",
    light: "bg-white text-slate-800 border-slate-200",
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === "sepia" ? "bg-[#efe5cd]" : theme === "light" ? "bg-slate-100" : "bg-slate-950"}`}>
      {/* Reader Navigation Header */}
      <header className="h-14 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between text-white sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            title="Exit Reader"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 max-w-xs sm:max-w-md">
              {book?.title}
            </h3>
            <p className="text-[10px] text-slate-400 truncate">{book?.author}</p>
          </div>
        </div>

        {/* Reader Tools */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Timer */}
          <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-800/40">
            <Clock size={13} />
            <span>{formatTime(readingSeconds)}</span>
          </div>

          {/* Font Size Adjusters */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setFontSize((prev) => Math.max(12, prev - 2))}
              className="px-2 py-0.5 text-xs text-slate-300 hover:text-white"
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize((prev) => Math.min(24, prev + 2))}
              className="px-2 py-0.5 text-xs text-slate-300 hover:text-white"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Theme Palette */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setTheme("dark")}
              className={`p-1 rounded ${theme === "dark" ? "bg-slate-900 text-cyan-400" : "text-slate-400"}`}
              title="Dark Mode"
            >
              <Moon size={14} />
            </button>
            <button
              onClick={() => setTheme("sepia")}
              className={`p-1 rounded ${theme === "sepia" ? "bg-[#f4ecd8] text-[#433422]" : "text-slate-400"}`}
              title="Sepia Reading Mode"
            >
              <Coffee size={14} />
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`p-1 rounded ${theme === "light" ? "bg-white text-slate-900" : "text-slate-400"}`}
              title="Light Mode"
            >
              <Sun size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Reader Body (Manuscript / Book Page) */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-between">
        <div
          className={`w-full rounded-3xl p-8 sm:p-14 shadow-2xl border transition-all ${themeClasses[theme]}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {/* Page Header */}
          <div className="flex items-center justify-between border-b pb-4 mb-8 opacity-60 text-xs font-mono uppercase tracking-wider">
            <span>ScholarSphere Digital Reader</span>
            <span>Chapter {currentPage} / {totalPages}</span>
          </div>

          {/* Manuscript Text */}
          <div className="space-y-6 leading-relaxed font-serif">
            <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight mb-4">
              {currentPage === 1 ? book?.title : `Section ${currentPage}.0: Architectural Mechanics`}
            </h2>

            <p>
              {currentPage === 1 && book?.description
                ? book.description
                : "Digital knowledge platforms bridge the gap between academic research repositories and distributed computing systems. In an era where data-intensive workloads require zero-latency discovery and resilient fault-tolerance, microservices-driven architectures provide the foundation for next-generation digital libraries."}
            </p>

            <p>
              By decoupling identity management, access control permissions, digital content storage, and telemetry usage tracking into sovereign services, institutions guarantee horizontal scalability and strict isolation. Users benefit from personalized session management and deterministic access rights verified across distributed API gateways.
            </p>

            <p>
              Every interaction is telemetry-recorded through non-blocking reactive pipelines, ensuring accurate citation metrics, reading completion rates, and platform-wide popular book recommendations without introducing database contention.
            </p>
          </div>

          {/* Page Footer */}
          <div className="mt-12 pt-6 border-t opacity-50 flex items-center justify-between text-xs font-mono">
            <span>Author: {book?.author}</span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>
        </div>

        {/* Bottom Pagination Controls */}
        <div className="py-6 flex items-center justify-between max-w-md mx-auto w-full text-slate-400">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold hover:text-white disabled:opacity-40 transition-all"
          >
            <ChevronLeft size={16} />
            <span>Previous Page</span>
          </button>

          <span className="text-xs font-mono font-bold">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold hover:text-white disabled:opacity-40 transition-all"
          >
            <span>Next Page</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </main>
    </div>
  );
}
