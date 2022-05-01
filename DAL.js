const {member, movie, subscription} = require('./models/models')

const getMoviesDAL = () =>
{
    return new Promise((resolve,reject) =>
    {
        movie.find({}, (err,data) =>
        {
            if(err) reject(err)
            resolve(data)
        })
    })
}

const getMembersDAL = () =>
{
    return new Promise((resolve,reject) =>
    {
        member.find({}, (err,data) =>
        {
            if(err) reject(err)
            resolve(data)
        })
    })
}

const getSubscriptionsDAL = () =>
{
    return new Promise((resolve,reject) =>
    {
        subscription.find({}, (err,data) =>
        {
            if(err) reject(err)
            resolve(data)
        })
    })
}

module.exports = {getMoviesDAL, getMembersDAL, getSubscriptionsDAL}