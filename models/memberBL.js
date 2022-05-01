const {getMembersDAL, getMoviesDAL, getSubscriptionsDAL} = require('../DAL')
const {member, subscription} = require('./models')

const getMembers = async () =>
{
    const movies = await getMoviesDAL() 
    const members = await getMembersDAL() 
    const subs = await getSubscriptionsDAL() 

    
    const membersExtended = [];
    
    members.forEach(member =>
    {
        let {_id, name, email, city} = member;
        let memberSubs = subs.filter(x => x.memberId == _id)

        const allMemberSubs = [];
        for(let sub of memberSubs)
        {
            let {_id,movieId,memberId,date} = sub;
            
            let subMovie = movies.find(x => x._id == sub.movieId)
            if(subMovie !== null)
            {
                let newSub = { _id, movieId, memberId, date, movieDetails : subMovie };

                allMemberSubs.push(newSub)
            }
        }
        
        let memberObj = { _id, name, email, city, allMemberSubs };

        membersExtended.push(memberObj)

    })

    return membersExtended;
}

const getMember = async (id) =>
{
    const movies = await getMoviesDAL() 
    const members = await getMembersDAL() 
    const subs = await getSubscriptionsDAL() 

    let wantedMember = members.find(x => x._id == id)
    if(wantedMember !== null) 
    {
        let {_id, name, email, city} = wantedMember;
        let memberSubs = subs.filter(x => x.memberId == _id)

        const allMemberSubs = [];
        for(let sub of memberSubs)
        {
            let {_id,movieId,memberId,date} = sub;
            
            let subMovie = movies.find(x => x._id == sub.movieId)
            if(subMovie !== null)
            {
                let newSub = { _id, movieId, memberId, date, movieDetails : subMovie };

                allMemberSubs.push(newSub)
            }
        }
        
        wantedMember = { _id, name, email, city, allMemberSubs };

        return wantedMember;
    }
}

const addMember = (obj) =>
{
    return new Promise((resolve,reject) =>
    {
        const newMember = new member(obj)

        newMember.save((err) =>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('member created')
            }
        })
    })
}

const updateMember = (id,obj) =>
{
    return new Promise((resolve,reject) =>
    {
        member.findByIdAndUpdate(id, obj, (err) =>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('member updated')
            }
        })
    })
}

const deleteMember = (id) =>
{
    return new Promise((resolve,reject) =>
    {
        member.findByIdAndDelete(id, (err) =>
        {
            if(err) reject(err)
            subscription.deleteMany({memberId : id} ,(err) =>
            {
                if(err) reject(err)
                resolve('member deleted')
            })
        })
    })
}

module.exports = {getMembers, getMember, addMember, updateMember, deleteMember}