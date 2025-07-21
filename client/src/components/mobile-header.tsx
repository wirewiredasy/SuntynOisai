import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Search, Moon, Sun, X } from "lucide-react";
import AnimatedLogo from "@/components/animated-logo";
import { TOOL_CATEGORIES, ALL_80_TOOLS } from "@/lib/comprehensive-tools";

interface MobileHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function MobileHeader({ isDarkMode, toggleDarkMode }: MobileHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredTools = searchTerm 
    ? ALL_80_TOOLS.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <AnimatedLogo size={36} />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold gradient-text">SuntynAI</h1>
              <p className="text-xs text-slate-400">NEURAL INTELLIGENCE</p>
            </div>
          </Link>

          {/* Right Side - Dark Mode & Menu */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 text-slate-400 hover:text-white"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Hamburger Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2 text-slate-400 hover:text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-slate-900 border-slate-700">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                    <div className="flex items-center space-x-3">
                      <AnimatedLogo size={32} />
                      <div>
                        <h2 className="font-bold gradient-text">SuntynAI</h2>
                        <p className="text-xs text-slate-400">80 Professional Tools</p>
                      </div>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="py-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search tools..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Navigation Content */}
                  <div className="flex-1 overflow-y-auto">
                    {searchTerm ? (
                      // Search Results
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-300 px-2">
                          Search Results ({filteredTools.length})
                        </h3>
                        {filteredTools.slice(0, 10).map((tool) => (
                          <Link key={tool.id} href={tool.route}>
                            <div 
                              className="flex items-center p-3 rounded-lg hover:bg-slate-800 cursor-pointer group"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <span className="text-lg mr-3">{tool.icon}</span>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-white group-hover:text-purple-400">
                                  {tool.name}
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                  {tool.description}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                        {filteredTools.length === 0 && (
                          <div className="text-sm text-slate-400 text-center py-4">
                            No tools found
                          </div>
                        )}
                      </div>
                    ) : (
                      // Categories
                      <div className="space-y-4">
                        {/* Dashboard Link */}
                        <Link href="/tools">
                          <div 
                            className="flex items-center p-3 rounded-lg hover:bg-slate-800 cursor-pointer group"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center mr-3">
                              <span className="text-sm">🏠</span>
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-white group-hover:text-purple-400">
                                All Tools Dashboard
                              </div>
                              <div className="text-xs text-slate-400">
                                View all 80 tools
                              </div>
                            </div>
                          </div>
                        </Link>

                        {/* Categories */}
                        {TOOL_CATEGORIES.map((category) => (
                          <Link key={category.id} href={`/tools/${category.id}`}>
                            <div 
                              className="flex items-center p-3 rounded-lg hover:bg-slate-800 cursor-pointer group"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className={`w-8 h-8 rounded-lg ${category.gradient} flex items-center justify-center mr-3`}>
                                <span className="text-sm">{category.icon}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-medium text-white group-hover:text-purple-400">
                                    {category.name}
                                  </div>
                                  <Badge className="bg-slate-700 text-slate-300 text-xs">
                                    {category.toolCount}
                                  </Badge>
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                  {category.description}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-slate-700">
                    <div className="text-center">
                      <div className="text-xs text-slate-400">
                        Powered by SuntynAI • Neural Intelligence
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}