import type { Router } from 'express'
import { z } from 'zod'

const healthResponseSchema = z.object({
  success: z.literal(true),
  message: z.string().nullable(),
  data: z.object({
    status: z.literal('ok')
  })
})

export function registerRoutes(router: Router) {
  /**
   * @swagger
   * /api/health:
   *   get:
   *     tags:
   *       - Api
   *     summary: Healthcheck
   *     description: Verifica se o serviço está operacional
   *     responses:
   *       200:
   *         description: Serviço operacional
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   nullable: true
   *                   example: null
   *                 data:
   *                   type: object
   *                   properties:
   *                     status:
   *                       type: string
   *                       example: ok
   */
  router.get('/health', (req, res) => {
    const response = {
      success: true as const,
      message: null,
      data: {
        status: 'ok' as const
      }
    }

    const validatedResponse = healthResponseSchema.parse(response)
    res.json(validatedResponse)
  })
}