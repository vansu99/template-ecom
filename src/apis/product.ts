import { https } from '@/common/service';

import type {
  ProductResponse,
  QueryProductPayload,
  ProductDetailResponse,
} from '@/types/product';

const productApis = {
  list: (payload: QueryProductPayload) => {
    return https.post<ProductResponse>('/product/search', payload);
  },
  detail: (id: number) => {
    return https.post<ProductDetailResponse>('/product/show', { product_id: id });
  },
};

export default productApis;
