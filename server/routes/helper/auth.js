const isAuthenticated = (req, res, next) => {
    // console.log(req.session)
    if(req.session.userId) return next()
    return res.status(401).send('User is unauthenticated')
}

module.exports = {
    isAuthenticated,
}