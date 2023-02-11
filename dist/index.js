"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var session = require('express-session');
const path_1 = require("path");
var bodyParser = require('body-parser');
const SESSION_AGE = 365 * 24 * 60 * 60 * 1000;
const app = (0, express_1.default)();
const users = [
    { id: 1, name: 'Veni', email: 'veni@1.com' },
    { id: 2, name: 'Veni2', email: 'veni@2.com' },
    { id: 3, name: 'Veni3', email: 'veni@3.com' },
];
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    name: 'test',
    cookie: {
        secure: true,
        maxAge: SESSION_AGE,
    }
}));
app.use(express_1.default.static((0, path_1.resolve)((0, path_1.join)(__dirname, '../admin'))));
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = 3000;
app.get('/', (req, res) => {
    const { userId } = req.session;
    res.sendFile('index.html');
});
app.post('/register', function (req, res) {
    res.send('Got a POST request');
});
app.get('/login', function (req, res) {
    // res.send('Got a POST request')
});
app.post('/login', function (req, res) {
    // res.send('Got a POST request')
});
app.get('/user:id', function (req, res) {
    // res.send('Got a POST request')
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
