import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import contentService from "../services/contentService";
import { Search, BookOpen, User, BookMarked, ArrowRight } from "lucide-react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const allContent = await contentService.getAllContent();
        // Filter for books (or include all if type is unspecified)
        const bookList = allContent.filter(
          (c) => !c.type || c.type === "BOOK"
        );
        setBooks(bookList);
      } catch (err) {
        console.error("Failed to load books catalog:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((b) => {
    const matchTitle = (b.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchAuthor = (b.author || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchTitle || matchAuthor;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <span>📚 Digital Books Catalog</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore and read peer-reviewed digital textbooks across technology, science, and mathematics.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
          <BookMarked size={40} className="mx-auto text-slate-600" />
          <h3 className="text-base font-bold text-white">No Books Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? `No books matching "${searchQuery}". Try a different keyword.`
              : "No digital books currently published in the catalog."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-400/20 text-cyan-400 font-mono text-[10px] font-bold uppercase">
                    BOOK
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">ID #{book.id}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center space-x-1.5 mt-1.5 font-medium">
                    <User size={13} className="text-slate-500" />
                    <span>{book.author}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-400 font-light line-clamp-3 leading-relaxed">
                  {book.description || "Digital edition hosted on ScholarSphere Content Microservice repository."}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <Link
                  to={`/books/${book.id}`}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all"
                >
                  Details
                </Link>
                <Link
                  to={`/reader/${book.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20 transition-all flex items-center space-x-1.5"
                >
                  <BookOpen size={14} />
                  <span>Read Now</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
