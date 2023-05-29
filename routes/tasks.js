const express = require('express');
const { saveTask, getAlltasks, updateTask, deleteTask } = require('../database/tasks');
const auth = require('../middleware/auth');
const router = express.Router();



router.get("/tasks", auth, async (req, res)=>{
    const tasks = await getAlltasks();
    res.json({tasks})
})

router.post("/tasks", auth, async (req, res)=>{
    const newTask={
        nome: req.body.nome,
        descricao: req.body.descricao,
        isDone: req.body.isDone
    }
    const savedTask = await saveTask(newTask);
    res.json({
        savedTask
    })
})

router.put("/tasks/:id", auth, async (req, res)=>{
    const id = Number(req.params.id);
    const product = {
    nome: req.body.nome,
    descricao: req.body.descricao,
    isDone: req.body.isDone
    }
    const updatedTask = await updateTask(id, product)
    res.json({
        product: updatedTask
    })
})

router.delete("/tasks/:id", auth,  async (req, res)=>{
    const id = Number(req.params.id);
    await deleteTask(id)
    res.status(204).send();
})

module.exports = {router}