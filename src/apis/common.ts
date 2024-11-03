import { KEYS } from '@/common/constants';
import { https } from '@/common/service';
import type { ResponseSettings } from '@/types/settings';

const commonApis = {
  list: () => {
    return https.post<ResponseSettings>(
      '/setting/list',
      {},
      { next: { revalidate: 604800000, tags: [KEYS.COMMON_SETTINGS] } },
    );
  },
};

export default commonApis;
