import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AnimationContextType {
  sidebarAnimated: boolean;
  setSidebarAnimated: (value: boolean) => void;
  visitedPages: Set<string>;
  markPageVisited: (path: string) => void;
  hasVisitedPage: (path: string) => boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarAnimated, setSidebarAnimated] = useState(false);
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());

  const markPageVisited = (path: string) => {
    setVisitedPages((prev) => {
      const newSet = new Set(prev);
      newSet.add(path);
      return newSet;
    });
  };

  const hasVisitedPage = (path: string) => visitedPages.has(path);

  return (
    <AnimationContext.Provider
      value={{
        sidebarAnimated,
        setSidebarAnimated,
        visitedPages,
        markPageVisited,
        hasVisitedPage,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within AnimationProvider");
  }
  return context;
};
