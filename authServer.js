// localhost 4000

require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const express = require('express')

const app = express()

app.use(cors())
app.use(express.json())

const {user} = require('./models/models')

app.post('/regis', async (req,res) =>
{
    try {
        let { body : { fullName, username, password } } = req;
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new user({
            fullName,
            username,
            password : hashedPassword
        })

        newUser.save((err) =>
            {
                if(err) {
                    res.status(500)
                }
                else
                {
                    res.status(201).send('user created')
                }
            })

    } catch {
        res.status(500).send()
    }
    
})

app.post('/login', async (req,res) =>
{
    // authentication
    let {body : {username, password}} = req;

    const wantedUser = await user.find({username})
    if(wantedUser == null) res.status(400).send('no such user')
    try {
        if(await bcrypt.compare(password, wantedUser.password))
        {
            res.send('User Successfully Found')

            // jwt authorization
            const { body : { id : selectedUser } } = req;

            const accessToken = jwt.sign(selectedUser, process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken})
        }
        else 
        {
            res.send('Wrong Password')
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(4000)