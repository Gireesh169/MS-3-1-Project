import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import contentService from "../services/contentService";
import usageService from "../services/usageService";
import {
  ShieldCheck,
  BookOpen,
  FileText,
  Users,
  BarChart3,
  Layers,
  ArrowRight,
  TrendingUp,
  Server,
  Plus,
} from "lucide-react";

export default function AdminDashboard() {
  const [contentList, setContentList] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      try {
        setLoading(true);
        const [contentData, popularData] = await Promise.allSettled([
          contentService.getAllContent(),
          usageService.getMostAccessed(5),
        ]);

        if (contentData.status === "fulfilled") setContentList(contentData.value || []);
        if (popularData.status === "fulfilled") setPopularBooks(popularData.value || []);
      } catch (err) {
        console.error("Admin dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  const booksCount = contentList.filter((c) => !c.type || c.type === "BOOK").length;
  const journalsCount = contentList.filter((c) => c.type === "JOURNAL").length;
  const researchCount = contentList.filter((c) => c.type === "RESEARCH_DOCUMENT").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase">
            <ShieldCheck size={14} />
            <span>ScholarSphere System Administration</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Administrator Control Center
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Monitor digital knowledge repositories, manage subscription permissions, and inspect real-time usage telemetry across all microservices.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/admin/content"
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Publish Content</span>
            </Link>
            <Link
              to="/admin/analytics"
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center space-x-2"
            >
              <BarChart3 size={16} />
              <span>View Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
            <span>TOTAL PUBLISHED CONTENT</span>
            <Layers size={18} className="text-cyan-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white">{contentList.length}</h3>
            <p className="text-xs text-slate-500 mt-1">Across all categories</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
            <span>DIGITAL BOOKS</span>
            <BookOpen size={18} className="text-blue-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white">{booksCount}</h3>
            <p className="text-xs text-slate-500 mt-1">Textbooks & monographs</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
            <span>JOURNALS & PAPERS</span>
            <FileText size={18} className="text-amber-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white">{journalsCount + researchCount}</h3>
            <p className="text-xs text-slate-500 mt-1">Peer-reviewed publications</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
            <span>MICROSERVICES HEALTH</span>
            <Server size={18} className="text-emerald-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-emerald-400">4 / 4 ONLINE</h3>
            <p className="text-xs text-slate-500 mt-1">Eureka Cluster Healthy</p>
          </div>
        </div>
      </div>

      {/* Popular Titles & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Most Popular Titles */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp size={18} className="text-amber-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Platform-Wide Popular Titles</h2>
            </div>
            <Link to="/admin/analytics" className="text-xs font-semibold text-cyan-400 hover:underline flex items-center space-x-1">
              <span>Detailed Telemetry</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {popularBooks.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl text-xs text-slate-400">
              No usage activity logged yet in Usage Service.
            </div>
          ) : (
            <div className="space-y-3">
              {popularBooks.map((b, idx) => (
                <div
                  key={b.bookId}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {b.bookTitle || `Book ID: #${b.bookId}`}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Total Sessions: <span className="text-cyan-400 font-mono font-bold">{b.accessCount}</span> • Duration:{" "}
                        <span className="text-amber-400 font-mono font-bold">{b.totalDurationMinutes} mins</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Admin Actions */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight">Quick Actions</h2>

          <div className="space-y-3 pt-2">
            <Link
              to="/admin/content"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between group transition-all"
            >
              <div className="space-y-1">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Content Management
                </span>
                <p className="text-xs text-slate-400">Upload or delete books and journals</p>
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400" />
            </Link>

            <Link
              to="/admin/access"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between group transition-all"
            >
              <div className="space-y-1">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Access & Plans
                </span>
                <p className="text-xs text-slate-400">Create subscription tiers and rules</p>
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400" />
            </Link>

            <Link
              to="/admin/analytics"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between group transition-all"
            >
              <div className="space-y-1">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Analytics & Charts
                </span>
                <p className="text-xs text-slate-400">View reader engagement telemetry</p>
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
