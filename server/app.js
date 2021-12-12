const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const { handleError, otherErrors } = require('./middlewares/http-error');
const routes = require('./routes');
const passport = require('passport');
const { jwtStrategy } = require('./middlewares/passport');

const app = express();

//MIDDLEWARES
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;


// body parser
app.use(express.json());


//sanitizers
app.use(xss());
app.use(mongoSanitize());

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