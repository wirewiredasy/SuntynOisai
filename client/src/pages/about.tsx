
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/animated-logo";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <AnimatedLogo size={100} showRays={false} className="mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            About SuntynAI
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing productivity with cutting-edge AI technology designed for the modern world.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              At SuntynAI, we believe that artificial intelligence should empower everyone, not just tech experts. 
              Our mission is to democratize AI tools and make advanced processing capabilities accessible to 
              individuals, businesses, and organizations worldwide.
            </p>
            <p className="text-slate-300 leading-relaxed">
              We're building the future where complex AI operations are as simple as drag-and-drop, 
              where privacy is paramount, and where powerful tools are always free.
            </p>
          </div>
          
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">Our Vision</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-slate-300">Empower 1 billion users with AI tools by 2030</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-slate-300">Maintain 100% privacy-first approach</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-slate-300">Lead innovation in accessible AI technology</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { number: "85+", label: "AI Tools", icon: "🚀" },
            { number: "1M+", label: "Files Processed", icon: "📄" },
            { number: "50+", label: "Countries", icon: "🌍" },
            { number: "99.9%", label: "Uptime", icon: "⚡" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link to="/tools">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-8 py-4 text-lg font-bold">
              Explore Our Tools
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
