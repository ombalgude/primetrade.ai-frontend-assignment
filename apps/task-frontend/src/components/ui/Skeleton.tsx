// Simple skeleton loader component
import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-gray-100 rounded-md animate-pulse ${className}`} />;
}

export default Skeleton;
