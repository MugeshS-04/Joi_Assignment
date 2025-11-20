import {sign_up, login} from './joi.js'
import express from 'express'
import bcrypt from 'bcrypt'

const app = express()

const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let User_Map = new Map()

app.post("/signup", async (req, res) => {

    let valid = sign_up.validate(req.body)

    if(valid.error) res.json({success : false, message : valid.error.message})
    
    let hashpass = await bcrypt.hash(req.body.pass, 10)

    let details = {
        name : req.body.name,
        age : req.body.age,
        email_id : req.body.email_id,
        pass : hashpass
    }

    User_Map.set(req.body.email_id, details)

    res.json({success : true, message : "sign-up completed"})
})

app.post("/login", async (req, res) => {

    let valid = login.validate(res.body)

    if(valid.error) res.json({success : false, message : valid.error.message})
        
    let key = req.body.email_id
        
    if(User_Map.has(key))
    {    
        let obj = User_Map.get(key)
        
        const isMatch = await bcrypt.compare(req.body.pass, obj.pass)
        if(isMatch)
        {
            res.json({name : obj.name, age : obj.age, email_id : obj.email_id, pass : req.body.pass})
        }
        else
        {
            res.json({message : "The password is incorrect"})
        }
    }
    else 
    {
        res.json({success : false, message : "No data is available"})
    }
})

app.get("/", (req,res) => { 
    res.send("<h>Api is working!</h>")
})

app.listen(port, () => { console.log(`Server listening on port ${port}`)})