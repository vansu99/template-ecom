import { KEYS } from '@/common/constants';
import { revalidateTag } from 'next/cache';

export async function GET() {
  revalidateTag(KEYS.COMMON_SETTINGS);
  return Response.json({ revalidated: true, now: Date.now() });
}
