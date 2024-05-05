import { useState, useEffect } from 'react';

const useRWD = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 1024);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return { isDesktop };
};

export default useRWD;
