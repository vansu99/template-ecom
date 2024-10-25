'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useOptimistic } from 'react';

import ProductSorter from './sorting';

import type { ProductSort } from '@/types/product';

function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useOptimistic({
    sort: searchParams.get('sort') || undefined,
  });

  const handleUpdateFilters = (payload: Partial<typeof filters>) => {
    const newState = { ...filters, ...payload };
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(newState).forEach(([key, value]) => {
      newSearchParams.delete(key);
      if (Array.isArray(value)) {
        value.forEach((v) => newSearchParams.append(key, v));
      } else if (value) {
        newSearchParams.set(key, value);
      }
    });

    newSearchParams.delete('page');
    setFilters(newState);
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="mb-12">
      <ProductSorter
        sort={filters.sort as ProductSort}
        onUpdateSort={(sort) => handleUpdateFilters({ sort })}
      />
    </div>
  );
}

export default ProductFilters;
