const express = require("express")
const tasksRoutes = require("./routes/tasks")
const usersRoutes = require("./routes/users")
const logger = require("./middleware/logger")

const server = express()
server.use(express.json())

server.use(logger)

server.use(tasksRoutes.router)
server.use(usersRoutes.router)

module.exports=server;