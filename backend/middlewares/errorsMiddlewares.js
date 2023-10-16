
const CustomError = require("../utils/CustomError")
// json web token error handler
const JsonWebTokenError =  (err) => {
    const msg = "invalid web token"
    return new CustomError(msg, 401);
} 
// expired token handler
const handleExpireJwt = (err) => {
    const msg = "jwt has expired please login again "
    return new CustomError(msg, 401);
} 
// handling castError
const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}!`
    return new CustomError(msg, 400);
}

// handling duplicateKeyError
const duplicateKeyErrorHandler = (err) => {
    const name = err.keyValue.name;
 const msg = `There is already a products with name ${name}. Please use another name!`;
 
 return new CustomError(msg, 400);
}

// handling validationError
const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const errorMessages = errors.join('. ');
    const msg = `Invalid input data: ${errorMessages}`;
    
    return new CustomError(msg, 400);
}

// handling devlepment mode error
const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        success: false,
        message: error.message,
        stackTrace: error.stack,
        error: error
    });
}

// handling production mode error
const prodErrors = (res, error) => {
    if(error.isOperational){
        res.status(error.statusCode).json({
            success: false,
            message: error.message
        });
    }else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later.'
        })
    }
}

// error handling middleware
module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        devErrors(res, error);
    } else if(process.env.NODE_ENV === 'PRODUCTION'){
        if(error.name === 'CastError') error = castErrorHandler(error);
        if(error.code === 11000) error = duplicateKeyErrorHandler(error);
        if(error.name === 'ValidationError') error = validationErrorHandler(error);
        if(error.name === 'TokenExpiredError') error = handleExpireJwt(error);
        if(error.name === 'JsonWebTokenError') error = JsonWebTokenError(error);
        
        prodErrors(res, error);
    }
}