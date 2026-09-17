import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface PreloaderContextType {
  isLoaded: boolean;
  setLoaded: () => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isLoaded: false,
  setLoaded: () => {},
});

export const usePreloader = () => useContext(PreloaderContext);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Safety fallback: ensure landing content is gracefully revealed even if preloader is skipped/interrupted
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PreloaderContext.Provider
      value={{
        isLoaded,
        setLoaded: () => setIsLoaded(true),
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}
