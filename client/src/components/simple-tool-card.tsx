import { Link, useNavigate } from "wouter";
import { LucideIcon } from "lucide-react";

interface SimpleToolCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  popular?: boolean;
  slug: string;
  route?: string;
}

export default function SimpleToolCard({ 
  name, 
  description, 
  icon: Icon, 
  category, 
  popular = false,
  slug,
  route
}: SimpleToolCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    } else if (slug) {
      navigate(`/tools/${slug}`);
    } else {
      console.warn('No route or slug defined for tool:', name);
    }
  };

  return (
    <div onClick={handleClick} className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-1">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-200">
          <Icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
              {name}
            </h3>
            {popular && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                Popular
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
```import { Link, useNavigate } from "wouter";
import { LucideIcon } from "lucide-react";

interface SimpleToolCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  popular?: boolean;
  slug: string;
  route?: string;
}

export default function SimpleToolCard({ 
  name, 
  description, 
  icon: Icon, 
  category, 
  popular = false,
  slug,
  route
}: SimpleToolCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    } else if (slug) {
      navigate(`/tools/${slug}`);
    } else {
      console.warn('No route or slug defined for tool:', name);
    }
  };

  return (
    <div onClick={handleClick} className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-1">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-200">
          <Icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
              {name}
            </h3>
            {popular && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                Popular
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}