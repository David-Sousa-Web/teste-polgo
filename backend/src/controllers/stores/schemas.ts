import { z } from "zod"
import { BRAZILIAN_STATES } from "../../utils/brazilianStates"
import { isValidCNPJ } from "../../utils/cnpjValidation"

export const createStoreSchema = z.object({
  name: z.string().min(2, "Nome da loja deve ter pelo menos 2 caracteres"),
  cnpj: z.string()
    .min(14, "CNPJ deve ter pelo menos 14 caracteres")
    .max(18, "CNPJ deve ter no máximo 18 caracteres (com formatação)")
    .refine(value => isValidCNPJ(value), "CNPJ deve ser válido"),
  state: z.string()
    .length(2, "Estado deve ter exatamente 2 caracteres")
    .refine(value => BRAZILIAN_STATES.includes(value.toUpperCase() as any), 
      "Estado deve ser uma UF válida do Brasil"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres")
})

export const updateStoreSchema = z.object({
  name: z.string().min(2, "Nome da loja deve ter pelo menos 2 caracteres").optional(),
  cnpj: z.string()
    .min(14, "CNPJ deve ter pelo menos 14 caracteres")
    .max(18, "CNPJ deve ter no máximo 18 caracteres (com formatação)")
    .refine(value => isValidCNPJ(value), "CNPJ deve ser válido")
    .optional(),
  state: z.string()
    .length(2, "Estado deve ter exatamente 2 caracteres")
    .refine(value => BRAZILIAN_STATES.includes(value.toUpperCase() as any), 
      "Estado deve ser uma UF válida do Brasil")
    .optional(),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres").optional(),
  address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres").optional()
})

export const getStoresQuerySchema = z.object({
  page: z.coerce.number().int().min(1, "Page deve ser um número inteiro positivo").default(1),
  limit: z.coerce.number().int().min(1, "Limit deve ser um número inteiro positivo").max(100, "Limit deve ser no máximo 100").default(10),
  state: z.string().optional(),
  city: z.string().optional(),
  name: z.string().optional()
})

export const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID deve ter 24 caracteres hexadecimais")
})
