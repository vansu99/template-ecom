import { z } from 'zod';

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_MAINTENANCE_MODE: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE,
});

if (!configProject.success) {
  console.error('Error env: ', configProject.error.errors);
  throw new Error('ENV is invalid.');
}

const envConfig = configProject.data;
export default envConfig;
