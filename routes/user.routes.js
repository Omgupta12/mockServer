const express = require("express")
const app = express.Router()
const UserModel = require("../model/user.model")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

// Signup Route
app.post("/signup", async (req, res) => {
    const { email, password } = req.body

    const hash = await argon2.hash(password)
    // console.log(hash)
    try {
        let user = await UserModel.findOne({ email });
        if (user) {
          return res.status(404).send("email address already present")
        }
        
        const createdUser = new UserModel({ email, password: hash })
        await createdUser.save()
        return res.status(201).send("User Created")
    }
    catch (e) {
        console.log(e.message)
        return res.send(e.message)
    }

})


// Login Route
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email })
    //   console.log(user)

    if (user) {
        if (user.password == password || await argon2.verify(user.password, password)) {

            const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, 
                "SECRETkey", { expiresIn: "4 days" })

            const refreshToken = jwt.sign({ id: user._id, username: user.username, email: user.email },
                 "REFRESHkey", { expiresIn: "10 days" })

            return res.status(201).send({ message: "Login Successfull",user, token, refreshToken })
        }
        else {
            return res.status(401).send("Invalid Credentials")
        }
    }
    else {
        return res.status(401).send("Invalid Credentials")
    }
})

module.exports = app