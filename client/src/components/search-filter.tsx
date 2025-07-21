import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: SearchFilterProps) {
  const filters = [
    { id: 'all', label: 'All Tools' },
    { id: 'pdf', label: 'PDF Tools' },
    { id: 'image', label: 'Image Tools' },
    { id: 'audio', label: 'Audio/Video' },
    { id: 'government', label: 'Government' },
  ];

  return (
    <div className="max-w-4xl mx-auto mb-12">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search tools by name or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 py-4 text-lg bg-slate-800/50 border-slate-600 focus:border-purple-500 focus:ring-purple-500/20"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "secondary"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className={
              activeFilter === filter.id
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-purple-600 hover:text-white"
            }
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
