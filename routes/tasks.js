const express = require('express');
const { saveTask, getAlltasks, updateTask, deleteTask } = require('../database/tasks');
const auth = require('../middleware/auth');
const router = express.Router();
const z = require('zod')

const taskSchema = z.object({
    nome: z.string({
        required_error: 'Nome não foi preenchido',
        invalid_type_error: 'Nome deve ser uma string'
    }),
    descricao: z.string({
        required_error: 'Descrição não foi preenchido',
        invalid_type_error: 'Descrição deve ser uma string'
    }),
    isDone: z.boolean({
        required_error: 'isDone não foi preenchido',
        invalid_type_error: 'isDone deve ser um boolean'
    })
})


router.get("/tasks", auth, async (req, res)=>{
    const tasks = await getAlltasks();
    res.json({tasks})
})

router.post("/tasks", auth, async (req, res)=>{
    try{
        const newTask= taskSchema.parse(req.body)
        const savedTask = await saveTask(newTask);
        res.json({
            savedTask
        })
    } catch(err){
        if (err instanceof z.ZodError) return res.status(422).json ({
            message: err.errors
        })
        res.status(500).json({message: "Erro no servidor"})
    }
})

router.put("/tasks/:id", auth, async (req, res)=>{
    const id = Number(req.params.id);
    const task = taskSchema.parse(req.body)
    const updatedTask = await updateTask(id, task)
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