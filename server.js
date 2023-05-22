const express = require("express")
const tasksRoutes = require("./tasks")

const server = express()
server.use(express.json())

server.use(tasksRoutes.router)

module.exports=server;