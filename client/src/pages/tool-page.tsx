import { useRoute } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ToolProcessor from "@/components/tool-processor";

export default function ToolPage() {
  const [, params] = useRoute("/tool/:slug");
  
  // Fetch tool data from API
  const { data: tool, isLoading } = useQuery({
    queryKey: ['/api/tools', params?.slug],
    queryFn: async () => {
      const response = await fetch(`/api/tools/${params?.slug}`);
      if (!response.ok) {
        throw new Error('Tool not found');
      }
      return response.json();
    },
    enabled: !!params?.slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading tool...</h1>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <Link href="/tools">
            <Button>Back to Tools</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/tools">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>

        {/* Tool Processor */}
        <ToolProcessor tool={tool} />
      </div>
    </div>
  );
}