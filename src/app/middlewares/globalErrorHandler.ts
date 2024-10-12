/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
import { IGenericErrorMessage } from './../../interfaces/error'

import { ErrorRequestHandler } from 'express'
import handelvalidationError from '../../errors/handelValidationError'
import config from '../../config'
import ApiError from '../../errors/ApiError'

import { Error } from 'mongoose'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // res.send(400).json({ errosssss: err })

  config.env === 'development'
    ? console.log('globalError Handler ~', error)
    : errorLogger.error('globalError Handler ~', error)

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name == 'ValidationError') {
    const simplefiedError = handelvalidationError(error)
    statusCode = simplefiedError.statusCode
    message = simplefiedError.message
    errorMessages = simplefiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    env: process.env.NODE_ENV,
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'prodcution' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
