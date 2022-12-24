const httpStatus = require('http-status')
const logger = require('../config/logger')
const ApiError = require('../utils/error/ApiError')

const errorConverter = (err, req, res, next) => {
    let error = err
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR
        const message = error.message || httpStatus[statusCode]
        error = new ApiError(statusCode, message, false, err.stack)
    }
    next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err
    if (process.env.STATUS === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    }

    res.locals.errorMessage = err.message

    const response = {
        status: statusCode,
        data: message,
        ...(process.env.STATUS === 'development' && { stack: err.stack }),
    }

    if (process.env.STATUS === 'development') {
        logger.error(err)
    }

    res.status(statusCode).send(response)
}

module.exports = {
    errorConverter,
    errorHandler,
}