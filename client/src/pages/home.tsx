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
      {/* World-Class Demo Video Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        
        {/* Subtle Premium Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
                                 radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.06) 0%, transparent 50%)`
               }}>
          </div>
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Enhanced SuntynAI Logo */}
          <div className="mb-16 flex justify-center">
            <div className="relative">
              <AnimatedLogo size={180} showRays={true} className="drop-shadow-2xl" />
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>

          {/* Premium Demo Video Player */}
          <div className="relative group mb-12">
            <div className="relative aspect-video max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
              
              {/* Video Thumbnail/Hero Content */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
                <div className="text-center space-y-8 px-8">
                  
                  {/* Play Button with Premium Effects */}
                  <button className="group/play relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-700 hover:scale-110 transform">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover/play:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover/play:opacity-100 transition-opacity duration-500"></div>
                    <svg className="relative z-10 w-12 h-12 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  
                  {/* Video Title and Description */}
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      SuntynAI Demo Experience
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                      Discover how 85+ AI-powered tools transform your productivity workflow in under 3 minutes
                    </p>
                    
                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                      <span className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-sm font-medium">
                        📄 PDF Tools
                      </span>
                      <span className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium">
                        🖼️ Image Tools
                      </span>
                      <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
                        🎵 Audio/Video
                      </span>
                      <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-300 text-sm font-medium">
                        🏛️ Government
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-6">
                    <button className="hover:text-cyan-400 transition-colors p-2">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                    <div className="text-sm font-medium">0:00 / 2:45</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <button className="hover:text-cyan-400 transition-colors p-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142"/>
                      </svg>
                    </button>
                    <button className="hover:text-cyan-400 transition-colors p-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-slate-600/50 rounded-full h-2 mt-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full w-1/4 transition-all duration-500"></div>
                </div>
              </div>
            </div>
            
            {/* Premium Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold text-xl text-white shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105 transform min-w-[250px] overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Demo
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 to-purple-600/50 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            
            <Link to="/tools-dashboard">
              <button className="px-12 py-5 border-2 border-purple-400/50 text-purple-300 rounded-full font-bold text-xl hover:bg-purple-400/10 hover:border-purple-400 hover:text-purple-200 transition-all duration-500 hover:scale-105 transform min-w-[250px] backdrop-blur-sm">
                Explore 85+ Tools
              </button>
            </Link>
          </div>

          {/* Tool Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-3xl flex items-center justify-center text-4xl border border-red-500/30 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-red-500/30 group-hover:shadow-xl">
                📄
              </div>
              <div className="text-red-400 font-bold text-lg mb-2">PDF Tools</div>
              <div className="text-slate-400 text-sm">25+ Features</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-3xl flex items-center justify-center text-4xl border border-green-500/30 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-green-500/30 group-hover:shadow-xl">
                🖼️
              </div>
              <div className="text-green-400 font-bold text-lg mb-2">Image Tools</div>
              <div className="text-slate-400 text-sm">25+ Features</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-3xl flex items-center justify-center text-4xl border border-blue-500/30 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-blue-500/30 group-hover:shadow-xl">
                🎵
              </div>
              <div className="text-blue-400 font-bold text-lg mb-2">Audio/Video</div>
              <div className="text-slate-400 text-sm">20+ Features</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-3xl flex items-center justify-center text-4xl border border-yellow-500/30 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-yellow-500/30 group-hover:shadow-xl">
                🏛️
              </div>
              <div className="text-yellow-400 font-bold text-lg mb-2">Government</div>
              <div className="text-slate-400 text-sm">15+ Features</div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="text-slate-400 text-sm font-medium">✅ No Registration</div>
            <div className="text-slate-400 text-sm font-medium">🔒 Privacy First</div>
            <div className="text-slate-400 text-sm font-medium">⚡ Instant Processing</div>
            <div className="text-slate-400 text-sm font-medium">🆓 Always Free</div>
          </div>
        </div>
      </section>

      {/* Tool Categories Section */}
      <section id="categories" className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tool Categories
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose from our comprehensive collection of professional-grade tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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