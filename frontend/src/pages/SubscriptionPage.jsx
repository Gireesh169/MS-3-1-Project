import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import accessService from "../services/accessService";
import {
  CreditCard,
  Check,
  ShieldCheck,
  Calendar,
  Sparkles,
  Zap,
} from "lucide-react";

export default function SubscriptionPage() {
  const { user } = useAuth();

  const [currentSub, setCurrentSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchSubscription = async () => {
    if (!user?.username) return;
    try {
      setLoading(true);
      const sub = await accessService.getSubscription(user.username);
      setCurrentSub(sub);
    } catch (err) {
      console.error("Error fetching subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  const handleSubscribe = async (planType) => {
    if (!user?.username) return;
    setSuccessMessage("");
    setErrorMessage("");
    setActionLoading(true);

    try {
      const res = await accessService.subscribe(user.username, planType);
      setCurrentSub(res);
      setSuccessMessage(`Successfully updated your plan to ${planType}!`);
    } catch (err) {
      console.error("Subscription update error:", err);
      setErrorMessage("Failed to update subscription. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const planTiers = [
    {
      type: "FREE",
      price: "$0.00",
      description: "Basic student catalog exploration",
      features: [
        "View free digital books",
        "Public catalog browsing",
        "Basic reading history",
      ],
      popular: false,
    },
    {
      type: "BASIC",
      price: "$9.99",
      description: "For active academic researchers and students",
      features: [
        "Full access to all digital books",
        "View academic journals",
        "Detailed usage telemetry",
        "Cloud reading bookmarks",
      ],
      popular: false,
    },
    {
      type: "PREMIUM",
      price: "$29.99",
      description: "Complete unrestricted access across ScholarSphere",
      features: [
        "All digital books & textbooks",
        "All peer-reviewed journals",
        "Download research papers & PDFs",
        "Priority microservices bandwidth",
        "Dedicated reading analytics",
      ],
      popular: true,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <span>💳 Subscription & Access Control</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your ScholarSphere access tier to unlock digital books, peer-reviewed journals, and downloadable research.
        </p>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center space-x-2">
          <span>✓</span>
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm flex items-center space-x-2">
          <span>⚠</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Current Active Plan Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              YOUR CURRENT SUBSCRIPTION
            </span>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                currentSub?.active
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {currentSub?.active ? "ACTIVE" : "STANDBY"}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Tier:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {currentSub?.planType || "FREE TIER"}
            </span>
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center space-x-1.5">
              <Calendar size={14} className="text-slate-500" />
              <span>
                Started:{" "}
                {currentSub?.startDate
                  ? new Date(currentSub.startDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </span>
            <span>•</span>
            <span>
              Expires:{" "}
              {currentSub?.endDate
                ? new Date(currentSub.endDate).toLocaleDateString()
                : "Continuous"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-right">
            <span className="text-[11px] text-slate-400 block font-mono">Microservice Gate</span>
            <span className="text-xs font-bold text-cyan-400 font-mono">ACCESS-SERVICE (8083)</span>
          </div>
        </div>
      </div>

      {/* Subscription Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {planTiers.map((tier) => {
          const isCurrent = (currentSub?.planType || "FREE") === tier.type;

          return (
            <div
              key={tier.type}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                tier.popular
                  ? "bg-gradient-to-b from-blue-950/60 to-slate-900 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-950/40"
                  : "bg-slate-900/80 border border-slate-800/90"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono font-bold text-[10px] uppercase tracking-wider shadow-md">
                  RECOMMENDED
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{tier.type}</h3>
                  <p className="text-xs text-slate-400 mt-1">{tier.description}</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-xs text-slate-400 ml-1">/ month</span>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-slate-300 font-light">
                      <Check size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700 cursor-default"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(tier.type)}
                    disabled={actionLoading}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                      tier.popular
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/25"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                    }`}
                  >
                    {actionLoading ? "Updating..." : `Switch to ${tier.type}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
