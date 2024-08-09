import { z } from 'zod'

export const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_APP_API_URL: z.string(),
})

export const env = envSchema.parse(process.env)