// send token and save in the cookie 
const sendToken = (user,statusCode,res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.cookie('token', token, options);
    res.status(statusCode).json({
        status:'success',
        token,
        user
    });

  
}

module.exports = sendToken;
