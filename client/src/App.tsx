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
import About from "@/pages/about";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import NotFound from "@/pages/not-found";
import HelpCenter from "@/pages/help-center";
import Documentation from "@/pages/documentation";
import Security from "@/pages/security";
import Error404 from "@/pages/error-404";
import Error500 from "@/pages/error-500";
import Careers from "@/pages/careers";
import Status from "@/pages/status";

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
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/help-center" component={HelpCenter} />
          <Route path="/documentation" component={Documentation} />
          <Route path="/security" component={Security} />
          <Route path="/careers" component={Careers} />
          <Route path="/status" component={Status} />
          <Route path="/404" component={Error404} />
          <Route path="/500" component={Error500} />
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