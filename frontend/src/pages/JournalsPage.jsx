import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import contentService from "../services/contentService";
import { Search, FileText, User, ArrowRight, BookOpen } from "lucide-react";

export default function JournalsPage() {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchJournals() {
      try {
        setLoading(true);
        const data = await contentService.getAllContent();
        // Filter for JOURNAL and RESEARCH_DOCUMENT
        const journals = data.filter(
          (c) => c.type === "JOURNAL" || c.type === "RESEARCH_DOCUMENT"
        );
        setContentList(journals);
      } catch (err) {
        console.error("Failed to fetch journals:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJournals();
  }, []);

  const filteredItems = contentList.filter((item) => {
    const matchesTab =
      activeTab === "ALL" ||
      (activeTab === "JOURNAL" && item.type === "JOURNAL") ||
      (activeTab === "RESEARCH" && item.type === "RESEARCH_DOCUMENT");

    const matchesSearch =
      (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.author || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <span>📰 Academic Journals & Research</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Access vetted academic journals, conference papers, and peer-reviewed research monographs.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers or authors..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-3">
        {[
          { id: "ALL", label: "All Research" },
          { id: "JOURNAL", label: "Journals" },
          { id: "RESEARCH", label: "Research Documents" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
          <FileText size={40} className="mx-auto text-slate-600" />
          <h3 className="text-base font-bold text-white">No Publications Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No journal articles or research papers matching your current filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-xl transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 rounded-md font-mono text-[10px] font-bold uppercase ${
                      item.type === "JOURNAL"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">ID #{item.id}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center space-x-1.5 mt-1.5 font-medium">
                    <User size={13} className="text-slate-500" />
                    <span>{item.author}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-400 font-light line-clamp-3 leading-relaxed">
                  {item.description || "Peer-reviewed publication indexed in ScholarSphere."}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <Link
                  to={`/books/${item.id}`}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all"
                >
                  Details
                </Link>
                <Link
                  to={`/reader/${item.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20 transition-all flex items-center space-x-1.5"
                >
                  <BookOpen size={14} />
                  <span>Read Article</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
