const express = require('express')
const router = express.Router();

let tasks = [
    {
        id: 1, 
        nome:"comprar leite", 
        descricao: "ir até a esquina e comprar leite", 
        isDone: false
    }
]

router.get("/tasks", (req, res)=>{
    res.json({tasks})
})

router.post("/tasks", (req, res)=>{

    const newTask={
        id: tasks.length + 1,
        nome: req.body.nome,
        descricao: req.body.descricao,
        isDone: req.body.isDone
    }
    tasks.push({newTask});
    res.json({
        newTask
    })
})

router.put("/tasks/:id", (req, res)=>{
    const id = Number(req.params.id);
    const task = tasks.find((task)=>{
        return task.id === id
    })
    task.nome = req.body.nome
    task.descricao = req.body.descricao
    task.isDone = req.body.isDone
    res.json({task})
})

router.delete("/tasks/:id", (req, res)=>{
    const id = Number(req.params.id);
    tasks = tasks.filter(task=>{
        return task.id !== id
    })
    res.status(204).send();
})

module.exports = {router}