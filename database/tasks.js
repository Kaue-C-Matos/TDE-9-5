const prisma = require("./prisma")

const getAlltasks = () =>{
    return prisma.tasks.findMany({
        where: {
            id: {
                gt: 0
            }
        }
    })
}

const saveTask = (task) =>{
    return prisma.tasks.create({
        data: task
    })
}

const updateTask = (id, task) =>{
    return prisma.tasks.update({
        where: {
            id: id
        },
        data: task
    })
}

const deleteTask = (id) =>{
    return prisma.tasks.delete({
        where:{
            id: id
        }
    })
}

module.exports = {
    saveTask,
    getAlltasks,
    updateTask,
    deleteTask
}