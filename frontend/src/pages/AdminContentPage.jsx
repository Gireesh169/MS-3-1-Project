import React, { useState, useEffect } from "react";
import contentService from "../services/contentService";
import {
  Layers,
  Search,
  Plus,
  Trash2,
  BookOpen,
  FileText,
  Upload,
  X,
  AlertCircle,
} from "lucide-react";

export default function AdminContentPage() {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    type: "BOOK",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const data = await contentService.getAllContent();
      setContentList(data || []);
    } catch (err) {
      console.error("Failed to load content list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete content ID #${id}?`)) {
      return;
    }
    try {
      await contentService.deleteContent(id);
      setContentList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting content:", err);
      alert("Failed to delete content.");
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.title.trim()) {
      setFormError("Title is required.");
      return;
    }
    if (!formData.author.trim()) {
      setFormError("Author is required.");
      return;
    }

    setFormSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim(),
        type: formData.type,
      };

      if (selectedFile) {
        await contentService.uploadContent(payload, selectedFile);
      } else {
        await contentService.createContent(payload);
      }

      // Close modal and refresh
      setIsModalOpen(false);
      setFormData({
        title: "",
        author: "",
        description: "",
        type: "BOOK",
      });
      setSelectedFile(null);
      await fetchContent();
    } catch (err) {
      console.error("Content upload error:", err);
      setFormError(
        err.response?.data?.message ||
        err.message ||
        "Failed to upload content. Please check microservice connectivity."
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  const filteredContent = contentList.filter((item) => {
    const matchesType = typeFilter === "ALL" || item.type === typeFilter;
    const matchesSearch =
      (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.author || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(item.id).includes(searchQuery);

    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <span>📚 Content Repository Management</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Publish, categorize, and manage digital books, peer-reviewed journals, and technical documents.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Upload Content</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Type Filter Buttons */}
        <div className="flex items-center space-x-2">
          {["ALL", "BOOK", "JOURNAL", "RESEARCH_DOCUMENT"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                typeFilter === t
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              }`}
            >
              {t === "RESEARCH_DOCUMENT" ? "RESEARCH" : t}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Table of Content */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Author</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">File Attachment</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    Loading content repository...
                  </td>
                </tr>
              ) : filteredContent.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    No content entries match your filter.
                  </td>
                </tr>
              ) : (
                filteredContent.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">#{item.id}</td>
                    <td className="py-4 px-6 font-bold text-white max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="py-4 px-6 text-slate-300">{item.author}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                          item.type === "BOOK"
                            ? "bg-blue-500/10 text-cyan-400 border border-blue-500/20"
                            : item.type === "JOURNAL"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {item.type || "BOOK"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400 font-mono">
                      {item.fileName && item.fileName !== "none" ? item.fileName : "Metadata Only"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Content"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload/Create Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Upload New Digital Content</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center space-x-2">
                <AlertCircle size={14} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Content Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Distributed Computing Principles"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Author / Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g. Leslie Lamport"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Content Category *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white outline-none focus:border-cyan-400"
                >
                  <option value="BOOK">BOOK (Digital Textbook)</option>
                  <option value="JOURNAL">JOURNAL (Academic Journal Article)</option>
                  <option value="RESEARCH_DOCUMENT">RESEARCH_DOCUMENT (Research Paper / Thesis)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description / Abstract</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary or synopsis of this document..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Document Attachment (PDF or File)
                </label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                  className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-cyan-400 hover:file:bg-slate-700 cursor-pointer"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50"
                >
                  {formSubmitting ? "Uploading..." : "Save & Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
