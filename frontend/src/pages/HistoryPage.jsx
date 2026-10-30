import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import usageService from "../services/usageService";
import { History, Search, BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchHistory() {
      try {
        setLoading(true);
        const data = await usageService.getMyHistory();
        setHistory(data || []);
      } catch (err) {
        console.error("Failed to load reading history:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    const titleMatch = (item.bookTitle || "").toLowerCase().includes(searchQuery.toLowerCase());
    const idMatch = String(item.bookId).includes(searchQuery);
    return titleMatch || idMatch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <span>⏱️ My Reading History</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review your digital book reading logs, session durations, and total interaction telemetry.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history by title or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* History Table / Cards */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-20 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
          <History size={40} className="mx-auto text-slate-600" />
          <h3 className="text-base font-bold text-white">No Reading History Recorded</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? `No logs match "${searchQuery}".`
              : "As you open and read titles in the Digital Reader, your activity logs will appear here."}
          </p>
          <Link
            to="/books"
            className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all"
          >
            Start Reading
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-start sm:items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white line-clamp-1">
                    {item.bookTitle || `Digital Book #${item.bookId}`}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="font-mono text-cyan-400">Book ID: #{item.bookId}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={13} />
                      <span>{new Date(item.accessDate).toLocaleString()}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 text-amber-400 font-medium">
                      <Clock size={13} />
                      <span>{item.durationMinutes} mins read</span>
                    </span>
                    <span>•</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Access count: {item.userBookAccessCount || 1}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center">
                <Link
                  to={`/reader/${item.bookId}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center space-x-1.5"
                >
                  <span>Re-read</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
