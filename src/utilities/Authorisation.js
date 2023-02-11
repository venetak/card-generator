const statusCodes = require('./statusCodes')

class Authorization { }

Authorization.auth = (req, res, next) => {
    return next()
    if (req.session.user) return next()
    return res.error(statusCodes.Unauthorized);
}

module.exports = Authorization
