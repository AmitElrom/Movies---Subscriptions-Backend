const {getMembersDAL,getMoviesDAL,getSubscriptionsDAL} = require('../DAL')
const {movie, subscription, member} = require('./models')

function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");}

const getMovies = async () =>
{
    const movies = await getMoviesDAL()
    const subs = await getSubscriptionsDAL()
    const members = await getMembersDAL()

    const moviesExtended = [];
    
    movies.forEach(movie =>
    {
        let {_id, name, yearPremiered, genres, image} = movie;
        let movieSubs = subs.filter(x => x.movieId == _id)

        const allMovieSubs = [];
        for(let sub of movieSubs)
        {
            let {_id,movieId,memberId,date} = sub;
            
            let subMember = members.find(x => x._id == sub.memberId)
            if(subMember !== null)
            {
                let newSub = { _id, movieId, memberId, date, memberDetails : subMember };

                allMovieSubs.push(newSub)
            }
        }
        
        let movieObj = { _id, name, yearPremiered, genres, image, allMovieSubs };

        moviesExtended.push(movieObj)

    })

    return moviesExtended;
}

const getMovie = async (id) =>
{
    let movies = await getMoviesDAL()
    let subs = await getSubscriptionsDAL()
    let members = await getMembersDAL()

    let wantedMovie = movies.find(x => x._id == id)
    if(wantedMovie !== null) 
    {
        let {_id, name, yearPremiered, genres, image} = wantedMovie;

        let movieSubs = subs.filter(x => x.movieId == id)
        const allMovieSubs = [];
        for(let sub of movieSubs)
        {
            let {_id,movieId,memberId,date} = sub;
            
            let subMember = members.find(x => x._id == sub.memberId)
            if(subMember !== null)
            {
                let newSub = { _id, movieId, memberId, date : date.toDateString(), memberDetails : subMember };

                allMovieSubs.push(newSub)
            }
        }
        wantedMovie = { _id, name, yearPremiered, genres, image, allMovieSubs };
    }
    return wantedMovie;
}

const addMovie = (obj) =>
{
    return new Promise((resolve,reject) =>
    {
        const newMovie = new movie(obj);

        newMovie.save(err =>
        {
            if(err) reject(err)
            resolve('movie created') 
        })
    })
}

const updateMovie = (id,obj) =>
{
    return new Promise((resolve,reject) =>
    {
        movie.findByIdAndUpdate(id, obj, (err) =>
        {
            if(err) reject(err)
            resolve('movie updated')
        })
    })
}

const deleteMovie = (id) =>
{
    return new Promise((resolve,reject) =>
    {
        movie.findByIdAndDelete(id, (err) =>
        {
            if(err) reject(err)
            subscription.deleteMany({movieId : id} ,(err) =>
            {
                if(err) reject(err)
                resolve('movie deleted')
            })
        })
    })
}

module.exports = {getMovies, getMovie, addMovie, updateMovie, deleteMovie}