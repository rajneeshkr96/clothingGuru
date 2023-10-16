// all import 
const express = require('express');
const errorMiddleware = require("./middlewares/errorsMiddlewares");
const cookieParser = require("cookie-Parser")
const cors = require("cors");
let app = express();

// meddlwares
app.use(express.json());
app.use(cookieParser());
app.use(cors()) 
app.options("*", cors());

// all routes imports 
const product = require("./routes/productRoute");
const auth = require("./routes/auth");
const order = require("./routes/orderRoute");
const CustomError = require('./utils/CustomError');



// version control 
app.use("/api/v1/", product)
app.use("/api/v1/", auth)
app.use("/api/v1/", order)

//page not found error handler
app.all("*", (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
}
)

// error handler
app.use(errorMiddleware)

module.exports = app;