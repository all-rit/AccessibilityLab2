const express = require('express');
const app = express();
const passport = require('passport');
const auth = require('./auth');
const key = require('./serverConstants');
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

auth(passport);
app.use(passport.initialize());
app.use(cookieSession({
  name: 'session',
  keys: [key.key]
}));
app.use(cookieParser());


app.get('/', (req, res) => {
  if (req.session.token) {
    res.cookie('token', req.session.token);
    req.json({ 
      status: 'session cookie set'
    });
  } else {
    res.cookie('token', '')
    res.json({
      status: 'session cookie not set'
    });
  }
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req,res) => {
    req.session.token = req.user.token;
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logoit();
  req.session = null;
  res.redirect('/');
});

app.post('/gameStats', (req, res) => {
  console.log(req);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
