const { users } = require("../models/index")
const express = require("express")

const userRouter = express.Router();

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")


userRouter.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const existingUser = await users.findOne({
        where: { email },
    });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    else {

        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                const newUser = await users.create({
                    name,
                    email,
                    password: hash,
                });
                res.status(200).json({
                    isError: false,
                    newUser,
                    msg: "New User has been created"
                })

            })
        }
        catch (err) {
            res.status(400).send(err)
        }
    }
})
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        } else {

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                'roshan',
                { expiresIn: '7d' }
            );

            res.status(200).json({
                isError: false,
                token,
                msg: "Login Successful"
            });
        }
    } catch (error) {
        res.status(404).json({
            isError: true,
            error: error.message
        })
    }
})
module.exports = { userRouter }
