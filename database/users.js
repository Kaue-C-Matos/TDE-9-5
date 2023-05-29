const prisma = require("./prisma")

const findUserByEmail = (email) =>{
    return prisma.users.findUnique({
        where: {email}
    })
}

const findUserById = (id) =>{
    return prisma.users.findUnique({
        select: {
            id: true,
            nome: true,
            email: true,
            senha: false
        },
        where: {id}
    })
}

const saveUser = (user) =>{
    return prisma.users.create({
        data: user
    })
}

module.exports = {
    findUserByEmail,
    findUserById,
    saveUser
}