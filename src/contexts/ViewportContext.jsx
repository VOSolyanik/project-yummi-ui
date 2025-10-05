import { createContext, useEffect, useState } from 'react';

const ViewportContext = createContext({ width: window.innerWidth, height: window.innerHeight });

const ViewportProvider = ({ children }) => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <ViewportContext.Provider value={viewport}>{children}</ViewportContext.Provider>;
};

export { ViewportContext, ViewportProvider };