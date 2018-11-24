const express = require('express');
const app = express();
const passport = require('passport');
const auth = require('./auth');
const key = require('./serverConstants');
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

auth(passport);
app.use(passport.initialize());
app.use(cookieSession({
  name: 'session',
  keys: [key.key]
}));
app.use(cookieParser());

var hold = null;

var whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://tempwebsite.com:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else if (origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.get('/main', (req, res) => {
  if (req.session.token) {
    res.cookie('token', req.session.token);
    res.json({ 
      status: 'session cookie set',
      user: 'temp'
    });
  } else if (hold !== null) {
    req.session.token = hold;
    hold = null;
    res.cookie('token', req.session.token);
    res.json({
      status: 'session cookie set',
      user: 'temp'
    });
  } else {
    res.cookie('token', '')
    res.json({
      status: 'session cookie not set'
    });
  }
});

app.get('/auth/google', 
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
  }),
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req,res) => {
    req.session.token = req.user.token;
    console.log(req.user);
    hold = req.session.token;
    res.redirect('http://localhost:3000');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

app.post('/gameStats', (req, res) => {
  console.log(req);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
