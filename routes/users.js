const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const z = require('zod')
const { findUserByEmail, saveUser, findUserById } = require("../database/users");
const auth = require("../middleware/auth");
const router = express.Router();

const userSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(6)
})

router.post("/register", async(req, res)=>{
    try{
        const user = userSchema.parse(req.body)
        const emailIsAlredyUsed = await findUserByEmail(req.body.email)

        if (emailIsAlredyUsed)
            return res.status(400).json({
                message: "Este e-mail já está em uso"
            })

        const hashedPassword = bcrypt.hashSync(req.body.senha, 10);
        user.senha =hashedPassword

        const savedUser = await saveUser(user)

        delete savedUser.senha
        
        res.status(201).json({
            user: savedUser
        })
    }
    catch(err){
        if (err instanceof z.ZodError) return res.status(422).json ({
            message: err.errors
        })
        res.status(500).json({message: "Erro no servidor"})
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

router.get("/profile", auth ,async (req, res) =>{
    const user = await findUserById(req.user.userId)
    delete user.senha
    res.json({user})
})

module.exports = {router}