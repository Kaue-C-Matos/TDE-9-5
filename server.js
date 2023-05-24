const express = require("express")
const tasksRoutes = require("./routes/tasks")
const usersRoutes = require("./routes/users")

const server = express()
server.use(express.json())

const logRequest = (req, res, next)=>{
    console.log(req.method, req.url)
    next();
}

server.use(logRequest)

server.use(tasksRoutes.router)
server.use(usersRoutes.router)

module.exports=server;