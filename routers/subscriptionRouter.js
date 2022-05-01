const express = require('express')
const router = express.Router()

const {addSubscription, getSubs, getMemberMovies} = require('../models/subscriptionBL')

router.route('/')
    .get(async (req,res) =>
    {
        try {
            let subscriptions = await getSubs()
            res.json(subscriptions)
        } catch (error) {
            res.send(error)
        }
    })

router.route('/:id')
    .get(async (req,res) =>
    {
        try {
            let {params : {id}} = req;
            let movies = await getMemberMovies(id)
            res.json(movies)
        } catch (error) {
            res.send(error)
        }
    })

router.route('/')
    .post(async (req,res) =>
    {
        try {
            let { body : subscription } = req;
            let status = await addSubscription(subscription)
            res.send(status)   
        } catch (error) {
            res.send(error)
        }
    })

module.exports = router;