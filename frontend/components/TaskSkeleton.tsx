import React from 'react';
import Skeleton from './Skeleton';

interface TaskSkeletonProps {
  count?: number;
}

const TaskSkeleton: React.FC<TaskSkeletonProps> = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center py-4">
          <Skeleton className="rounded-full" width={20} height={20} />
          <div className="ml-4 flex-1 space-y-2">
            <Skeleton className="h-4" width="60%" />
            <Skeleton className="h-3" width="40%" />
          </div>
          <div className="ml-4 flex space-x-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSkeleton;