/* eslint-disable no-unused-vars */
import React from 'react';
import { Skeleton } from '../ui/skeleton';

function ProductLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12">
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton key={index} className="h-[25rem] w-full" />
      ))}
    </div>
  );
}

export default ProductLoadingSkeleton;
