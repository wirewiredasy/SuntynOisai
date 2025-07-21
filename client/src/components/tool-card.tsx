import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Settings, 
  FileText, 
  Image, 
  Music, 
  Video, 
  Code, 
  Database, 
  Globe, 
  Calculator,
  Palette,
  Shield,
  Zap,
  Wrench
} from "lucide-react"
import { ArrowRight,  } from "lucide-react";

interface ToolCardProps {
  tool: {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    category: string;
    isActive?: boolean;
  };
}

const iconMap: { [key: string]: React.ElementType } = {
  'settings': Settings,
  'file-text': FileText,
  'image': Image,
  'music': Music,
  'video': Video,
  'code': Code,
  'database': Database,
  'globe': Globe,
  'calculator': Calculator,
  'palette': Palette,
  'shield': Shield,
  'zap': Zap,
  'tool': Wrench,
  'wrench': Wrench,
}

function getIconComponent(iconName?: string): React.ElementType {
  if (!iconName) return Wrench
  const IconComponent = iconMap[iconName.toLowerCase()]
  return IconComponent || Wrench
}

export default function ToolCard({ tool }: ToolCardProps) {
  // Use the category from the tool data directly
  const category = tool.category || 'business';

  const categoryColors = {
    pdf: "bg-red-500/20 text-red-400 border-red-500/20",
    image: "bg-blue-500/20 text-blue-400 border-blue-500/20",
    audio: "bg-green-500/20 text-green-400 border-green-500/20",
    government: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
    business: "bg-purple-500/20 text-purple-400 border-purple-500/20"
  };

  const hoverColors = {
    pdf: "hover:border-red-500/50 hover:shadow-red-500/10",
    image: "hover:border-blue-500/50 hover:shadow-blue-500/10", 
    audio: "hover:border-green-500/50 hover:shadow-green-500/10",
    government: "hover:border-yellow-500/50 hover:shadow-yellow-500/10",
    business: "hover:border-purple-500/50 hover:shadow-purple-500/10"
  };

  const gradients = {
    pdf: "bg-gradient-to-r from-red-500 to-red-400",
    image: "bg-gradient-to-r from-blue-500 to-blue-400",
    audio: "bg-gradient-to-r from-green-500 to-green-400",
    government: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    business: "bg-gradient-to-r from-purple-500 to-purple-400"
  };

  const IconComponent = getIconComponent(tool.icon)

  return (
    <Link href={`/tool/${tool.slug}`}>
      <Card className={`glass-card ${hoverColors[category as keyof typeof hoverColors]} hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${gradients[category as keyof typeof gradients]} group-hover:scale-110 transition-transform`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <Badge className={categoryColors[category as keyof typeof categoryColors]}>
              {category.toUpperCase()}
            </Badge>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
          <p className="text-sm text-slate-400 mb-4 line-clamp-2">{tool.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-green-400 font-semibold flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                Fast
              </span>
              <span className="text-xs text-gray-400 flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}