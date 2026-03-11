import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="bg-white shadow overflow-hidden">
      <div className="animate-pulse">
        {/* Image */}
        <div className="h-48 w-full bg-gray-200"></div>

        <div className="p-4 space-y-3">
          {/* Title */}
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>

          {/* Price */}
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>

          {/* Rating */}
          <div className="flex gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>

          {/* Button */}
          {/* <div className="h-10 w-full bg-gray-200 rounded-lg"></div> */}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
