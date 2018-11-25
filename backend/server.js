const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
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
  keys: [key.key],
  path: '/main',
  httpOnly: false
}));
app.use(cookieParser());

var hold = null;
var users = 0;

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

db.serialize(function() {
  db.run('CREATE TABLE Users (UserID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, FirstName TEXT , NickName TEXT)');
  db.run('CREATE TABLE AllLogins (LoginID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, UserSssionID INTEGER NOT NULL, Location TEXT, Login NUMERIC NOT NULL)');
  db.run('CREATE TABLE Login (UserSessionID NOT NULL PRIMARY KEY, UserID INTEGER NOT NULL)');
  db.run('CREATE TABLE GameStats (GameStatsID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Score INTEGER NOT NULL, Correct INTEGER NOT NULL, Incorrect INTEGER NOT NULL, Mode TEXT NOT NULL, UserID INTEGER NOT NULL)');
});

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
    res.cookie('token', hold);
    hold = null;
    console.log(req.cookies);
    res.json({
      status: 'session cookie set',
      user: `temp`
    });
  } else {
    res.cookie('token', '')
    req.session.token = '';
    db.serialize(function() {
      const user = db.prepare('INSERT INTO Users VALUES (?,?,?)', [null, '', '']);
      const login = db.prepare(`INSERT INTO Login VALUES (?,?)`, [req.session.token, users]);
      const allLogin = db.prepare(`INSERT INTO AllLogins VALUES (?,?,?,?,?)`, [null, users, req.session.token, '', Date.now()]);
      user.run();
      user.finalize();
      console.log('insert 1 worked');
      login.run();
      login.finalize();
      console.log('insert 2 worked');
      allLogin.run();
      allLogin.finalize();
      console.log('insert 3 worked');
      users++;
      db.each('SELECT * FROM Users', function(err, user) {
        console.log(user.UserID + ': ' + user.FirstName);
      })
    });
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
    req.session.views = 1;
    //console.log(req.user.profile.name.givenName); //First name for user
    //console.log(req.session.token);
    db.serialize(function() {
      const user = db.prepare(`INSERT INTO Users (FirstName, NickName) VALUES (${req.user.profile.name.givenName}, NULL)`);
      const login = db.prepare(`INSERT INTO Login (UserSessionID, UserID) VALUES (${req.session.token}, ${users})`);
      const allLogin = db.prepare(`INSERT INTO AllLogins (UserID, UserSessionID, Location, Login) VALUES (${users}, ${req.session.token}, NULL, ${Date.now()})`);
      user.run();
      user.finalize();
      login.run();
      login.finalize();
      allLogin.run();
      allLogin.finalize();
      users++;
      db.each('SELECT userCheck AS UserID, FirstName FROM Users', function(err, user) {
        console.log(user.UserID + ': ' + user.FirstName);
      })
    });
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

process.on('SIGINT', () => {
  db.close();
  server.close();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
