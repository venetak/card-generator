const ImageModel = require('../models/ImageModel')

class ImagesController {

    getAll(req, res) {
        ImageModel.find({}, { __v: 0 })
            .then(res.ok)
            .catch(res.error)
    }

    getOne(req, res) {
        ImageModel.findById(req.params.id, { __v: 0 })
            .then(res.ok)
            .catch(res.error)
    }
}

module.exports = new ImagesController()
