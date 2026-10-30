import React, { useState, useEffect } from "react";
import usageService from "../services/usageService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { BarChart3, TrendingUp, Clock, Eye, RefreshCw } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Single book telemetry lookup
  const [lookupId, setLookupId] = useState("");
  const [bookStats, setBookStats] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await usageService.getMostAccessed(8);
      // Format data for Recharts
      const formatted = (data || []).map((item) => ({
        name:
          (item.bookTitle || `Book #${item.bookId}`).length > 20
            ? (item.bookTitle || `Book #${item.bookId}`).substring(0, 18) + "..."
            : item.bookTitle || `Book #${item.bookId}`,
        fullTitle: item.bookTitle || `Book #${item.bookId}`,
        accessCount: Number(item.accessCount || 0),
        duration: Number(item.totalDurationMinutes || 0),
        bookId: item.bookId,
      }));
      setTopBooks(formatted);
    } catch (err) {
      console.error("Failed to load platform analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupId.trim()) return;

    try {
      setLookupLoading(true);
      const res = await usageService.getBookStats(lookupId.trim());
      setBookStats(res);
    } catch (err) {
      console.error("Book stats lookup error:", err);
    } finally {
      setLookupLoading(false);
    }
  };

  const chartColors = ["#38bdf8", "#818cf8", "#c084fc", "#f59e0b", "#34d399", "#f472b6"];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <span>📈 Platform Reading Telemetry & Analytics</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time reader engagement data aggregated directly from the Usage Service microservice.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center space-x-2 text-xs font-semibold self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Total Accesses by Book */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye size={18} className="text-cyan-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Reading Sessions per Title
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Top Titles</span>
          </div>

          <div className="h-72 w-full pt-4">
            {topBooks.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                No telemetry recorded yet in Usage Service
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topBooks} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={10}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                  />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090d16",
                      borderColor: "#1e293b",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="accessCount" radius={[6, 6, 0, 0]}>
                    {topBooks.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 2: Total Reading Duration (Minutes) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock size={18} className="text-amber-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Reading Duration by Book (Minutes)
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Total Minutes</span>
          </div>

          <div className="h-72 w-full pt-4">
            {topBooks.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                No telemetry recorded yet in Usage Service
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topBooks} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={10}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                  />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090d16",
                      borderColor: "#1e293b",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="duration" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Book-Specific Telemetry Inspector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
          <TrendingUp size={18} className="text-cyan-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Single Book Telemetry Inspector
          </h2>
        </div>

        <form onSubmit={handleLookup} className="flex gap-3 max-w-md">
          <input
            type="number"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            placeholder="Enter Book ID (e.g. 1)"
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={lookupLoading}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-600 hover:bg-cyan-500 text-white transition-all"
          >
            {lookupLoading ? "Inspecting..." : "Inspect Telemetry"}
          </button>
        </form>

        {bookStats && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase">TITLE</span>
              <p className="text-sm font-bold text-white mt-1 truncate">
                {bookStats.bookTitle || `Book #${bookStats.bookId}`}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase">TOTAL SESSIONS</span>
              <p className="text-xl font-extrabold text-cyan-400 mt-1">
                {bookStats.totalAccessCount}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase">TOTAL DURATION</span>
              <p className="text-xl font-extrabold text-amber-400 mt-1">
                {bookStats.totalReadingDurationMinutes} mins
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase">UNIQUE READERS</span>
              <p className="text-xl font-extrabold text-purple-400 mt-1">
                {bookStats.uniqueReadersCount}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
