const cors = require('cors');
const express = require('express')
const app = express()

// import routers
const movieRouter = require('./routers/movieRouter')
const memberRouter = require('./routers/memberRouter')
const subscriptionRouter = require('./routers/subscriptionRouter')

require('./configs/database')

app.use(cors())

app.use(express.json())

// routers
app.use('/movies', movieRouter)
app.use('/members', memberRouter)
app.use('/subscriptions', subscriptionRouter)

app.listen(1938)