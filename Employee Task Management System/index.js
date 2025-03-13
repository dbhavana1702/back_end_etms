const express = require('express');
//  Handling HTTP requests (GET, POST, PUT, DELETE)
//  Managing routes (/users, /products, etc.)
//  Connecting to databases (MongoDB, MySQL, etc.)
//  Using middleware for authentication, logging, and error handling
const app = express();//creates an instance of an Express application->The express() function initializes an Express app.
const employeeRoute = require('./route/employeeRoute');
const dbConnect = require('./dbconfig');
const projectRoute = require('./route/projectRoute');
const taskRoute = require('./route/taskRoute');
const assignRoute = require('./route/assignRoute');
const adminRoute = require('./route/adminRoute');
const authRoute=require('./route/authRoute');
const commentsRoute=require('./route/commentsRoute')
var cors=require('cors')
const $PORT = process.env.$PORT || 5001;//cloud 

app.use(express.json())
app.use(cors())//cross origin
dbConnect();//db is connected

app.use('/api/employee', employeeRoute);
app.use('/api/project', projectRoute);
app.use('/api/task', taskRoute);
app.use('/api/assign', assignRoute);
app.use('/api/admin', adminRoute);
app.use('/api/auth',authRoute);
app.use('/api/comment',commentsRoute)
app.listen($PORT, () => console.log(`Server listening on port ${$PORT}`))