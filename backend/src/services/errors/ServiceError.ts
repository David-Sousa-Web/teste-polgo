export class ServiceError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message)
    this.name = 'ServiceError'
  }
}

export class NotFoundError extends ServiceError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

export class ValidationError extends ServiceError {
  constructor(message: string = 'Validation failed') {
    super(message, 400)
    this.name = 'ValidationError'
  }
}

export class ConflictError extends ServiceError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409)
    this.name = 'ConflictError'
  }
}
