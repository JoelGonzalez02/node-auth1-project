const session = require('express-session');

const knexSessionStore = require('connect-session-knex')(session);

const express = require('express');


const restricted = require('./auth/restricted-middleware');

const usersRouter = require('./users/usersRouter');
const authRouter = require('./auth/authRouter');

const server = express();

const sessionConfig = {
    name: 'usersession',
    secret: 'shhhh',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, 
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore(
      {
        knex: require("./data/db-config"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
      }
    )
  }


server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/users', restricted, usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({api: 'is running'})
})

module.exports = server;

