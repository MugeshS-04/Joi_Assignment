import {sign_up, login} from './joi.js'
import express from 'express'

const app = express()

const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/signup", (req, res) => {
    const sign_up_obj = req.body
    let valid = sign_up.validate(sign_up_obj)
    if(valid.error) res.json({success : false, message : valid.error.message})
    res.json({success : true, message : "sign-up completed"})
})

app.post("/login", (req, res) => {
    const login_obj = req.body
    let valid = login.validate(login_obj)
    if(valid.error) res.json({success : false, message : valid.error.message})
    res.json({success : true, message : "Login Successfull"})
})

app.get("/", (req,res) => { 
    res.send("<h>Hello World!</h>")
})

app.listen(port, () => { console.log(`Server listening on port ${port}`)})