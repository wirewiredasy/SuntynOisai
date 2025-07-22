
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/animated-logo";

export default function Error404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Animated 404 Graphics */}
          <div className="relative mb-12">
            <div className="text-9xl md:text-[12rem] font-black mb-8 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 bg-clip-text text-transparent select-none">
              404
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <AnimatedLogo size={80} showRays={true} className="animate-pulse" />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500/20 rounded-full animate-bounce delay-1000"></div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Page Not Found
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-6">
              The page you're looking for seems to have vanished into the digital void.
            </p>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Don't worry though! Our 85+ AI tools are still working perfectly. 
              Let's get you back to transforming your files with enterprise-grade AI processing.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="text-lg font-bold text-white mb-2">Go Home</h3>
              <p className="text-slate-400 text-sm mb-4">Return to the main page and explore our tools</p>
              <Link to="/">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  Home Page
                </Button>
              </Link>
            </div>
            
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-3xl mb-4">🛠️</div>
              <h3 className="text-lg font-bold text-white mb-2">Browse Tools</h3>
              <p className="text-slate-400 text-sm mb-4">Discover our complete collection of AI tools</p>
              <Link to="/tools-dashboard">
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800">
                  View Tools
                </Button>
              </Link>
            </div>
            
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-white mb-2">Get Help</h3>
              <p className="text-slate-400 text-sm mb-4">Contact our support team for assistance</p>
              <Link to="/contact">
                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Popular Tools */}
          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Popular AI Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "PDF Merge", icon: "📄", path: "/tools/pdf-merge" },
                { name: "Background Remover", icon: "🖼️", path: "/tools/bg-remove" },
                { name: "Audio Converter", icon: "🎵", path: "/tools/audio-convert" },
                { name: "Document Scanner", icon: "📱", path: "/tools/doc-scan" }
              ].map((tool, index) => (
                <Link key={index} to={tool.path}>
                  <div className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer">
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <div className="text-white text-sm font-medium">{tool.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Error Code Details */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-6 py-3 border border-slate-700/50">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-slate-400 text-sm">Error Code: 404 - Resource Not Found</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
