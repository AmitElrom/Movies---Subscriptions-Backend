const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const movieBL = require('../models/movieBL')

router.route('/')
    .get( async (req,res) =>
    {
        try {
            let movies = await movieBL.getMovies()
            res.json(movies)
        } catch (error) {
            res.send(error)
        }
    })

router.route('/:id')
    .get(async (req,res) =>
    {
        try {
            let { params : { id } } = req;
            let movie = await movieBL.getMovie(id)
            res.json(movie)
        } catch (error) {
            res.send(error)
        }
    })

router.route('/')
    .post(async (req,res) =>
    {
        try {
            let { body : movie } = req;
            let status = await movieBL.addMovie(movie);
            res.send(status)
        } catch (error) {
            res.send(error)
        }
    })

router.route('/:id')
    .put(async (req,res) =>
    {
        try {
            let { body : movie, params : { id } } = req;
            let status = await movieBL.updateMovie(id, movie)
            res.send(status)
        } catch (error) {
            res.send(error)
        }
    })

router.route('/:id')
    .delete(async (req,res) =>
    {
        try {
            let { params : { id } } = req;
            let status = await movieBL.deleteMovie(id)
            res.send(status)
        } catch (error) {
            res.send(error)
        }
    })

module.exports = router;