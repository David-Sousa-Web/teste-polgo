import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3333),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatório'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `${i.path.join('.')}: ${i.message}`)
    .join('\n')
  throw new Error(`Falha ao validar variáveis de ambiente:\n${issues}`)
}

export const env = parsed.data