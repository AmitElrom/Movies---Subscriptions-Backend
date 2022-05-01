const {subscription, movie, member} = require('./models')
const {getSubscriptionsDAL, getMembersDAL} = require('../DAL')
const {getMember} = require('./memberBL')

const addSubscription = async (obj) =>
{
    const subs = await getSubscriptionsDAL()

    let memberSubs = subs.filter(x => x.memberId == obj.memberId)
    
    let isSubExists = false;
    memberSubs.forEach(sub => {
        
        let sub2 = {
            movieId : sub.movieId,
            memberId : sub.memberId,
            date : sub.date.toISOString().slice(0,10)
        }

        if(sub2.movieId === obj.movieId && sub2.date === obj.date)
        {
            isSubExists = true;
        }
        else
        {
            isSubExists = false;
        }
    });
    
    if(isSubExists === true)
    {
        return 'sub already exists'
    }
    else // isSubExists === false
    {
        const newSub = new subscription(obj);

        await newSub.save(err =>
            {
                if(err)
                {
                    return err
                }
            })

        }
        return await getMember(obj.memberId).then(x => x.allMemberSubs)
    }

const getSubs = async() =>
{
    const subs = await getSubscriptionsDAL()
    return subs
}

const addSubscription1 = async (obj) =>
{
    return new Promise((resolve,reject) =>
    {
        const newSubscription = new subscription(obj);

        newSubscription.save(err =>
        {
            if(err) reject(err)
            resolve('subscription created')
        })

    })
}

module.exports = {addSubscription, getSubs}