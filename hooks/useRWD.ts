import { TABLET_WIDTH } from '@/consts';
import { useState, useEffect } from 'react';

const useRWD = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= TABLET_WIDTH);
    };

    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= TABLET_WIDTH);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return { isDesktop };
};

export default useRWD;
