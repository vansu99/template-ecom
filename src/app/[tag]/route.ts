import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  params: z.object({
    tag: z.string(),
  }),
});

export async function POST(req: Request, context: z.infer<typeof schema>) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Not allowed', { status: 403 });
  }

  const {
    params: { tag },
  } = schema.parse(context);

  revalidateTag(tag);

  return Response.json({ revalidated: true, now: Date.now() });
}
