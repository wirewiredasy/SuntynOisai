import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedLogo from "@/components/animated-logo";
import CategoryCard from "@/components/category-card";
import ToolCard from "@/components/tool-card";
import { TOOL_CATEGORIES, ALL_80_TOOLS } from "@/lib/comprehensive-tools";

import { FileText, Image, Music, Landmark, Rocket, Play } from "lucide-react";

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
      {/* Using global mobile header */}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden hero-gradient">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 animate-float">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <FileText className="text-red-400 w-8 h-8" />
            </div>
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float" style={{animationDelay: '1s'}}>
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Image className="text-blue-400 w-10 h-10" />
            </div>
          </div>
          <div className="absolute bottom-1/3 left-1/6 animate-float" style={{animationDelay: '2s'}}>
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <Music className="text-green-400 w-6 h-6" />
            </div>
          </div>
          <div className="absolute top-1/2 right-1/6 animate-float" style={{animationDelay: '0.5s'}}>
            <div className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Landmark className="text-yellow-400 w-7 h-7" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Large Animated Logo */}
            <div className="mb-8">
              <AnimatedLogo size={150} showRays={true} />
            </div>

            {/* Hero Title */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 gradient-text leading-tight">
              SuntynAI
            </h1>
            
            <p className="text-2xl md:text-3xl font-bold text-slate-300 mb-4">
              NEURAL INTELLIGENCE
            </p>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              80+ Professional AI-Powered Tools for PDF Processing, Image Editing, 
              Audio/Video Conversion, Government Documents, and Business Tools
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/tools">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 px-12 py-4 text-lg font-bold hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300">
                  <Rocket className="w-5 h-5 mr-3" />
                  Explore All Tools
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-12 py-4 text-lg font-bold transition-all duration-300">
                <Play className="w-5 h-5 mr-3" />
                Watch Demo
              </Button>
            </div>

            {/* Stats Counter */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-black text-amber-400 mb-2" data-count="80">0</div>
                <div className="text-slate-400 font-semibold text-sm md:text-base">Professional Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-black text-green-400 mb-2" data-count="100">0</div>
                <div className="text-slate-400 font-semibold text-sm md:text-base">Free to Use</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-black text-blue-400 mb-2" data-count="24">0</div>
                <div className="text-slate-400 font-semibold text-sm md:text-base">Hours Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories Section */}
      <section id="categories" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 gradient-text">
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
            <h2 className="text-5xl font-black mb-6 gradient-text">
              Featured Tools
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Most popular and powerful tools across all categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {FEATURED_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600">
                View All 80 Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 gradient-text">
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
                description: "All 80+ tools are completely free to use forever. No hidden fees, no subscriptions, no limitations."
              },
              {
                icon: "🧠",
                title: "AI-Powered",
                description: "Advanced artificial intelligence algorithms power our tools for superior quality and intelligent processing."
              },
              {
                icon: "🎧",
                title: "24/7 Support",
                description: "Get help whenever you need it with our comprehensive help center and responsive support team."
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700/50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <AnimatedLogo size={48} />
                <div>
                  <h3 className="text-2xl font-bold gradient-text">SuntynAI</h3>
                  <p className="text-sm text-slate-400 font-medium">NEURAL INTELLIGENCE</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                The ultimate AI-powered productivity platform with 80+ professional tools. 
                Transform your workflow with cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/tools" className="text-slate-400 hover:text-purple-400 transition-colors">All Tools</Link></li>
                <li><Link href="/tools/pdf" className="text-slate-400 hover:text-purple-400 transition-colors">PDF Tools</Link></li>
                <li><Link href="/tools/image" className="text-slate-400 hover:text-purple-400 transition-colors">Image Tools</Link></li>
                <li><Link href="/tools/audio" className="text-slate-400 hover:text-purple-400 transition-colors">Audio/Video</Link></li>
                <li><Link href="/tools/government" className="text-slate-400 hover:text-purple-400 transition-colors">Government</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">API Documentation</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2025 SuntynAI. All rights reserved. Made with ❤️ for productivity.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.89 2.745.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.751-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 23.954 12.017 23.954c6.624 0 11.99-5.367 11.99-11.99C24.007 5.367 18.641.001.012.017z.001"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
