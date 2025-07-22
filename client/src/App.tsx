import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NewHome from "@/pages/new-home";
import ToolsDashboardNew from "@/pages/tools-dashboard-new";
import GenericToolPage from "@/pages/generic-tool-page";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import NotFound from "@/pages/not-found";
import HelpCenter from "@/pages/help-center";
import HowToUse from "@/pages/how-to-use";
import Documentation from "@/pages/documentation";
import Security from "@/pages/security";
import { useEffect } from "react";

// Import specific tool pages
import PDFMergeTool from "@/pages/tools/pdf-merge-tool";
import PDFSplitTool from "@/pages/tools/pdf-split-tool";
import PDFBackgroundRemoveTool from "@/pages/tools/pdf-background-remove-tool";
import ImageResizeTool from "@/pages/tools/image-resize-tool";
import GSTCalculatorTool from "@/pages/tools/gst-calculator-tool";

// Component to handle scroll to top on route changes
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="light" storageKey="suntyn-ui-theme">
          <div className="min-h-screen bg-background text-foreground">
          <Header />
          <ScrollToTop />
          <main>
            <Toaster />
            <Switch>
              <Route path="/" component={NewHome} />
              <Route path="/tools" component={ToolsDashboardNew} />
              <Route path="/tools/:category" component={ToolsDashboardNew} />
              <Route path="/tool/:slug" component={GenericToolPage} />

              {/* Specific Tool Pages */}
              <Route path="/tools/pdf-merge" component={PDFMergeTool} />
              <Route path="/tools/pdf-split" component={PDFSplitTool} />
              <Route path="/tools/pdf-background-remove" component={PDFBackgroundRemoveTool} />
              <Route path="/tools/image-resize" component={ImageResizeTool} />
              <Route path="/tools/gst-calculator" component={GSTCalculatorTool} />

              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={PrivacyPolicy} />
              <Route path="/terms" component={TermsOfService} />
              <Route path="/help" component={HelpCenter} />
              <Route path="/how-to-use" component={HowToUse} />
              <Route path="/documentation" component={Documentation} />
              <Route path="/security" component={Security} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;