
const isAuthenticated = (req, res, next) => {
    console.log(req.session)
    if(req.session.userId)
        return next()
    return false
}

module.exports.check = isAuthenticated 

