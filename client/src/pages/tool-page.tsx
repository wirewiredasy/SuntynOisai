import { useRoute } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ToolProcessor from "@/components/tool-processor";

export default function ToolPage() {
  const [, params] = useRoute("/tool/:slug");

  // Scroll to top when component mounts or tool changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params?.slug]);
  
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
    <div className="min-h-screen bg-white dark:bg-slate-900 text-black dark:text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/tools">
            <Button variant="ghost" className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white">
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