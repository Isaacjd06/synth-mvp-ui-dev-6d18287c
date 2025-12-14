import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SubscriptionPill from "@/components/subscription/SubscriptionPill";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-xl border-b border-border/60 z-10">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="h-full flex items-center justify-between px-4 lg:px-6 relative">
        <Link to="/app/dashboard" className="group flex items-center gap-2.5 transition-all duration-300">
          <span className="font-accent text-xl font-semibold text-gradient-header">
            Synth
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          {/* Subscription Status Pill */}
          <SubscriptionPill />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
