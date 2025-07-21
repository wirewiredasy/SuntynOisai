import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/theme-provider";
import MobileHeader from "@/components/mobile-header";
import { useTheme } from "@/providers/theme-provider";
import Home from "@/pages/home";
import ToolsDashboard from "@/pages/tools-dashboard";
import ToolPage from "@/pages/tool-page";
import NotFound from "@/pages/not-found";

function AppContent() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-black dark:text-white transition-colors duration-300">
      <MobileHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="pt-16">
        <Toaster />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tools" component={ToolsDashboard} />
          <Route path="/tools/:category" component={ToolsDashboard} />
          <Route path="/tool/:slug" component={ToolPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="suntynai-theme">
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
