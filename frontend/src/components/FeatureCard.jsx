import React from "react";

function FeatureCard({
  icon,
  title,
  description,
  image,
  badge,
  onClick,
  className = "",
}) {
  return (
    <div
      onClick={onClick}
      className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col justify-between ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Optional image preview with safe placeholder */}
      {image && (
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Hide broken image and fall back to clean gradient background
              e.target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            {icon && (
              <span className="text-3xl p-2 rounded-xl bg-blue-50 border border-blue-100 group-hover:scale-110 transition-transform">
                {icon}
              </span>
            )}
            {badge && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {badge}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
            {title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>

        {onClick && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
            <span>Access Resource</span>
            <span className="ml-1">→</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeatureCard;
