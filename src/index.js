const express = require('express')
const session = require('express-session')
const fileUpload = require('express-fileupload')
const { resolve, join } = require('path')


const SESSION_AGE = 365 * 24 * 60 * 60 * 1000
const app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  name: 'api-session-key',
  saveUninitialized: true,
  cookie: { maxAge: SESSION_AGE }
}))

app.use('/admin', express.static(resolve(join(__dirname, '../admin'))))
app.use('/uploads', express.static(resolve(join(__dirname, '../uploads'))))
app.use('/', express.static(resolve(join(__dirname, '../../CardGenerator/www/'))))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

const port = 3000

require('./config/routes')(app)
require('./db')

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../../CardGenerator/www/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})