import { https } from '@/common/service';

import type { ProductResponse, QueryProductPayload } from '@/types/product';

const productApis = {
  list: (payload: QueryProductPayload) => {
    return https.post<ProductResponse>('/product/search', payload);
  },
};

export default productApis;
