import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../../config'
import { TErrorSources } from '../interface/error'
import handleZodError from '../errors/zodError'
import handleValidationError from '../errors/validationError'
import handleCastError from '../errors/castError'
import handleDuplicateError from '../errors/deplicateError'
import AppError from '../errors/appError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong'
    }
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message
      }
    ]
  } else if (err instanceof Error) {
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message
      }
    ]
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null
  })

  return next()
}

export default globalErrorHandler
