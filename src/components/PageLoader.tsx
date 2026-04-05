'use client';

import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="page-loader">
      <div className="loader-content">
        <div className="loader-ring">
          <div className="loader-ring-inner" />
        </div>
      </div>
    </div>
  );
}
