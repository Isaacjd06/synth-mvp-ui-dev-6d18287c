import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", href: "/app/dashboard" },
  { title: "Chat", href: "/app/chat" },
  { title: "Skills", href: "/app/skills" },
  { title: "Workflows", href: "/app/workflows" },
  { title: "Executions", href: "/app/executions" },
  { title: "Insights", href: "/app/insights" },
  { title: "Connections", href: "/app/connections" },
  { title: "Billing", href: "/app/billing" },
];

// Track if sidebar has ever animated - global singleton
let sidebarHasAnimated = false;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Determine if we should animate - only once ever on first app load
  const shouldAnimate = useMemo(() => {
    if (sidebarHasAnimated) {
      return false;
    }
    sidebarHasAnimated = true;
    return true;
  }, []);

  const isActive = (href: string) => {
    if (href === "/app/workflows") {
      return location.pathname === href || location.pathname.startsWith("/app/workflows/");
    }
    return location.pathname === href;
  };

  const NavContent = () => (
    <nav className="flex flex-col gap-1 p-4">
      {navItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={shouldAnimate ? { opacity: 0, x: -20 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={shouldAnimate ? { delay: index * 0.05, duration: 0.3 } : { duration: 0 }}
        >
          <Link
            to={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "group flex items-center px-4 py-2.5 rounded-lg text-sm transition-all duration-200 relative overflow-hidden",
              isActive(item.href)
                ? "bg-primary/10 text-foreground font-medium border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
            )}
          >
            {/* Glow effect on hover */}
            <span className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none",
              "bg-gradient-to-r from-primary/5 via-primary/10 to-transparent",
              "group-hover:opacity-100"
            )} />
            
            <span className="relative z-10">{item.title}</span>
            
            {/* Active indicator line */}
            {isActive(item.href) && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full" />
            )}
          </Link>
        </motion.div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2.5 rounded-lg glass border border-border/50 hover:border-primary/30 hover:shadow-[0_0_15px_-5px_hsl(217_100%_60%/0.2)] transition-all duration-300"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-60 bg-background/90 backdrop-blur-xl border-r border-border/60 overflow-y-auto">
        {/* Subtle glow at top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <NavContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-md z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-background/95 backdrop-blur-xl border-r border-border/50 z-40"
            >
              {/* Subtle glow at top */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <span className="font-accent text-lg font-semibold text-gradient">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;