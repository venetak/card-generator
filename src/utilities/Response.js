const statusCodes = require("./statusCodes")

class Response {
    constructor(res) {
        this.res = res
        this.ok = this.ok.bind(this)
        this.error = this.error.bind(this)
    }

    ok(data) {
        this.res.status(200).json({ success: true, data })
    }

    error(statusCode = statusCodes.BadRequest, error) {
        this.res.status(statusCode).json({ success: false, error })
    }
}

module.exports = Response
