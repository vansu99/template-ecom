import React from 'react';

import type { ProductDetail } from '@/types/product';

type Props = {
  item: ProductDetail;
};

function ProductDetail({ item }: Props) {
  return (
    <div className="flex flex-col">
      <p className="text-[1.4rem] font-roboto mb-2">{item?.code}</p>
      <h1 className="text-[1.8rem] mb-2 font-semibold">{item?.name}</h1>
      <div className="flex space-x-3 items-baseline font-roboto">
        <p className="text-red-500 text-[1.6rem]">{item?.sale_price}</p>
        <p className="text-[1.2rem] line-through">{item?.price}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
