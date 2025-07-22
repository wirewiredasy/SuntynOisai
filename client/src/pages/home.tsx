import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/animated-logo";
import CategoryCard from "@/components/category-card";
import ToolCard from "@/components/tool-card";
import { TOOL_CATEGORIES, ALL_80_TOOLS } from "@/lib/comprehensive-tools";
import { Play } from "lucide-react";

const FEATURED_TOOLS = ALL_80_TOOLS.slice(0, 8);

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Counter animation
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('[data-count]');
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-count') || '0');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target.toString() + (target === 100 ? '%' : target === 24 ? '/7' : '+');
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current).toString() + (target === 100 ? '%' : target === 24 ? '/7' : '+');
              }
            }, 40);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* World-Class Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
        
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Main Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Hero Headlines */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <AnimatedLogo size={120} showRays={false} className="mx-auto drop-shadow-2xl" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
              SuntynAI
            </h1>
            
            <h2 className="text-2xl md:text-4xl font-bold text-slate-200 mb-6 max-w-4xl mx-auto leading-relaxed">
              85+ Professional AI Tools in One Platform
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform documents, images, audio, and videos with enterprise-grade AI processing. No registration, completely free, privacy-first.
            </p>
          </div>

          {/* Professional Demo Video */}
          <div className="relative group mb-12 max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20">
              
              {/* Actual Video Implementation */}
              <video 
                className="w-full h-full object-cover"
                poster="data:image/svg+xml,%3Csvg width='1200' height='675' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23334155'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%23e2e8f0' text-anchor='middle' dy='.3em'%3ESuntynAI Demo%3C/text%3E%3C/svg%3E"
                controls
                preload="metadata"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                <source src="/demo-video.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Overlay for Non-Video Fallback */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800/90 to-slate-900/90 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <div className="text-center">
                  <button className="group/play relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                  <p className="text-white text-lg font-semibold mt-6 mb-2">Watch SuntynAI in Action</p>
                  <p className="text-slate-300 text-sm">See how 85+ tools work seamlessly</p>
                </div>
              </div>
            </div>
            
            {/* Video Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/tools-dashboard">
              <Button className="relative group px-10 py-6 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 min-w-[280px] overflow-hidden">
                <span className="relative z-10">Start Using Tools Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            
            <button className="px-10 py-6 border-2 border-purple-400/40 text-purple-200 rounded-xl font-bold text-lg hover:bg-purple-400/10 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 min-w-[280px] backdrop-blur-sm">
              Watch Demo Video
            </button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-purple-200 font-semibold">Instant Processing</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="text-cyan-200 font-semibold">Privacy First</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center border border-green-500/30">
                <span className="text-2xl">🆓</span>
              </div>
              <div className="text-green-200 font-semibold">Always Free</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <span className="text-2xl">🚀</span>
              </div>
              <div className="text-orange-200 font-semibold">85+ AI Tools</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories Section */}
      <section id="categories" className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Tool Categories
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Enterprise-grade AI tools organized by category for maximum productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TOOL_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Tools
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Most popular and powerful tools across all categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {FEATURED_TOOLS.map((tool, index) => (
              <ToolCard key={index} tool={{
                id: index,
                name: tool.name,
                slug: tool.id,
                description: tool.description,
                icon: tool.icon.toLowerCase(),
                category: "featured",
                isActive: true
              }} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/tools-dashboard">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-8 py-4 text-lg font-bold">
                View All 85+ Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose SuntynAI?
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Experience the next generation of AI-powered productivity tools designed for professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Experience blazing-fast processing with our optimized infrastructure. Most tools complete in under 5 seconds."
              },
              {
                icon: "🛡️",
                title: "100% Secure",
                description: "Your files are processed securely and automatically deleted after completion. No data is stored or shared."
              },
              {
                icon: "📱",
                title: "Mobile Optimized",
                description: "All tools work perfectly on mobile devices with touch-friendly interfaces and responsive design."
              },
              {
                icon: "❤️",
                title: "Always Free",
                description: "All 85+ tools are completely free to use. No hidden fees, subscriptions, or registration required."
              },
              {
                icon: "🇮🇳",
                title: "Made in India",
                description: "Proudly built in India with a focus on solving real problems for Indian users and businesses."
              },
              {
                icon: "🚀",
                title: "Regular Updates",
                description: "New tools and features added regularly based on user feedback and emerging needs."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-800/70">
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-8">
              <AnimatedLogo size={80} showRays={false} />
            </div>
            <div className="text-slate-400 mb-6">
              <p className="text-lg mb-4">SuntynAI - Empowering Digital India with AI Tools</p>
              <p className="text-sm">Built with ❤️ for creators, students, and professionals</p>
            </div>
            <div className="flex justify-center items-center gap-8 text-slate-500 text-sm">
              <span>© 2025 SuntynAI</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}