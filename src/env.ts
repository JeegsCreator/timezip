import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    TIMEZONE_DB_KEY: z.string().min(1)
  },
  clientPrefix: '',
  client: {},
  runtimeEnv: {
    TIMEZONE_DB_KEY: process.env.TIMEZONE_DB_KEY
  }
})
