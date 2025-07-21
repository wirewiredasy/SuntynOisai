import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Brain, Shield } from "lucide-react";

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    icon: string;
    gradient: string;
    processingTime: string;
    isAIPowered?: boolean;
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  const categoryColors = {
    pdf: "bg-red-500/20 text-red-400 border-red-500/20",
    image: "bg-blue-500/20 text-blue-400 border-blue-500/20",
    audio: "bg-green-500/20 text-green-400 border-green-500/20",
    government: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
  };

  const hoverColors = {
    pdf: "hover:border-red-500/50 hover:shadow-red-500/10",
    image: "hover:border-blue-500/50 hover:shadow-blue-500/10", 
    audio: "hover:border-green-500/50 hover:shadow-green-500/10",
    government: "hover:border-yellow-500/50 hover:shadow-yellow-500/10"
  };

  return (
    <Link href={`/tool/${tool.slug}`}>
      <Card className={`glass-card ${hoverColors[tool.category as keyof typeof hoverColors]} hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${tool.gradient} group-hover:scale-110 transition-transform`}>
              <span className="text-xl">{tool.icon}</span>
            </div>
            <Badge className={categoryColors[tool.category as keyof typeof categoryColors]}>
              {tool.category.toUpperCase()}
            </Badge>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
          <p className="text-sm text-slate-400 mb-4 line-clamp-2">{tool.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {tool.isAIPowered ? (
                <span className="text-xs text-purple-400 font-semibold flex items-center">
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Powered
                </span>
              ) : (
                <span className="text-xs text-green-400 font-semibold flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  {tool.processingTime}
                </span>
              )}
              <span className="text-xs text-slate-500 flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
