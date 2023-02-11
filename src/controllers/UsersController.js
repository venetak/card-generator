const UserModel = require('../models/UserModel')
const ImageModel = require('../models/ImageModel')
const to = require('../utilities/AwaitTo')
const fs = require('fs/promises')
const path = require('path')
const statusCodes = require('../utilities/statusCodes')

class UsersController {

    async login(req, res) {
        console.warn(req.body)
        let [errorGettingUser, user] = await to(UserModel.findOne({ email: req.body.email }))
        if (errorGettingUser) return res.error(errorGettingUser)
        if (!user) return res.error('email_does_not_exist')
        // md5(user.password) !== req.body.password
        if (user.password !== req.body.password) return res.error('invalid_password')
        req.session.user = user
        res.ok(user)
    }

    async register(req, res) {
        let email = req.body.email
        let password = req.body.password
        let [errorGettingUser, dbUser] = await to(UserModel.findOne({ email }))
        if (errorGettingUser) return res.error(errorGettingUser)
        if (dbUser) return res.error('email_already_exists')
        // md5(req.body.password)
        let newUser = new UserModel({ email, password })
        let [errorSaveUser] = await to(newUser.save())
        if (errorSaveUser) return res.error(errorSaveUser)
        // login after register
        req.session.user = newUser
        res.ok(newUser)
    }

    logout(req, res) {
        req.session.user = null
        res.ok()
    }

    getMyImages(req, res) {
        res.ok([])
    }

    async postImages(req, res) {
        if (!req.files || !req.files.image) return res.error('no_files_uploaded')
        let file = req.files.image
        const fileSaveDir = path.resolve(__dirname + '../../../' + 'uploads/' + Date.now() + file.name)
        let [errorSave] = await to(fs.copyFile(file.tempFilePath, fileSaveDir))
        if (errorSave) return res.error(errorSave)
        let image = new ImageModel({ name: file.name })
        let [errorSaveImage] = await to(image.save())
        if (errorSaveImage) return res.error(errorSaveImage)
        res.ok(req.files)
    }

    getUser(req, res) {
        res.ok(req.session.user)
    }
}

module.exports = new UsersController()
