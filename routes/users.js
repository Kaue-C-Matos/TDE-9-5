const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { findUserByEmail, saveUser } = require("../database/users");
const router = express.Router();

router.post("/register", async(req, res)=>{
    try{
        const emailIsAlredyUsed = await findUserByEmail(req.body.email)
        if (emailIsAlredyUsed)
            return res.status(400).json({
                message: "Este e-mail já está em uso"
            })
        const hashedPassword = bcrypt.hashSync(req.body.senha, 10);
        const user = {
            nome: req.body.nome,
            email: req.body.email,
            senha: hashedPassword
        }
        const savedUser = await saveUser(user)
        delete savedUser.senha
        res.status(201).json({
            user: savedUser
        })
    }
    catch (error){
        res.status(500).json({
            message: "Erro no servidor"
        })
    }
    
})

router.post("/login", async (req, res)=>{
    const email = req.body.email
    const senha = req.body.senha
    const user = await findUserByEmail(email)

    if(!user) return res.status(401).send

    const isSamePassword = bcrypt.compareSync(senha, user.senha);

    if(!isSamePassword) return res.status(401).send()

    const token = jwt.sign({
        userId: user.id,
        name: user.nome,
    }, process.env.SECRET)

    res.json({sucess: true, token})
})

module.exports = {router}