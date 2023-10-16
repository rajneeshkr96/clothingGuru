// importing require files 
const app = require("./app")
const dotenv = require('dotenv');
const connectDatabase = require("./config/dbConnect");

// set up config file 
dotenv.config({ path: "./config/config.env" });

// handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception occured! Shutting down...');
    process.exit(1);
})
//  connect to Database 
connectDatabase()

// running server
const server = app.listen(process.env.PORT, () => {
    console.log(`server has started... on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})
// handling unhandled errors
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Unhandled rejection occured! Shutting down...');

    server.close(() => {
        process.exit(1);
    })
})

