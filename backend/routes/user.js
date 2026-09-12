const express = require('express');
const zod = require('zod');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config.js')
const { User, Account } = require('../db');
const { authMiddleware } = require("../middleware.js")
const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})
// signup and singin routes

router.post("/signup", async (req,res)=>{
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.json({
            message:"Email already taken/incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username:req.body.username 
    })

    if(existingUser){
        return res.status(411).json({
            message:"Email already taken"
        })
    }
    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
    })
    const userId = user._id ;
    //Assigning a random balance to user while singUp
    await Account.create({
        userId,
        balance: 1 + Math.random()*10000 
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"user created",
        token:token
    })
})

const signinBody= zod.object({
    username:zod.string(),
    password:zod.string()
})

router.post('/signin', async(req,res)=>{
    const success = signinBody.safeParse(req.body);
    if(!success){
        res.json({
            message:"Email alreaady taken/incorrect inputs"
        })
    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password,
    })

    if(user){
        const token = jwt.sign({
            userId:user._id,
        },JWT_SECRET);
        res.json({
            token:token
        })
        return ;
    }
    res.status(411).json({
        message:"Erro while loggin in"
    })
})

const updateBody = zod.object({
    password:zod.string().optional,
    firstName:zod.string().optional,
    lastName:zod.string().optional
});


router.put('/', authMiddleware, async(req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.json({
            message:"Invalid data format"
        })
    }
    await User.updateOne(
        { _id: req.userId },
        { $set: req.body }
    );
    res.json({
        message:"Details Updated"
    })
})

///api/v1/user/bulk? filter = "username"

router.get('/bulk', authMiddleware, async (req,res)=>{
    const filterFromUrl = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filterFromUrl
            }
        },{
            lastName:{
                "$regex":filterFromUrl
            }
        }]
    })

    res.json({
        user : users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

module.exports = router;