import { Request, Response, NextFunction } from 'express'

interface LogRequest extends Request {
  startTime?: number
}

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
}

function getStatusColor(status: number): string {
  if (status >= 500) return colors.red
  if (status >= 400) return colors.yellow
  return colors.green
}

function getMethodColor(method: string): string {
  switch (method) {
    case 'GET': return colors.green
    case 'POST': return colors.yellow
    case 'PUT': return colors.cyan
    case 'DELETE': return colors.red
    default: return colors.gray
  }
}

function formatTime(): string {
  return new Date().toLocaleTimeString('pt-BR')
}

function log(req: LogRequest, res: Response): void {
  const method = req.method
  const url = req.originalUrl || req.url
  const status = res.statusCode
  const responseTime = req.startTime ? Date.now() - req.startTime : 0
  
  const logMessage = [
    `${colors.gray}[${formatTime()}]${colors.reset}`,
    `${getMethodColor(method)}${method}${colors.reset}`,
    `${url}`,
    `${getStatusColor(status)}${status}${colors.reset}`,
    `${responseTime}ms`
  ].join(' ')

  console.log(logMessage)
}

export function loggingMiddleware(req: LogRequest, res: Response, next: NextFunction): void {
  req.startTime = Date.now()

  const originalSend = res.send
  res.send = function(data: any) {
    log(req, res)
    return originalSend.call(this, data)
  }

  const originalJson = res.json
  res.json = function(data: any) {
    log(req, res)
    return originalJson.call(this, data)
  }

  next()
}
