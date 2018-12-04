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
app.use(express.json());

let hold = null;
let users = 1;

let whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://tempwebsite.com:3000', 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'];
let corsOptions = {
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
  db.run('CREATE TABLE GameStats (GameStatsID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Score INTEGER NOT NULL, CorrectOnClick INTEGER NOT NULL, IncorrectOnClick INTEGER NOT NULL, CorrectOnNoClick INTEGER NOT NULL, IncorrectOnNoClick INTEGER NOT NULL, Mode INTEGER NOT NULL, UserID INTEGER NOT NULL)');
  db.run('CREATE TABLE Mode (MODEID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Type TEXT)');
  db.run('INSERT INTO Mode VALUES (?,?)', [null, 'DEFAULT']);
  db.run('INSERT INTO Mode VALUES (?,?)', [null, 'PROTANOPIA']);
  db.run('INSERT INTO Mode VALUES (?,?)', [null, 'DEUTERANOPIA']);
  db.run('INSERT INTO Mode VALUES (?,?)', [null, 'TRITANOMALY']);
});

app.use(cors(corsOptions));

app.get('/main', (req, res) => {
  console.log(req.session.views);
  if (req.session.token) {
    res.cookie('token', req.session.token);
    let user = 'temp';
    db.serialize(function() {
      let sql = 'SELECT * FROM Login JOIN Users on UserID';
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err);
        }
        rows.forEach((row) => {
          if (row.UserSessionID === req.session.token) {
            user = row.FirstName;
          }
        });
      });
    });
    res.json({ 
      status: 'user logged into system',
      user: `${user}`
    });
  } else if (hold !== null) {
    req.session.token = hold;
    res.cookie('token', hold);
    hold = null;
    db.serialize(function() {
      let sql = 'SELECT Users.FirstName, Login.UserSessionID FROM Login JOIN Users ON Users.UserID = Login.UserID';
      let user = '';
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err);
        }
        rows.forEach((row) => {
          if (row.UserSessionID === req.session.token) {
            user = row.FirstName;
          }
        });
        res.json({
          status: 'user logged into system',
          user: `${user}`
        });
      });
    });
  } else {
    res.cookie('token', `${users}`)
    req.session.token = `${users}`;
    db.serialize(function() {
      const user = db.prepare('INSERT INTO Users VALUES (?,?,?)', [null, '', '']);
      const login = db.prepare(`INSERT INTO Login VALUES (?,?)`, [req.session.token, users]);
      const allLogin = db.prepare(`INSERT INTO AllLogins VALUES (?,?,?,?,?)`, [null, users, req.session.token, '', Date.now()]);
      user.run();
      user.finalize();
      login.run();
      login.finalize();
      allLogin.run();
      allLogin.finalize();
      users++;
    });
    res.json({
      status: 'user not logged into system'
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
    db.serialize(function() {
      const user = db.prepare(`INSERT INTO Users VALUES (?,?,?)`, [null, req.user.profile.name.givenName, '']);
      const login = db.prepare(`INSERT INTO Login VALUES (?,?)`, [req.session.token, users]);
      const allLogin = db.prepare(`INSERT INTO AllLogins VALUES (?,?,?,?,?)`, [null, users, req.session.token, '', Date.now()]);
      user.run();
      user.finalize();
      login.run();
      login.finalize();
      allLogin.run();
      allLogin.finalize();
      users++;
      db.each('SELECT * FROM Users', function(err, user) {
        console.log(user.UserID + ': ' + user.FirstName);
      })
      db.each('SELECT * FROM Login', function(err, login) {
        console.log(login.UserID + ': ' + login.UserSessionID);
      })
    });
    hold = req.session.token;
    res.redirect('http://localhost:3000');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('http://localhost:3000');
});

app.post('/gameStats', (req, res) => {
  console.log('Overall info' + req);
  const Score = req.body.score,
    Correct = req.body.numRight,
    Incorrect = req.body.numWrong, 
    Mode = req.body.Mode;
  console.log('Score: ' + Score);
});

process.on('SIGINT', () => {
  db.close();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
