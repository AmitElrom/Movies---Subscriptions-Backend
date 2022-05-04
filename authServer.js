// localhost 4000

require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const express = require('express')

require('./configs/database')

const app = express()

app.use(cors())
app.use(express.json())

const {user} = require('./models/models')


app.post('/regis', async (req,res) => {
    try {
        let { body : { fullName, username, password } } = req;
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new user({
            fullName,
            username,
            password : hashedPassword.toString()
        })
        
        await newUser.save()
            
        
        res.status(201).send(newUser);
        
        
           

    } catch {
        res.status(400).send()
    }
    
})

app.post('/login', async (req,res) =>
{
    // authentication
    let {body : {username, password }} = req;

    const wantedUser = await user.findOne({username})
    if(wantedUser == null) res.status(400).send('no such user')
    try {
        if(await bcrypt.compare(password, wantedUser.password))
        {
            // jwt authorization
            const accessToken = jwt.sign(wantedUser._id.toString(), process.env.ACCESS_TOKEN_SECRET)
            res.send({wantedUser, accessToken})
        }
        else 
        {
            throw new Error({error:"Wrong Password"})
        }
    } catch(e) {
        res.status(400).send(e.message)
    }
})

app.listen(4000)