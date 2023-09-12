const express = require('express');
const bodyParser = require('body-parser');
const baseRoutes = require('./routes/baseRoutes');
const session = require('express-session');
const passport = require('./passport-config');
const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname + '/public' ));
const db = require('./db');


// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .send('Hello server is running')
//     .end();
// });
 
// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Parse incoming request bodies in URL-encoded format
app.use(bodyParser.urlencoded({ extended: true }));

// Express session middleware
app.use(
  session({
    secret: 'UDS-SoB',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Set res.locals.user to the current authenticated user
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
// use Route created
app.use(baseRoutes)

// Enable CORS for all routes
app.use(cors());

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});