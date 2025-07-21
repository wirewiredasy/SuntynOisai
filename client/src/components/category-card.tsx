import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: string;
    toolCount: number;
    gradient: string;
    tools: string[];
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/tools/${category.id}`}>
      <Card className="glass-card hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 cursor-pointer group transform hover:-translate-y-2">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center ${category.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-3xl">{category.icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
            <p className="text-slate-400">{category.toolCount}+ Professional Tools</p>
          </div>
          
          <div className="space-y-3">
            {category.tools.slice(0, 4).map((tool, index) => (
              <div key={index} className="flex items-center text-sm text-slate-300">
                <div className="w-2 h-2 rounded-full bg-purple-400 mr-3"></div>
                <span>{tool}</span>
              </div>
            ))}
            {category.tools.length > 4 && (
              <div className="text-center pt-4">
                <span className="text-xs text-slate-500">+{category.tools.length - 4} more tools</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
