const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const { handleError, otherErrors } = require('./middlewares/http-error');
const routes = require('./routes');
const passport = require('passport');
const { jwtStrategy } = require('./middlewares/passport');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');

const app = express();

//MIDDLEWARES
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
const connection = mongoose.connection;

// body parser
app.use(express.json());


//sanitizers
app.use(xss());
app.use(mongoSanitize());


// session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: MongoDbStore.create({
    mongoUrl: mongoUri,
    dbName: 'atlantisdb',
    collection: 'sessions'
  }),
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 5}
}));

app.use(flash());

// passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// routes
app.use('/api', routes);


// handle error
//unrecognized error
app.use(otherErrors);

//our error
app.use((err, req, res, next) => {
  handleError(err, res);
});


const port = process.env.PORT || 3001;

mongoose
  .connect(
    mongoUri
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    });
  })
  .catch(err => {
    console.log(err);
  });