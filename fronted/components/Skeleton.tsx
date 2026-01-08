import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  count = 1,
  width,
  height
}) => {
  const skeletonItems = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md ${className}`}
      style={{ width, height }}
    />
  ));

  return <>{skeletonItems}</>;
};

export default Skeleton;