import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 text-white font-bold text-xl mb-2">
              <span className="text-2xl">📚</span>
              <span>ScholarSphere Digital</span>
            </div>
            <p className="text-blue-400 text-sm font-medium mb-3">
              Your Gateway to Digital Knowledge
            </p>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Explore books, academic journals, and research documents in one simple digital knowledge platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Content
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Books
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Journals
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Research
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 ScholarSphere Digital. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for B.Tech Microservices Architecture</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
