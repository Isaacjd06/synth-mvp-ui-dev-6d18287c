import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
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

const containerVariantsNoAnimation = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
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

const itemVariantsNoAnimation = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// Track visited pages globally to persist across component remounts
const visitedPages = new Set<string>();

export const PageTransition = ({ children, className }: PageTransitionProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const hasAnimatedRef = useRef(false);
  const [shouldAnimate, setShouldAnimate] = useState(!visitedPages.has(currentPath));

  useEffect(() => {
    // Only animate if this is the first visit to this page
    if (!visitedPages.has(currentPath) && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      setShouldAnimate(true);
      // Mark page as visited after animation starts
      visitedPages.add(currentPath);
    } else {
      setShouldAnimate(false);
    }
  }, [currentPath]);

  return (
    <motion.div
      key={shouldAnimate ? currentPath : "static"}
      variants={shouldAnimate ? containerVariants : containerVariantsNoAnimation}
      initial={shouldAnimate ? "hidden" : false}
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const PageItem = ({ children, className }: PageTransitionProps) => {
  const location = useLocation();
  const shouldAnimate = !visitedPages.has(location.pathname);

  return (
    <motion.div 
      variants={shouldAnimate ? itemVariants : itemVariantsNoAnimation} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

export { containerVariants, itemVariants };