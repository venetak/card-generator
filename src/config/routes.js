const UsersController = require('../controllers/UsersController')
const ImagesController = require('../controllers/ImagesController')
const { auth } = require('../utilities/Authorisation')
const Response = require('../utilities/Response')

const action = (action) => {
    return (req, res) => {
        console.log(req.method, req.url)
        action(req, new Response(res))
    }
}

module.exports = (app) => {
    // user related routes
    app.post('/user/login',                        action(UsersController.login))
    app.post('/user/logout',             auth,     action(UsersController.logout))
    app.post('/user/register',                     action(UsersController.register))

    app.get('/user/images',              auth,     action(UsersController.getMyImages))
    app.post('/user/images',             auth,     action(UsersController.postImages))

    app.get('/user',                     auth,     action(UsersController.getUser))


    // user images related routes
    app.get('/images',                             action(ImagesController.getAll))
    app.get('/images/:id',                         action(ImagesController.getOne))
}