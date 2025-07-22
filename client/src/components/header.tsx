import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Star, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import AnimatedLogo from "@/components/animated-logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Home", href: "/", active: location === "/" },
    { name: "All Tools", href: "/tools", active: location.startsWith("/tools") },
    { name: "PDF Tools", href: "/tools/pdf", active: false },
    { name: "Image Tools", href: "/tools/image", active: false },
    { name: "Audio/Video", href: "/tools/audio", active: false },
    { name: "Gov Tools", href: "/tools/government", active: false },
    { name: "Contact", href: "/contact", active: false },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <AnimatedLogo size={40} showRays={false} className="group-hover:scale-105 transition-all duration-200" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
              SuntynAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  item.active
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-foreground hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Button */}
            <Link href="/tools">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-blue-600 hover:bg-muted"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </Link>
            
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-foreground hover:text-blue-600 hover:bg-muted"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Star className="h-4 w-4 mr-2" />
              Favorites
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:text-blue-600 hover:bg-muted transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-3 text-base font-medium transition-colors duration-200 rounded-lg ${
                    item.active
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "text-foreground hover:text-blue-600 hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col space-y-2">
                <Link href="/tools">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:text-blue-600 hover:bg-muted"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Tools
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="w-full justify-start text-foreground hover:text-blue-600 hover:bg-muted"
                >
                  {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </Button>
                <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Star className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}