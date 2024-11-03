import { Suspense } from 'react';

import ProductList from '@/components/product/list';
import ProductLoadingSkeleton from '@/components/product/loading';
import ProductSearching from '@/components/product/searching';

import productApis from '@/apis/product';
import commonApis from '@/apis/common';
import { PAGE_SIZE_LIST } from '@/common/constants';
import type { ProductSearchParams, QueryProductPayload } from '@/types/product';
import ProductFilters from '@/components/product/filtering';

type PageProps = {
  searchParams: ProductSearchParams;
};

export default async function Home({
  searchParams: { page = '1', q = '', sort },
}: PageProps) {
  const payload: QueryProductPayload = {
    limit: PAGE_SIZE_LIST,
    page: parseInt(page as string) || 1,
    orderBy: sort?.split('_')?.[0] || 'id',
    ascending: sort?.split('_')?.[1] || 'descending',
    is_count_product: 0,
    keyword: (q || '') as string,
  };

  const response = await productApis.list(payload);
  const resSettings = await commonApis.list();

  const settings = resSettings.data || [];
  const settingsUI = settings.find((item) => item.key === 'ui');

  const products = response.data.data || [];
  const totalProduct = response.data.total || 0;

  return (
    <main className="max-w-[128rem] mx-auto px-6 py-10">
      <p>Site name: {settingsUI?.value?.ogp_title}</p>
      <Suspense fallback={<ProductLoadingSkeleton />} key={`${q}-${payload.page}`}>
        <ProductSearching />
        <ProductFilters />
        <ProductList
          list={products}
          total={totalProduct}
          queryParams={{ page: payload.page }}
        />
      </Suspense>
    </main>
  );
}
