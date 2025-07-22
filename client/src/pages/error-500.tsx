
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/animated-logo";

export default function Error500() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Animated 500 Graphics */}
          <div className="relative mb-12">
            <div className="text-9xl md:text-[12rem] font-black mb-8 bg-gradient-to-r from-red-600/30 to-orange-600/30 bg-clip-text text-transparent select-none">
              500
            </div>
            
            {/* Glitchy Effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <AnimatedLogo size={80} showRays={false} className="opacity-70" />
                
                {/* Warning Indicators */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-300"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
                
                {/* Electrical Effect */}
                <div className="absolute inset-0 animate-pulse">
                  <div className="absolute top-2 right-2 text-yellow-400">⚡</div>
                  <div className="absolute bottom-2 left-2 text-red-400">🔥</div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent">
              Server Error
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-6">
              Our AI systems are experiencing temporary difficulties.
            </p>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We're working around the clock to restore full functionality. 
              Our engineering team has been automatically notified and is investigating the issue.
            </p>
          </div>

          {/* Status Information */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 mb-12">
            <h3 className="text-xl font-bold text-white mb-6">System Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">API Services</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-sm">Degraded</span>
                  </div>
                </div>
                <div className="text-slate-400 text-sm">Some tools may be temporarily unavailable</div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">File Processing</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-yellow-400 text-sm">Monitoring</span>
                  </div>
                </div>
                <div className="text-slate-400 text-sm">Processing may take longer than usual</div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">Data Security</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">Operational</span>
                  </div>
                </div>
                <div className="text-slate-400 text-sm">All data remains secure and encrypted</div>
              </div>
            </div>
          </div>

          {/* Recovery Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl mb-4">🔄</div>
              <h4 className="text-white font-semibold mb-2">Refresh Page</h4>
              <p className="text-slate-400 text-sm mb-4">Try refreshing to reconnect</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Refresh
              </Button>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl mb-4">📊</div>
              <h4 className="text-white font-semibold mb-2">System Status</h4>
              <p className="text-slate-400 text-sm mb-4">Check real-time status</p>
              <Link to="/status">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Status Page
                </Button>
              </Link>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl mb-4">💬</div>
              <h4 className="text-white font-semibold mb-2">Report Issue</h4>
              <p className="text-slate-400 text-sm mb-4">Contact our support team</p>
              <Link to="/contact">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Get Help
                </Button>
              </Link>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl mb-4">🏠</div>
              <h4 className="text-white font-semibold mb-2">Go Home</h4>
              <p className="text-slate-400 text-sm mb-4">Return to main page</p>
              <Link to="/">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Home
                </Button>
              </Link>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl p-6 border border-red-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-red-400 font-semibold mb-3">Error Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Timestamp:</span>
                    <span className="text-slate-300">{new Date().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Error ID:</span>
                    <span className="text-slate-300 font-mono">ERR-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Server:</span>
                    <span className="text-slate-300">AI-PROC-{Math.floor(Math.random() * 10) + 1}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-orange-400 font-semibold mb-3">Next Steps</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-400">•</span>
                    <span>Try again in a few minutes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-400">•</span>
                    <span>Check our status page for updates</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-400">•</span>
                    <span>Contact support if issue persists</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-6 py-3 border border-red-500/20">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-slate-400 text-sm">Error Code: 500 - Internal Server Error</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
