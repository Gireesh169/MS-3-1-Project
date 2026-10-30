import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import usageService from "../services/usageService";
import accessService from "../services/accessService";
import { User, Shield, CreditCard, Clock, BookOpen, Key } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [sub, setSub] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const [statsData, subData] = await Promise.allSettled([
          usageService.getMyStats(),
          user?.username ? accessService.getSubscription(user.username) : Promise.resolve(null),
        ]);
        if (statsData.status === "fulfilled") setStats(statsData.value);
        if (subData.status === "fulfilled") setSub(subData.value);
      } catch (e) {
        console.error("Profile load error:", e);
      }
    }
    loadProfile();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <span>👤 Student Profile & Credentials</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review your account information, role permissions, and academic telemetry.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
        {/* User Identity Banner */}
        <div className="flex items-center space-x-5 pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl font-bold text-cyan-400 uppercase">
              {user?.username?.charAt(0) || "U"}
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white capitalize">
              {user?.username}
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                {user?.role || "USER"}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">ScholarSphere Academic Member</span>
            </div>
          </div>
        </div>

        {/* Profile Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Shield size={14} className="text-cyan-400" />
              <span>AUTHENTICATION LEVEL</span>
            </div>
            <p className="text-base font-bold text-white">Spring Security + JWT</p>
            <p className="text-xs text-slate-500">Stateless bearer token authentication</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <CreditCard size={14} className="text-emerald-400" />
              <span>SUBSCRIPTION STATUS</span>
            </div>
            <p className="text-base font-bold text-emerald-400 uppercase">
              {sub?.planType || "FREE TIER"}
            </p>
            <p className="text-xs text-slate-500">
              {sub?.active ? "Active subscriber" : "Continuous free access"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <BookOpen size={14} className="text-amber-400" />
              <span>BOOKS EXPLORED</span>
            </div>
            <p className="text-base font-bold text-white">{stats?.totalBooksRead ?? 0} titles</p>
            <p className="text-xs text-slate-500">Logged in Usage Service database</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Clock size={14} className="text-purple-400" />
              <span>TOTAL READING DURATION</span>
            </div>
            <p className="text-base font-bold text-white">
              {stats?.totalReadingDurationMinutes ?? 0} minutes
            </p>
            <p className="text-xs text-slate-500">Recorded across active sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
