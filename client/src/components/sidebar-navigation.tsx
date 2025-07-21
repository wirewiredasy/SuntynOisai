import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  Image, 
  Music, 
  Building2,
  ChevronRight,
  ChevronDown,
  Search,
  Star
} from 'lucide-react';
import { COMPREHENSIVE_TOOLS, TOOL_CATEGORIES } from '@/lib/comprehensive-tools';
import { Input } from '@/components/ui/input';

interface SidebarNavigationProps {
  className?: string;
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['pdf']);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const filteredTools = Object.entries(COMPREHENSIVE_TOOLS).reduce((acc, [category, tools]) => {
    const filtered = tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, typeof COMPREHENSIVE_TOOLS[keyof typeof COMPREHENSIVE_TOOLS]>);

  const getCategoryIcon = (categoryName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'PDF Tools': <FileText className="h-4 w-4" />,
      'PDF Conversion': <FileText className="h-4 w-4" />,
      'Image Processing': <Image className="h-4 w-4" />,
      'Image Enhancement': <Image className="h-4 w-4" />,
      'Audio Tools': <Music className="h-4 w-4" />,
      'Video Tools': <Music className="h-4 w-4" />,
      'Government Tools': <Building2 className="h-4 w-4" />,
      'AI & Business Tools': <Building2 className="h-4 w-4" />
    };
    return iconMap[categoryName] || <FileText className="h-4 w-4" />;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-40 h-full w-80 bg-background border-r border-border transition-transform duration-200 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg">SuntynAI</h1>
                  <p className="text-xs text-muted-foreground">80 Professional Tools</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2 py-4">
              {/* Home */}
              <Link href="/">
                <Button 
                  variant={location === '/' ? 'secondary' : 'ghost'} 
                  className="w-full justify-start h-9"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="h-4 w-4 mr-3" />
                  Dashboard
                </Button>
              </Link>

              <Separator className="my-4" />

              {/* Tool Categories */}
              {Object.entries(filteredTools).map(([categoryName, tools]) => (
                <div key={categoryName} className="space-y-1">
                  {/* Category Header */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-9 px-3"
                    onClick={() => toggleCategory(categoryName)}
                  >
                    <div className="flex items-center">
                      {getCategoryIcon(categoryName)}
                      <span className="ml-3 text-sm font-medium">{categoryName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {tools.length}
                      </Badge>
                      {expandedCategories.includes(categoryName) ? 
                        <ChevronDown className="h-3 w-3" /> : 
                        <ChevronRight className="h-3 w-3" />
                      }
                    </div>
                  </Button>

                  {/* Tools List */}
                  {expandedCategories.includes(categoryName) && (
                    <div className="ml-4 space-y-1 border-l border-border pl-4">
                      {tools.map((tool) => (
                        <Link key={tool.id} href={tool.route}>
                          <Button
                            variant={location === tool.route ? 'secondary' : 'ghost'}
                            className="w-full justify-start h-8 px-3 text-sm"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="truncate">{tool.name}</span>
                              {tool.route === location && (
                                <Star className="h-3 w-3 text-primary" />
                              )}
                            </div>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* No results */}
              {searchQuery && Object.keys(filteredTools).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No tools found</p>
                  <p className="text-xs mt-1">Try adjusting your search</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Total Tools: {Object.values(COMPREHENSIVE_TOOLS).flat().length}</span>
              <span>v2.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}