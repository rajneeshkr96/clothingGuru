const jwt = require("jsonwebtoken");
const User = require("../models/user")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const CustomError = require("../utils/customError")
// check user is authenticated or not 
const isAuthenticatedUser = asyncErrorHandler( async (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        next(new CustomError("You are not authenticated",401));
    }
    // decoding the token and verify its 
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    // handling error invalidToken  
    if(!decoded){
        next(new CustomError("You are not authenticated",401));
    }
    const user = await User.findById(decoded.id);
    // handling user not found error
    if(!user){
        next(new CustomError("You are not authenticated",401));
    }
    req.user = user;
    next();

})

// handling user roles 
const authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            next(new CustomError("You are not authorized",403));
        }
        next();
    } 
  
}


module.exports = {isAuthenticatedUser,authorizeRoles};