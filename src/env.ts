import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    TIMEZONE_DB_KEY: z.string().min(1),
    SUPABASE_KEY: z.string().min(1),
    SUPABASE_URL: z.string().url()
  },
  clientPrefix: '',
  client: {},
  runtimeEnv: {
    TIMEZONE_DB_KEY: process.env.TIMEZONE_DB_KEY,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL
  }
})
