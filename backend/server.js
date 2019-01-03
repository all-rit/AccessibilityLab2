const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const passport = require('passport');
const bodyParser = require('body-parser');
const auth = require('./auth');
const key = require('./serverConstants');
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

auth(passport);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieSession({
  name: 'session',
  keys: [key.key],
  httpOnly: false
}));
app.use(cookieParser());
app.use(express.json());

let hold = null;
let users = 1;
let existing = false;

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
  db.run('CREATE TABLE LoginHistory (LoginID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, UserSssionID INTEGER NOT NULL, Location TEXT, Login NUMERIC NOT NULL)');
  db.run('CREATE TABLE Login (UserSessionID NOT NULL PRIMARY KEY, UserID INTEGER NOT NULL)');
  db.run('CREATE TABLE COLORS_GameStats (GameStatsID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Score INTEGER NOT NULL, CorrectOnClick INTEGER NOT NULL, IncorrectOnClick INTEGER NOT NULL, CorrectOnNoClick INTEGER NOT NULL, IncorrectOnNoClick INTEGER NOT NULL, Mode INTEGER NOT NULL, UserID INTEGER NOT NULL)');
  db.run('CREATE TABLE COLORS_UserData (DataID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ClassEnrolled TEXT, OtherUseCase TEXT, ColorVisionDeficiency TEXT, AgeRange TEXT)');
  db.run('CREATE TABLE Mode (MODEID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ModeName TEXT, IsActive BOOLEAN)');
  db.run('INSERT INTO Mode VALUES (?,?,?)', [null, 'DEFAULT', true]);
  db.run('INSERT INTO Mode VALUES (?,?,?)', [null, 'PROTANOPIA', true]);
  db.run('INSERT INTO Mode VALUES (?,?,?)', [null, 'DEUTERANOPIA', true]);
  db.run('INSERT INTO Mode VALUES (?,?,?)', [null, 'TRITANOMALY', true]);
});

app.use(cors(corsOptions));

app.get('/main', (req, res) => {
  console.log(req.session.views);
  if (req.session.token) {
    res.cookie('token', req.session.token);
    let user = 'temp';
    db.serialize(function() {
      let sql = 'select * from login join users on userid';
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
    if (existing) {
      res.json({
        status: 'existing user logged into system',
        user: `${user}`
      });
      existing = false;
    } else {
      res.json({
        status: 'new user logged into system',
        user: `${user}`
      })
    }
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
        if (existing) {
          res.json({
            status: 'existing user logged into system',
            user: `${user}`
          });
          existing = false;
        } else {
          res.json({
            status: 'new user logged into system',
            user: `${user}`
          })
        }
      });
    });
  } else {
    res.cookie('token', `${users}`)
    req.session.token = `${users}`;
    db.serialize(function() {
      const user = db.prepare('INSERT INTO Users VALUES (?,?,?)', [null, '', '']);
      const login = db.prepare(`INSERT INTO Login VALUES (?,?)`, [req.session.token, users]);
      const loginHistory = db.prepare(`INSERT INTO LoginHistory VALUES (?,?,?,?,?)`, [null, users, req.session.token, '', Date.now()]);
      user.run();
      user.finalize();
      login.run();
      login.finalize();
      loginHistory.run();
      loginHistory.finalize();
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

const recordUser = (user, existingUser, num) => {
  if (num === users) {
    if (existingUser !== null) {
      console.log('Found existing user');
      const loginHistory = db.prepare(`INSERT INTO LoginHistory VALUES (?,?,?,?,?)`, [null, existingUser.UserID, existingUser.UserSessionID, '', Date.now()]);
      loginHistory.run();
      loginHistory.finalize();
      existing = true;
    } else {
      console.log('Adding new user');
      const userInfo = db.prepare(`INSERT INTO Users VALUES (?,?,?)`, [null, user.name.givenName, '']);
      const login = db.prepare(`INSERT INTO Login VALUES (?,?)`, [user.id, users]);
      const loginHistory = db.prepare(`INSERT INTO LoginHistory VALUES (?,?,?,?,?)`, [null, users, user.id, '', Date.now()]);
      userInfo.run();
      userInfo.finalize();
      login.run();
      login.finalize();
      loginHistory.run();
      loginHistory.finalize();
      users++;
    }
  }
}

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req,res) => {
    req.session.token = req.user.profile.id;
    req.session.views = 1;
    let existingUser = null;
    let numberOfCalls = 1;
    db.serialize(function() {
      db.each('SELECT Users.FirstName, Users.UserID, Login.UserSessionID from Users INNER JOIN Login ON Login.UserID=Users.UserID', function(err, user) {
        if (req.user.profile.name.givenName === user.FirstName) {
          if (req.user.profile.id === user.UserSessionID) {
            existingUser = user;
          }
        }
        numberOfCalls += 1;
        recordUser(req.user.profile,  existingUser, numberOfCalls);
      });
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
  const Score = req.body.score,
    CorrectOnClick = req.body.numRightOnClick,
    IncorrectOnClick = req.body.numWrongOnClick,
    CorrectOnNoClick = req.body.numRightOnNoClick,
    IncorrectOnNoClick = req.body.numWrongOnNoClick,
    Mode = req.body.Mode[0];
  if(Score === undefined) {
    res.status(500);
    res.send('error with information provided');
  } else {
    let userID = 1;
    let sql = 'select * from login';
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err);
        }
        rows.forEach((row) => {
          if (req.session.token === undefined) {
            userID = 1;
            console.log(userID)
          }
          else if (row.UserSessionID === req.session.token) {
            userID = row.UserID
          }
        });
      });
    console.log(userID);
    const info = db.prepare(`INSERT INTO COLORS_GameStats VALUES (?,?,?,?,?,?,?,?)`, [null, Score, CorrectOnClick, IncorrectOnClick, CorrectOnNoClick, IncorrectOnNoClick, Mode, userID]);
    info.run();
    info.finalize()
    res.status(200);
    res.send('information recorded');
  }
});

app.post('/formAnswers', (req,res) => {
  const Nickname = req.body.nickname,
    Course = req.body.course,
    UseCase = req.body.useCase,
    Deficiency = req.body.deficiency,
    Age = req.body.age;
  console.log(req.session.token);
  console.log(Course);
  db.serialize(function() {
    db.each('SELECT Login.UserSessionID, Login.UserId FROM Login', function(err, login) {
      if (req.session.token === login.UserSessionID) {
        const update = db.prepare(`UPDATE Users SET NickName = ${Nickname} WHERE UserID = ${login.UserID}`);
        update.run();
        update.finalize();
      }
    })
    const addFormInfo = db.prepare('INSERT INTO COLORS_UserData VALUES (?,?,?,?,?)', [null, Course, UseCase, Deficiency, Age]);
    addFormInfo.run();
    addFormInfo.finalize();
  });
  res.status(200);
  res.send('form information recorded');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
