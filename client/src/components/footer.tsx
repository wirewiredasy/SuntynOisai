import { Link } from "wouter";
import AnimatedLogo from "@/components/animated-logo";
import { Heart, Github, Twitter, Mail, Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Tools",
      links: [
        { name: "PDF Tools", href: "/tools/pdf" },
        { name: "Image Tools", href: "/tools/image" },
        { name: "Audio/Video", href: "/tools/audio" },
        { name: "Government Tools", href: "/tools/government" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "How to Use", href: "/how-to-use" },
        { name: "Contact Us", href: "/contact" },
        { name: "Report Issue", href: "/contact?type=issue" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Security", href: "/security" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <AnimatedLogo size={40} showRays={false} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SuntynAI
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
              Professional AI-powered tools for document processing, image editing, audio/video conversion, and government services. Free, secure, and easy to use.
            </p>
            
            {/* Blue Animation Support Section */}
            <div className="relative mb-6 group">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Heart className="h-4 w-4 text-white animate-pulse group-hover:animate-bounce" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30 animate-ping group-hover:opacity-50"></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors duration-300">Support SuntynAI</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">Help us keep the tools free</p>
                  </div>
                </div>
                
                {/* Animated Visual Elements */}
                <div className="mt-3 flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white animate-bounce group-hover:animate-spin"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium group-hover:text-blue-600 transition-colors duration-300">10,000+ users supported</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 group transform hover:scale-110 hover:rotate-6 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <Twitter className="h-5 w-5 text-gray-600 group-hover:text-white transition-all duration-300 group-hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 group transform hover:scale-110 hover:rotate-6 hover:shadow-lg hover:shadow-gray-800/30"
              >
                <Github className="h-5 w-5 text-gray-600 group-hover:text-white transition-all duration-300 group-hover:animate-pulse" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group transform hover:scale-110 hover:rotate-6 hover:shadow-lg hover:shadow-blue-600/30"
              >
                <Mail className="h-5 w-5 text-gray-600 group-hover:text-white transition-all duration-300 group-hover:animate-bounce" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-gray-600">
                © {currentYear} SuntynAI. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Shield className="h-4 w-4" />
                <span>SSL Secured</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:animate-bounce"></div>
                  <div className="absolute -inset-1 bg-green-500 rounded-full opacity-30 animate-ping"></div>
                </div>
                <span className="group-hover:text-green-600 transition-colors duration-300">All Systems Operational</span>
              </span>
              <Link href="/status" className="hover:text-blue-600 transition-all duration-300 hover:underline hover:scale-105">
                Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}