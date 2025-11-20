import {sign_up, login} from './joi.js'
import express from 'express'

const app = express()

const port = 8080

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

let user_obj = {}

app.post("/signup", (req, res) => {
    const sign_up_obj = req.body
    let valid = sign_up.validate(sign_up_obj)
    if(valid.error) res.json({success : false, message : valid.error.message})
    user_obj = req.body
    res.json({success : true, message : "sign-up completed"})
})

app.post("/login", (req, res) => {
    const login_obj = req.body
    let valid = login.validate(login_obj)
    if(valid.error) res.json({success : false, message : valid.error.message})
    if(req.body.email_id == user_obj.email_id && req.body.pass == user_obj.pass)
    {
        res.json({User_Details : user_obj, message : "Login Successful"})
    }
    res.json({success : false, message : "Invalid email or password"})
})

app.get("/", (req,res) => { 
    res.send("<h>Api is working!</h>")
})

app.listen(port, () => { console.log(`Server listening on port ${port}`)})