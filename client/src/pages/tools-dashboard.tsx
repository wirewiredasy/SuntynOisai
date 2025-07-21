import { useState, useMemo } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedLogo from "@/components/animated-logo";
import ToolCard from "@/components/tool-card";
import SearchFilter from "@/components/search-filter";
import { ALL_TOOLS, TOOL_CATEGORIES } from "@/lib/tools-data";
import { ArrowLeft } from "lucide-react";

export default function ToolsDashboard() {
  const [, params] = useRoute("/tools/:category");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState(params?.category || "all");

  const filteredTools = useMemo(() => {
    let filtered = ALL_TOOLS;

    // Apply category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(tool => tool.category === activeFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [activeFilter, searchTerm]);

  const currentCategory = TOOL_CATEGORIES.find(cat => cat.id === params?.category);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4">
              <AnimatedLogo size={48} />
              <div>
                <h1 className="text-2xl font-bold gradient-text">SuntynAI</h1>
                <p className="text-xs text-slate-400 font-medium">NEURAL INTELLIGENCE</p>
              </div>
            </Link>

            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            {currentCategory ? (
              <>
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${currentCategory.gradient} mr-6`}>
                    <span className="text-3xl">{currentCategory.icon}</span>
                  </div>
                  <div className="text-left">
                    <h1 className="text-4xl font-black gradient-text mb-2">
                      {currentCategory.name}
                    </h1>
                    <p className="text-xl text-slate-400">
                      {currentCategory.toolCount}+ Professional Tools
                    </p>
                  </div>
                </div>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                  {currentCategory.description}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-black mb-6 gradient-text">
                  All 80+ Tools
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                  Every tool you need for professional document processing, media editing, and productivity
                </p>
              </>
            )}
          </div>

          {/* Search and Filter */}
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-slate-400">
              Showing {filteredTools.length} of {ALL_TOOLS.length} tools
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-300 mb-2">No tools found</h3>
              <p className="text-slate-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
