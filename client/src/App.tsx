/* Quiet Operations reminder: routes preserve a calm public-to-operator handoff and keep operational detail in persistent app chrome. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CommandCenter from "./pages/CommandCenter";
import Catalogue from "./pages/Catalogue";
import Customers from "./pages/Customers";
import Merchants from "./pages/Merchants";
import OffersPricing from "./pages/OffersPricing";
import Automations from "./pages/Automations";
import Templates from "./pages/Templates";
import NextBestAction from "./pages/NextBestAction";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import GovernanceAudit from "./pages/GovernanceAudit";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/app" component={CommandCenter} />
      <Route path="/command-center" component={CommandCenter} />
      <Route path="/catalogue" component={Catalogue} />
      <Route path="/customers" component={Customers} />
      <Route path="/merchants" component={Merchants} />
      <Route path="/offers-pricing" component={OffersPricing} />
      <Route path="/automations" component={Automations} />
      <Route path="/templates" component={Templates} />
      <Route path="/next-best-action" component={NextBestAction} />
      <Route path="/orders" component={Orders} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/governance-audit" component={GovernanceAudit} />
      <Route path="/settings" component={Settings} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="bottom-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
