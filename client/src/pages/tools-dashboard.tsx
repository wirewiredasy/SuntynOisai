import { useState, useMemo } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedLogo from "@/components/animated-logo";
import ToolCard from "@/components/tool-card";
import SearchFilter from "@/components/search-filter";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ToolsDashboard() {
  const [, params] = useRoute("/tools/:category");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState(params?.category || "all");

  // Fetch tools from API
  const { data: toolsData, isLoading } = useQuery({
    queryKey: ['/api/tools'],
  });

  // Transform data structure to match expected format
  const allTools = useMemo(() => {
    if (!toolsData) return [];
    return [
      ...toolsData.pdf.map((tool: any) => ({ ...tool, category: 'pdf' })),
      ...toolsData.image.map((tool: any) => ({ ...tool, category: 'image' })),
      ...toolsData.audio.map((tool: any) => ({ ...tool, category: 'audio' })),
      ...toolsData.government.map((tool: any) => ({ ...tool, category: 'government' })),
    ];
  }, [toolsData]);

  const filteredTools = useMemo(() => {
    let filtered = allTools;

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
  }, [allTools, activeFilter, searchTerm]);

  const categoryLabels = {
    pdf: { name: "PDF Tools", icon: "📄", description: "Process and manipulate PDF documents", toolCount: toolsData?.pdf?.length || 0, gradient: "bg-gradient-to-br from-red-500/20 to-pink-600/20" },
    image: { name: "Image Tools", icon: "🖼️", description: "Edit, convert, and enhance images", toolCount: toolsData?.image?.length || 0, gradient: "bg-gradient-to-br from-blue-500/20 to-purple-600/20" },
    audio: { name: "Audio/Video Tools", icon: "🎵", description: "Convert and process multimedia files", toolCount: toolsData?.audio?.length || 0, gradient: "bg-gradient-to-br from-green-500/20 to-teal-600/20" },
    government: { name: "Government Tools", icon: "🏛️", description: "Indian government document utilities", toolCount: toolsData?.government?.length || 0, gradient: "bg-gradient-to-br from-orange-500/20 to-red-600/20" }
  };

  const currentCategory = params?.category ? categoryLabels[params.category as keyof typeof categoryLabels] : null;

  return (
    <>
      {/* This page now uses the global mobile header */}

      <div className="pt-6 pb-20">
        <div className="container mx-auto px-4 md:px-6">
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
                  All 80 Tools
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                  Every tool you need for professional document processing, media editing, and productivity
                </p>
              </>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-lg" />
                ))}
              </div>
            </div>
          )}

          {/* Search and Filter */}
          {!isLoading && (
            <div className="mb-12">
              <SearchFilter 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                toolCount={filteredTools.length}
              />
            </div>
          )}

          {/* Results Count */}
          {!isLoading && (
            <div className="mb-8">
              <p className="text-slate-400">
                Showing {filteredTools.length} of {allTools.length} tools
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
          )}

          {/* Tools Grid - Mobile First */}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}

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
