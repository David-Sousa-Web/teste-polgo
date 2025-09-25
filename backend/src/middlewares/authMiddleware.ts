import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../env'

interface AuthRequest extends Request {
  userId?: string
}

interface JwtPayload {
  userId: string
  iat?: number
  exp?: number
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: 'Token de acesso requerido'
      })
      return
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Token de acesso mal formatado'
      })
      return
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload

    req.userId = decoded.userId

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: 'Token expirado'
      })
      return
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: 'Token inválido'
      })
      return
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
}
