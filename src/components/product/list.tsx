import React from 'react';

import ProductItem from './item';
import { CustomPaginateList } from '@/components/custom-paginate';

import type { ProductList } from '@/types/product';

type Props = {
  list: ProductList;
  total: number;
  queryParams: { page: number };
};

function ProductList({ list = [], total = 0, queryParams }: Props) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12">
        {list.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <CustomPaginateList route="/" totalItems={total} queryParams={queryParams} />
      </div>
    </>
  );
}

export default ProductList;
