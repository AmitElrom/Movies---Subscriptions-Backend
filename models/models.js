const mongoose = require('mongoose')

const { Schema, model, Types : { ObjectId } } = mongoose;

const userSchema = new Schema({
    fullName : String,
    username : String,
    password : String
})

const movieSchema = new Schema({
    name : String,
    yearPremiered : Number,
    genres : [String],
    image : String
})

const memberSchema = new Schema({
    name : String,
    email : String,
    city : String
})

// connecting collection
const subscriptionSchema = new Schema({
    movieId : String, // _id from movies collection
    memberId : String,// _id from members collection
    date : Date 
})

const user = model('users', userSchema)
const movie = model('movies', movieSchema)
const member = model('members', memberSchema)
const subscription = model('subscriptions', subscriptionSchema)

module.exports = {user, movie, member, subscription}






