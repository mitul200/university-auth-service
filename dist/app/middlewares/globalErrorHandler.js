"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handelValidationError_1 = __importDefault(require("../../errors/handelValidationError"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const mongoose_1 = require("mongoose");
const globalErrorHandler = (error, req, res, next) => {
    // res.send(400).json({ errosssss: err })
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) == 'ValidationError') {
        const simplefiedError = (0, handelValidationError_1.default)(error);
        statusCode = simplefiedError.statusCode;
        message = simplefiedError.message;
        errorMessages = simplefiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof mongoose_1.Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        env: process.env.NODE_ENV,
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== 'prodcution' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
