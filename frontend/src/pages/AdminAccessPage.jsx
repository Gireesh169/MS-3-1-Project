import React, { useState } from "react";
import accessService from "../services/accessService";
import {
  CreditCard,
  Plus,
  CheckCircle2,
  AlertCircle,
  Search,
  Check,
  X,
  ShieldAlert,
} from "lucide-react";

export default function AdminAccessPage() {
  const [planForm, setPlanForm] = useState({
    planType: "PREMIUM",
    price: 29.99,
    canView: true,
    canDownload: true,
    canAccessBooks: true,
    canAccessJournals: true,
    canAccessResearch: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Inspect user subscription state
  const [searchUsername, setSearchUsername] = useState("");
  const [userSubResult, setUserSubResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");
    setSubmitting(true);

    try {
      const result = await accessService.createPlan({
        planType: planForm.planType,
        price: Number(planForm.price),
        canView: planForm.canView,
        canDownload: planForm.canDownload,
        canAccessBooks: planForm.canAccessBooks,
        canAccessJournals: planForm.canAccessJournals,
        canAccessResearch: planForm.canAccessResearch,
      });

      setMessage(`Plan '${result.planType}' configured successfully in Access Service!`);
    } catch (err) {
      console.error("Plan configuration error:", err);
      setErrorMessage("Failed to create plan in Access Service.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInspectUser = async (e) => {
    e.preventDefault();
    if (!searchUsername.trim()) return;

    setSearchLoading(true);
    setSearchError("");
    setUserSubResult(null);

    try {
      const sub = await accessService.getSubscription(searchUsername.trim());
      if (!sub) {
        setSearchError(`No active subscription found for user "${searchUsername}".`);
      } else {
        // Also check their live view permissions
        const [canViewBook, canViewJournal, canDownload] = await Promise.all([
          accessService.canView(searchUsername.trim(), "BOOK"),
          accessService.canView(searchUsername.trim(), "JOURNAL"),
          accessService.canDownload(searchUsername.trim(), "BOOK"),
        ]);
        setUserSubResult({
          ...sub,
          permissions: { canViewBook, canViewJournal, canDownload },
        });
      }
    } catch (err) {
      setSearchError("Failed to lookup user subscription.");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <span>🛡️ Access Service & Subscription Rules</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure tier entitlements, download limits, and verify student permissions in the Access Service microservice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Create / Update Plan */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <Plus size={18} className="text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Configure Subscription Plan</h2>
          </div>

          {message && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle2 size={14} />
              <span>{message}</span>
            </div>
          )}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center space-x-2">
              <AlertCircle size={14} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleCreatePlan} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Plan Tier</label>
                <select
                  value={planForm.planType}
                  onChange={(e) => setPlanForm({ ...planForm, planType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white outline-none focus:border-cyan-400"
                >
                  <option value="FREE">FREE</option>
                  <option value="BASIC">BASIC</option>
                  <option value="PREMIUM">PREMIUM</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Monthly Price ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={planForm.price}
                  onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Permission Toggles */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Entitlement Permissions
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: "canView", label: "Can View Content (Reader)" },
                  { key: "canDownload", label: "Can Download Documents" },
                  { key: "canAccessBooks", label: "Can Access Digital Books" },
                  { key: "canAccessJournals", label: "Can Access Journals" },
                  { key: "canAccessResearch", label: "Can Access Research Papers" },
                ].map((perm) => (
                  <label
                    key={perm.key}
                    className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs text-slate-200 select-none"
                  >
                    <input
                      type="checkbox"
                      checked={planForm[perm.key]}
                      onChange={(e) => setPlanForm({ ...planForm, [perm.key]: e.target.checked })}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 focus:ring-0"
                    />
                    <span>{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
            >
              {submitting ? "Saving Plan..." : "Configure Plan in Access Service"}
            </button>
          </form>
        </div>

        {/* Right Column: User Subscription Inspection */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
              <Search size={18} className="text-cyan-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Inspect User Access</h2>
            </div>

            <p className="text-xs text-slate-400">
              Lookup any student username to inspect active plan type and live permission matrix.
            </p>

            <form onSubmit={handleInspectUser} className="flex gap-2">
              <input
                type="text"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                placeholder="Enter username (e.g. gireesh)"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={searchLoading}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all"
              >
                {searchLoading ? "Checking..." : "Inspect"}
              </button>
            </form>

            {searchError && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                {searchError}
              </div>
            )}

            {userSubResult && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">User</span>
                  <span className="text-xs font-bold text-white">{userSubResult.username}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Assigned Plan</span>
                  <span className="text-xs font-bold text-cyan-400 font-mono">
                    {userSubResult.planType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Status</span>
                  <span className="text-xs font-bold text-emerald-400">
                    {userSubResult.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs text-slate-300">
                  <p className="text-[10px] font-mono text-slate-500 uppercase">Live Entitlements</p>
                  <p className="flex items-center justify-between">
                    <span>Read Books:</span>
                    <span>{userSubResult.permissions?.canViewBook ? "✅ Granted" : "❌ Denied"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span>Read Journals:</span>
                    <span>{userSubResult.permissions?.canViewJournal ? "✅ Granted" : "❌ Denied"}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span>Download Files:</span>
                    <span>{userSubResult.permissions?.canDownload ? "✅ Granted" : "❌ Denied"}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-500 font-mono">
            Direct Service: Port 8083 (ACCESS-SERVICE)
          </div>
        </div>
      </div>
    </div>
  );
}
