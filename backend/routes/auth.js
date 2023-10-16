const express = require('express');
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/isAuthantictedUser');


//...............................controller imports................................
// all user controller imports are here 
const {tesing,createUser,loginUser,logoutUser,forgotPassword,resetPassword, getUserProfile, changePassword, updateUserProfile, getAllUsers, getSingleUserById, updateUserProfileById, deleteUserById} = require("../controllers/UserController");


//...............................router imports................................
// testing route => api/v1/testing
router.route("/usertest").get(tesing)
//create user => api/v1/register
router.route("/register").post(createUser);
//login user => api/v1/login
router.route("/login").post(loginUser);
//logoutuser => api/v1/logout
router.route("/logout").get(logoutUser);
//forget password user => api/v1/forgotPassword
router.route("/forgotpassword").post(forgotPassword);
//rest password user => api/v1//resetPassword/:resetToken
router.route("/resetpassword/:resetToken").put(resetPassword);
//change password user => api/v1/changepassword 
router.route("/changepassword").put(isAuthenticatedUser,changePassword);
//update profile user => api/v1//me/update
router.route("/me/update").put(isAuthenticatedUser,updateUserProfile);
//get user details => api/v1/me 
router.route("/me").get(isAuthenticatedUser,getUserProfile);

//..........................................admin routes ......................

//get all users => api/v1/admin/users
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);
//get single user => api/v1/admin/user/:id
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUserById);
//update and delete user => api/v1/admin/user/:id
router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateUserProfileById)
                                .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUserById);



//...............................router exports................................

module.exports = router;