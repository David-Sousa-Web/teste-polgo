import { z } from "zod"
import { BRAZILIAN_STATES } from "../../utils/brazilianStates"

export const createWinnerSchema = z.object({
  fullName: z.string().min(2, "Nome completo deve ter pelo menos 2 caracteres"),
  state: z.string()
    .length(2, "Estado deve ter exatamente 2 caracteres")
    .refine(value => BRAZILIAN_STATES.includes(value.toUpperCase() as any), 
      "Estado deve ser uma UF válida do Brasil"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  prize: z.string().min(2, "Prêmio deve ter pelo menos 2 caracteres"),
  drawDate: z.iso.datetime("Data deve estar no formato ISO 8601")
})

export const updateWinnerSchema = z.object({
  fullName: z.string().min(2, "Nome completo deve ter pelo menos 2 caracteres").optional(),
  state: z.string()
    .length(2, "Estado deve ter exatamente 2 caracteres")
    .refine(value => BRAZILIAN_STATES.includes(value.toUpperCase() as any), 
      "Estado deve ser uma UF válida do Brasil")
    .optional(),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres").optional(),
  prize: z.string().min(2, "Prêmio deve ter pelo menos 2 caracteres").optional(),
  drawDate: z.iso.datetime("Data deve estar no formato ISO 8601").optional()
}).refine(data => Object.keys(data).length > 0, {
  message: "Pelo menos um campo deve ser informado para atualização"
})

export const getWinnersQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  limit: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  state: z.string().optional(),
  city: z.string().optional(),
  prize: z.string().optional(),
  fullName: z.string().optional()
})

export const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID deve ter formato válido")
})
