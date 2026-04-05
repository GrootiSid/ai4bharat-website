'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PageLoader from '@/components/PageLoader';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [pathname]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(handleLoadComplete, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, pathname]);

  return (
    <>
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.2s ease' }}>
        {children}
      </div>
      {isLoading && <PageLoader />}
    </>
  );
}
