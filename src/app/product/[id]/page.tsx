import React from 'react';
import { notFound } from 'next/navigation';

import productApis from '@/apis/product';
import ProductDetail from '@/components/product/detail';
import { extractId } from '@/common/utils';

type PageProps = {
  params: { id: string };
};

async function ProductDetailPage({ params: { id } }: PageProps) {
  let result = null;
  try {
    const response = await productApis.detail(extractId(id));
    const product = response.data;
    result = product;
  } catch {
    notFound();
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <ProductDetail item={result} />
    </div>
  );
}

export default ProductDetailPage;
