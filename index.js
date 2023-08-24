const express = require('express');
const db = require('./config/mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passportLocal = require('./config/passport-local-strategy');

const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// set the assets
app.use(express.static('./assets'));
app.use(express.static('./'));
app.use(expressLayouts);

// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// mongo store is used to store the session cookie in the db

const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/saquib-social-media', // Replace with your MongoDB URI
  collection: 'sessions',
});
store.on('error', (error) => {
  console.error('MongoDB session store error:', error);
});

// Configure sessions

app.use(
  session({
    secret: 'saquib-social-media',
    resave: false,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100 * 24,
    },
    store: store,
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Middleware to set searchValue for all templates
app.use((req, res, next) => {
  const searchValue = req.query.query || '';
  res.locals.searchValue = searchValue;
  next();
});

// use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log('Error in running the server:', err);
  }

  console.log('Server is running on port', port);
});
