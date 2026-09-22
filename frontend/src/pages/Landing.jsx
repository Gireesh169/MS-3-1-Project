import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import { academicImages } from "../assets/images/imageUrls";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* 3. Navigation Bar */}
      <Navbar variant="landing" />

      {/* 4 & 5. Hero Section */}
      <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide uppercase">
                <span>📚</span>
                <span>ScholarSphere Digital</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                DIGITAL KNOWLEDGE,{" "}
                <span className="text-blue-600">WITHOUT LIMITS.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover books, journals and research documents in one place.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#categories"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all text-center"
                >
                  Explore Knowledge
                </a>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-all text-center"
                >
                  Login
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center space-x-1.5">
                  <span className="text-emerald-500">✔</span>
                  <span>JWT Secure Access</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="text-blue-500">✔</span>
                  <span>Peer-Reviewed Content</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="text-indigo-500">✔</span>
                  <span>Microservices Architecture</span>
                </span>
              </div>
            </div>

            {/* Right Column: Layered Digital Library Composition */}
            <div className="lg:col-span-6 relative flex items-center justify-center pt-8 lg:pt-0">
              {/* Central Primary Container */}
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
                <img
                  src={academicImages.heroOpenBook}
                  alt="Open academic book in digital library"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    // Fallback CSS placeholder
                    e.target.style.display = "none";
                  }}
                />
                {/* Fallback CSS Placeholder visual inside if image fails */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-900 -z-1 flex flex-col items-center justify-center text-center p-6">
                  <span className="text-5xl mb-2">📖</span>
                  <span className="text-white font-bold text-lg">Digital Knowledge Workspace</span>
                  <span className="text-slate-300 text-xs mt-1">ScholarSphere Digital Repository</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs uppercase font-semibold text-blue-400 tracking-wider">
                    Digital Repository
                  </span>
                  <p className="text-white font-bold text-lg sm:text-xl">
                    Open Book Knowledge Base
                  </p>
                </div>
              </div>

              {/* Floating Layer 1: Research Paper (Top Right) */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl max-w-[210px] animate-float-slow hidden sm:block">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">📄</span>
                  <span className="text-xs font-bold text-slate-900">Research Paper</span>
                </div>
                <div className="h-0.5 w-full bg-blue-500 rounded my-1.5" />
                <p className="text-[11px] text-slate-600 font-medium">
                  Academic Study &amp; Citations
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Peer Reviewed</span>
                  <span className="text-blue-600 font-semibold">PDF</span>
                </div>
              </div>

              {/* Floating Layer 2: Academic Journal (Bottom Left) */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl max-w-[220px] animate-float-delayed">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">📰</span>
                  <span className="text-xs font-bold text-slate-900">Academic Journal</span>
                </div>
                <div className="h-0.5 w-full bg-emerald-500 rounded my-1.5" />
                <p className="text-[11px] text-slate-600 font-medium">
                  Publications &amp; Findings
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Issue 2026</span>
                  <span className="text-emerald-600 font-semibold">Active</span>
                </div>
              </div>

              {/* Floating Layer 3: Digital Badge (Top Left) */}
              <div className="absolute top-8 left-0 bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 shadow-lg text-[11px] font-semibold flex items-center space-x-2 animate-float-reverse hidden md:flex">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>ScholarSphere Core</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. Knowledge Categories */}
      <section id="categories" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Explore Knowledge
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Discover curated digital textbooks, indexed journals, and research documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Digital Books */}
            <FeatureCard
              icon="📚"
              badge="Books"
              title="Digital Books"
              description="Explore books and learning resources across engineering, science, and technology."
              image={academicImages.categoryBooks}
              onClick={() => {}}
            />

            {/* Card 2: Academic Journals */}
            <FeatureCard
              icon="📰"
              badge="Journals"
              title="Academic Journals"
              description="Read academic journals and publications with vetted research insights."
              image={academicImages.categoryJournals}
              onClick={() => {}}
            />

            {/* Card 3: Research Documents */}
            <FeatureCard
              icon="📄"
              badge="Research"
              title="Research Documents"
              description="Access research papers and academic documents to support your studies and projects."
              image={academicImages.categoryResearch}
              onClick={() => {}}
            />
          </div>
        </div>
      </section>

      {/* 7. How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Three simple steps to unlock your digital learning resources.
            </p>
          </div>

          {/* Desktop Timeline / Mobile Stack */}
          <div className="relative">
            {/* Horizontal Timeline Connector on Desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-slate-300 -translate-y-6 -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* Step 01 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center relative group hover:border-blue-400 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  01
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Create Account
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Create your ScholarSphere account with your academic email and credentials.
                </p>
              </div>

              {/* Step 02 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center relative group hover:border-blue-400 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  02
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Choose Your Access
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Select a subscription plan based on your academic research and learning needs.
                </p>
              </div>

              {/* Step 03 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center relative group hover:border-blue-400 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  03
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Explore Knowledge
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Read books, journals and research documents directly inside your browser.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. Platform Highlights */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Everything You Need to Learn
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Built on clean microservices with enterprise-grade security and access control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Highlight 1: Secure Access */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl mb-4">
                🔐
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Secure Access
              </h3>
              <p className="text-sm text-slate-600">
                JWT-based authentication protecting user identities and sessions.
              </p>
            </div>

            {/* Highlight 2: Digital Library */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-4">
                📚
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Digital Library
              </h3>
              <p className="text-sm text-slate-600">
                Books and academic resources categorized for fast retrieval.
              </p>
            </div>

            {/* Highlight 3: Subscription Plans */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-4">
                ⭐
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Subscription Plans
              </h3>
              <p className="text-sm text-slate-600">
                Access based on your plan managed via dedicated Access Service.
              </p>
            </div>

            {/* Highlight 4: Usage Tracking */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl mb-4">
                📊
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Usage Tracking
              </h3>
              <p className="text-sm text-slate-600">
                Track reading and downloads with accurate service telemetry.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 9. About ScholarSphere */}
      <section id="about" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Academic Library Visual */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 aspect-[4/3]">
                <img
                  src={academicImages.aboutLibrary}
                  alt="Modern academic library architecture"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white text-sm font-semibold">
                    Architected for high-performance academic research
                  </p>
                </div>
              </div>
            </div>

            {/* Right: About Text */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Built for Digital Knowledge
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                ScholarSphere Digital brings digital books, academic journals, and research documents together in one organized platform.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                The platform uses a microservices architecture with secure authentication and subscription-based access control.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm">
                  ⚡ Spring Boot Microservices
                </span>
                <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm">
                  🛡️ JWT Authentication
                </span>
                <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm">
                  🌐 Spring Cloud Gateway
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. CTA Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Ambient decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-block text-xs font-bold text-blue-400 tracking-wider uppercase bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-blue-800">
            Start Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to explore digital knowledge?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Start your ScholarSphere journey today. Access hundreds of academic resources in seconds.
          </p>
          <div className="pt-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <span>Get Started</span>
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}

export default Landing;
