const User = require("../models/user");
const sendToken = require("../utils/jwtToken");
const CustomError = require("../utils/CustomError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Apifeatures = require("../utils/ApiFeatures");

//testing
const tesing = (req, res, next) => {
  res.status(200).json({
    success: true,
    test: "Worker"
  });
}

// create a new user => /api/v1/register
const createUser = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name, email, password,
    avatar: {
      public_id: "ffee",
      url: "ff"
    }
  });
  // sending token and save in the cookie 
  sendToken(user, 200, res)
});

// login user => api/v1/login
const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // check if email and password enter or not
  if (!email || !password) {

    return next(new CustomError("Please provide email and password", 400));
  }
  // find user by email
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new CustomError("Invalid email or password", 401));
  }
  // check if password match
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new CustomError("Invalid email or password", 401));
  }
  // sending token and save in the cookie 
  sendToken(user, 200, res)
});


// logout user  => api/v1/logout

const logoutUser = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
});

// .....................................forgot and reset password section ........
//forgot password +> /api/v1/forgotPassword

const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new CustomError("Please provide email", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("Invalid email", 401));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/resetPassword/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link to reset your password: \n\n
    ${resetUrl}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n\n
    Thank you.\n
    `;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message
    });
    res.status(200).json({
      success: true,
      message: "Email sent"
    });

  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new CustomError("Email could not be sent", 500));
  }

})

//reset password +> /api/v1/resetPassword/:resetToken

const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
  const { newPassword, confirmPassword } = req.body;
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    return next(new CustomError("Invalid token", 401));
  }
  if (newPassword !== confirmPassword) {
    return next(new CustomError("Password and confirm not match", 401));
  }
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  sendToken(user, 200, res)
});
// ............................   ....................................

// change password => api/v1/changePassword

const changePassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new CustomError("User not found", 401));
  }
  const isMatch = await user.matchPassword(req.body.currentPassword);
  if (!isMatch) {
    return next(new CustomError("Current password is incorrect", 401));
  }
  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

//update user profile => api/v1/me/update
const updateUserProfile = asyncErrorHandler(async (req, res, next) => {
  const updaterDetails = {
    email: req.body.email,
    name: req.body.name,
    avatar: {
      public_id: "req.body.avatar.public_id",
      url: "req.body.avatar.url"
    }
  }
  const user = await User.findByIdAndUpdate(req.user.id, updaterDetails, { new: true });
  res.status(200).json({
    success: true,
    message: "updated successfully",
    user
  });

});

//get login user information => api/v1/me 

const getUserProfile = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user
  });
});

//..........................................admin routes ......................
//get all users => api/v1/admin/users

const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const apiFeatures = new Apifeatures(User.find(), req.query)
    .sort()
    .limitFields()
    .paginate()
  const users = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: users.length,
    users
  });
});

//get single user => api/v1/admin/user/:id

const getSingleUserById = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomError("User not found", 401));
  }
  res.status(200).json({
    success: true,
    user
  });
});

//update profile user by id => api/v1/admin/user/:id

const updateUserProfileById = asyncErrorHandler(async (req, res, next) => {
  const updaterDetails = {
    email: req.body.email,
    name: req.body.name,
    avatar: {
      public_id: "req.body.avatar.public_id",
      url: "req.body.avatar.url"
    }
  }
  const user = await User.findByIdAndUpdate(req.params.id, updaterDetails, { new: true });
  res.status(200).json({
    success: true,
    message: "updated successfully",
    user
  });
});

//delete user by id => api/v1/admin/user/:id

const deleteUserById = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) {
    return next(new CustomError("User not found", 401));
  }
  res.status(200).json({
    success: true,
    message: "deleted successfully",
    user
  });
});


module.exports = { tesing, createUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, changePassword, updateUserProfile, getAllUsers, getSingleUserById, updateUserProfileById, deleteUserById };