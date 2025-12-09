import { motion } from "framer-motion";
import { ReactNode, createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

// Track visited pages globally - persists across component remounts and navigation
const visitedPages = new Set<string>();

// Context to pass animation state to children
const PageAnimationContext = createContext<boolean>(false);

export const PageTransition = ({ children, className }: PageTransitionProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine if we should animate - only on first visit to this path
  const shouldAnimate = useMemo(() => {
    if (visitedPages.has(currentPath)) {
      return false;
    }
    // Mark as visited immediately
    visitedPages.add(currentPath);
    return true;
  }, [currentPath]);

  // Provide animation state to children via context
  return (
    <PageAnimationContext.Provider value={shouldAnimate}>
      {shouldAnimate ? (
        <motion.div
          key={currentPath}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={className}
        >
          {children}
        </motion.div>
      ) : (
        <div className={className}>{children}</div>
      )}
    </PageAnimationContext.Provider>
  );
};

export const PageItem = ({ children, className }: PageTransitionProps) => {
  // Get animation state from parent PageTransition
  const shouldAnimate = useContext(PageAnimationContext);

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

// Export for external use
export { containerVariants, itemVariants, visitedPages };