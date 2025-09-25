import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '../../env'

const loginSchema = z.object({
  username: z.string().min(1, 'Username é obrigatório'),
  password: z.string().min(1, 'Password é obrigatório'),
})

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = loginSchema.parse(req.body)

      if (username !== 'admin' || password !== '123456') {
        res.status(401).json({
          success: false,
          message: 'Credenciais inválidas',
        })
        return
      }

      const token = jwt.sign(
        { 
          userId: '507f1f77bcf86cd799439011',
          username: 'admin'
        },
        env.JWT_SECRET,
        { 
          expiresIn: '24h'
        }
      )

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          token,
          expiresIn: '24h',
          tokenType: 'Bearer'
        }
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: 'Dados inválidos',
          errors: error.issues.map(issue => issue.message)
        })
        return
      }

      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  }
}
