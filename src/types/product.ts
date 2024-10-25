import { ResponseData } from './common';

export type ProductSort = 'price_asc' | 'price_desc';

export type ProductSearchParams = Partial<{
  sort: string;
  q: string;
  page: string;
  limit: string;
}>;

export type ProductItem = {
  id: number;
  name: string;
  code: string;
  slug: string;
  sale_price: number;
  price: number;
  quantity: number;
  images: string[];
};

export type ProductList = ProductItem[];

export type ProductDetail = {
  id: number;
  product_code: number;
};

export type QueryProductPayload = {
  is_count_product: number;
  keyword: string;
  page: number;
  limit: number;
  orderBy: string;
  ascending: string;
};

export type ProductResponse = ResponseData<{ data: ProductList; total: number }>;
