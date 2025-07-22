import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NewHome from "@/pages/new-home";
import ToolsDashboardNew from "@/pages/tools-dashboard-new";
import ToolPage from "@/pages/tool-page";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import NotFound from "@/pages/not-found";
import HelpCenter from "@/pages/help-center";
import Documentation from "@/pages/documentation";
import Security from "@/pages/security";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-white text-gray-900">
          <Header />
          <main>
            <Toaster />
            <Switch>
              <Route path="/" component={NewHome} />
              <Route path="/tools" component={ToolsDashboardNew} />
              <Route path="/tools/:category" component={ToolsDashboardNew} />
              <Route path="/tool/:slug" component={ToolPage} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={PrivacyPolicy} />
              <Route path="/terms" component={TermsOfService} />
              <Route path="/help" component={HelpCenter} />
              <Route path="/documentation" component={Documentation} />
              <Route path="/security" component={Security} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;