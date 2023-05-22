const express = require("express");
const server = express();
const router = express.Router();
const port = 3000; //N° da porta

server.use(router);

server.listen(port, ()=>{
    console.log(`server rodando na porta ${port}`)
})

router.get("/health", (req, res)=>{
    res.json("server is running")
})