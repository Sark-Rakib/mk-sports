import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="overflow-hidden">
      <div className="animate-pulse">
        <div className="aspect-[3/4] w-full bg-gray-100 mb-4"></div>
        <div className="h-3 w-3/4 bg-gray-100 rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
