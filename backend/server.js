const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const passport = require('passport');
const bodyParser = require('body-parser');
const queryString = require('query-string');
const auth = require('./auth');
const key = require('./serverConstants');
const googleLogin = require('./google-util');
const admins = require('./superUsers');
const port = process.env.PORT || 5000;
const cors = require('cors');
const expressSession = require('express-session');
const Pool = require('pg').Pool

auth(passport);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({
  secret: [key.key],
  resave: false,
  saveUninitialized: true,
}));
app.use(express.json());

let existing = false;
let recording = false;

const pool = new Pool({
  user: 'all_user',
  host: 'localhost',
  database: 'all_db',
  password: '',
  port: 5432,
})

let whitelist = ['http://localhost', 'http://all.rit.edu'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else if (origin === undefined) {
      callback(null, true)
    } else {
      console.log("Error url: " + origin);
      console.log("Comparison to all: " + ('http://all.rit.edu' === origin))
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

db.serialize(function() {
  db.run('CREATE TABLE Users (UserID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, FirstName TEXT , NickName TEXT, Admin BOOLEAN NOT NULL)');
  db.run('CREATE TABLE LoginHistory (LoginID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, UserID INTEGER NOT NULL, UserSssionID INTEGER NOT NULL, Location TEXT, Login NUMERIC NOT NULL)');
  db.run('CREATE TABLE Login (UserSessionID NOT NULL PRIMARY KEY, UserID INTEGER NOT NULL)');
  db.run('CREATE TABLE COLORS_GameStats (GameStatsID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Score INTEGER NOT NULL, CorrectOnClick INTEGER NOT NULL, IncorrectOnClick INTEGER NOT NULL, CorrectOnNoClick INTEGER NOT NULL, IncorrectOnNoClick INTEGER NOT NULL, Background TEXT NOT NULL, CorrectColor TEXT NOT NULL, WrongColorOne TEXT NOT NULL, WrongColorTwo TEXT NOT NULL, Mode INTEGER NOT NULL, UserID INTEGER NOT NULL)');
  db.run('CREATE TABLE COLORS_UserData (DataID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ClassEnrolled TEXT, OtherUseCase TEXT, ColorVisionDeficiency TEXT, AgeRange TEXT)');
  db.run('CREATE TABLE Mode (MODEID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ModeName TEXT, IsActive BOOLEAN)');
  db.run('INSERT INTO Mode VALUES (?,?,?)', [null, 'DEFAULT', true]);
  db.run('INSERT INTO Mode VALUES (?,?,?)', [null, 'PROTANOPIA', true]);
  db.run('INSERT INTO Mode VALUES (?,?,?)', [null, 'DEUTERANOPIA', true]);
  db.run('INSERT INTO Mode VALUES (?,?,?)', [null, 'TRITANOMALY', true]);
});

app.use(cors(corsOptions));

const sessionResponse = (stat, userName, admin, res) => {
  res.json({
    status: stat,
    user: userName,
    admin: admin
  })
}

app.get('/main', (req, res) => {
  console.log('session token: ' + req.session.token);
  if (req.session.token) {
    /*
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
    */
    let sql = `SELECT Session.UserSessionID, Session.UserID, Users.UserID, Users.FirstName, Users.Admin FROM session INNER JOIN Users ON Users.UserID = Session.UserID WHERE Session.UserSessionID=${req.session.token}`;
    pool.query(sql, [], (error, info) => {
      if (error) {
        console.log(error);
      }
      if (info.rowCount !== 0) {
        user = info.rows[0].firstname;
	console.log(user);
	if (user === null) {
	  sessionResponse('guest user', null, res);
	} else {
          pool.query(`SELECT * FROM Login WHERE Login.UserSessionID=${req.session.token}`, (error, logins) => {
            if (error) {
	      console.log(error);
	    }
      	    if (logins.rowCount > 1) {
	      sessionResponse('existing user logged into system', info.rows[0].firstname, info.rows[0].admin, res);
            } else {
	      sessionResponse('new user logged into system', info.rows[0].firstname, info.rows[0],admin, res);
            }
	  })
	}
      }
    });
  } else {
    /*
    db.serialize(function() {
      const user = db.prepare('INSERT INTO Users VALUES (?,?,?,?)', [null, '', '', false]);
      const login = db.prepare(`INSERT INTO Login VALUES (?,?)`, [req.session.token, users]);
      const loginHistory = db.prepare(`INSERT INTO LoginHistory VALUES (?,?,?,?,?)`, [null, users, req.session.token, '', Date.now()]);
      user.run();
      user.finalize();
      login.run();
      login.finalize();
      loginHistory.run();
      loginHistory.finalize();
    */
    let sqlOne = 'INSERT INTO Users (UserID, Admin) VALUES (default, $1)';
    pool.query(sqlOne, [false], (error, response) => {
      if (error) {
	console.log(error);
      }
    });
    var userID = 0;
    pool.query("SELECT NEXTVAL('users_userid_seq')", [], (error, response) => {
      if (error) {
        console.log(error);
      }
      userID = (response.rows[0].nextval) - 1;
      console.log('userID: ' + userID);
      let sqlTwo = 'INSERT INTO Session (UserSessionID, UserID) VALUES ($1, $2)';
      pool.query(sqlTwo, [userID, userID], (error, response) => {
        if (error) {
	  console.log(error);
        }
      });
      let sqlThree = 'INSERT INTO Login (LoginID, UserID, UserSessionID, Login) VALUES (DEFAULT, $1, $2, current_timestamp)';
      pool.query(sqlThree, [userID, userID], (error, response) => {
        if (error) {
	  console.log(error);
        }
      });
      pool.query(`SELECT setval('users_userid_seq', ${userID})`, [], (error, response) => {
      	if (error) {
	  console.log(error);
	}
      });
      req.session.token = userID;
      console.log('session token from new user set: ' + req.session.token);
      res.json({
        status: 'user not logged into system'
      });
   });
  }
});

app.get('/auth/google', (req, res) => {
    var signinLink = googleLogin.googleUrl();
    res.json({
      link: signinLink 
    })
  }
);

const recordUser = (user, existingUser, res, req) => {
    if (existingUser.rowCount !== undefined) {
      console.log(existingUser.rows[0]);
      let userID = existingUser.rows[0].userid;
      console.log('userID: ' + userID);
      let sessionID = existingUser.rows[0].usersessionid;
      console.log(sessionID);
      let sql = "INSERT INTO Login (LoginID, UserID, UserSessionID, Login) VALUES (DEFAULT, $1, $2, current_timestamp)"
      let values = [userID, sessionID];
      console.log('Found existing user');
      console.log('existing user: ' + existingUser);
      pool.query(sql, values, (error, res) => {
	if (error) {
	  console.log(error);
	}
      });
      existing = true;
      req.session.token = req.user.profile.id;
      req.session.save((err) => {if(err){console.log(err)}});
      res.redirect('http://all.rit.edu');
    } else {
      console.log('Adding new user');
      let admin = false;
      if (admins.scottID === user.id) {
        admin = true;
      }
      let sqlOne = "INSERT INTO Users (UserID, FirstName, Admin) VALUES (DEFAULT, $1, $2)";
      let valuesOne = [user.name.givenName, admin];
      pool.query(sqlOne, valuesOne, (error, res) => {
      	if (error) {
	  console.log(error);
	}
      });
      pool.query("SELECT NEXTVAL('users_userid_seq')", [], (error, res) => {
          if (error) {
            console.log(error);
          }
        let userID = (res.rows[0].nextval) - 1;
        let sqlTwo = "INSERT INTO Session (UserSessionID, UserID) VALUES ($1, $2)";
        let valuesTwo = [user.id, userID];
        pool.query(sqlTwo, valuesTwo, (error, res) => {
      	  if (error) {
	    console.log(error);
	  }
        });
        let sqlThree = "INSERT INTO Login (LoginID, UserID, UserSessionID, Login) VALUES (DEFAULT, $1, $2, current_timestamp)";
        let valuesThree = [userID, user.id];
        pool.query(sqlThree, valuesThree, (error, res) => {
      	  if (error) {
	    console.log(error);
	  }
        });
      	pool.query(`SELECT setval('users_userid_seq', ${userID})`, [], (error, response) => {
      	  if (error) {
	    console.log(error);
	  }
        });
      });
      req.session.token = req.user.profile.id;
      req.session.save((err) => {if(err){console.log(err)}});
      res.redirect('http://all.rit.edu');
    }
}

app.get('/auth/google/callback', 
    passport.authenticate('google', {
      failureRedirect: '/'
    }),
    (req, res) => {
    	pool.query(`SELECT Users.FirstName, Users.UserID, Login.UserSessionID from Users INNER JOIN Login ON Login.UserID=Users.UserID WHERE Login.UserSessionID=${req.user.profile.id}`, (error, results) => {
      	if (error) {
          console.log(error);
      	}
	console.log('length of results: ' + results.rowCount);
      	recordUser(req.user.profile, results, res, req);
    	})
    }
);

app.get('/logout', (req, res) => {
  req.logout();
  req.session.token = null;
  res.json({
    url: 'http://all.rit.edu'
  })
});

app.post('/gameStats', (req, res) => {
  console.log('session token in gameStats request: ' + req.session.token);
  recording = true;
  const Score = req.body.score,
    CorrectOnClick = req.body.numRightOnClick,
    IncorrectOnClick = req.body.numWrongOnClick,
    CorrectOnNoClick = req.body.numRightOnNoClick,
    IncorrectOnNoClick = req.body.numWrongOnNoClick,
    Background = req.body.background,
    CorrectColor = req.body.correctColor,
    IncorrectColorOne = req.body.incorrectColorOne,
    IncorrectColorTwo = req.body.incorrectColorTwo,
    Mode = req.body.Mode[0].toLowerCase();
  if(Score === undefined) {
    res.status(500);
    res.send('error with information provided');
  } else {
    let userID = 1;
    let sql = `SELECT Session.UserID FROM Session WHERE Session.UserSessionID=${req.session.token}`;
      /*
      db.all(sql, [], (err, rows) => {
        if (err) {
          console.log(err);
        }
        rows.forEach((row) => {
          if (req.session.token === undefined) {
            userID = 1;
          }
          else if (row.UserSessionID === req.session.token) {
            userID = row.UserID
          }
        });
      });
      */
      pool.query(sql, [], (error, users) => {
        if (error) {
	  console.log(error)
	}
	userID = users.rows[0].userid;
      });
      let sqlTwo = "SELECT COLORS_GameMode.ModeID, COLORS_GameMode.ModeName FROM COLORS_GameMode";
      pool.query(sqlTwo, [], (error, result) => {
        if (error) {
          console.log(error);
	}
        let modeID = 0;	
	result.rows.forEach((row) => {
	  if (row.modename === Mode) {
	    modeID = row.modeid;
    	  }
        });
      	pool.query('INSERT INTO COLORS_GameStats (GameStatsID,  Score, CorrectOnClick, IncorrectOnClick, CorrectOnNoClick, IncorrectOnNoClick, Background, CorrectCircle, IncorrectCircleOne, IncorrectCircleTwo, Mode, UserID) VALUES (DEFAULT, $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [Score, CorrectOnClick, IncorrectOnClick, CorrectOnNoClick, IncorrectOnNoClick, Background, CorrectColor, IncorrectColorOne, IncorrectColorTwo, modeID, userID], (error, results) => {
          if (error) {
            console.log(error);
	  }
      });
    });
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

const responseDataTotals = (res, totUsers, totLogin, completed) => {
  if (completed === 0) {
    res.json({
      totalUsers: totUsers,
      totalLogins: totLogin
    })
  }
}

app.get('/data_totals', (req,res) => {
  let TOT_USERS = 0;
  let TOT_LOGIN = 0;
  let completed = 2;
  /*
  db.all('SELECT * FROM USERS', [], (err, totalUsers) => {
    if (err) {
      console.log(err)
    }
    TOT_USERS = totalUsers.length;
    completed -= 1;
    responseDataTotals(res, TOT_USERS, TOT_LOGIN, completed);
  });
  db.all('SELECT * FROM LOGIN', [], (err, totalLogins) => {
    if (err) {
      console.log(err)
    }
    TOT_LOGIN = totalLogins.length;
    completed -= 1
    responseDataTotals(res, TOT_USERS, TOT_LOGIN, completed);
  });
  */
  pool.query('SELECT * FROM users', [], (err, totalUsers) => {
    if (err) {
      console.log(err);
    }
    TOT_USERS = totalUsers.rowCount;
    completed -= 1;
    responseDataTotals(res, TOT_USERS, TOT_LOGIN, completed);
    });
  pool.query('SELECT * FROM LOGIN', [], (err, totalLogins) => {
    if (err) {
      console.log(err)
    }
    TOT_LOGIN = totalLogins.rowCount;
    completed -= 1;
    responseDataTotals(res, TOT_USERS, TOT_LOGIN, completed);
  });
})

const responseDataScores = (res, totGames, scores, userScores, completed) => {
  if (completed === 0) {
    res.json({
      gamesPlayed: totGames,
      scores: scores,
      usrScores: userScores
    })
  }
}

app.get('/data_scores', (req, res) => {
  let TOT_GAMES = 0;
  let SCORES = null;
  let USR_SORT_SCORES = null;
  let completed = 2;
  /*
  db.all('SELECT * FROM COLORS_GameStats', [], (err, totalScores) => {
    if (err) {
      console.log(err)
    }
    TOT_GAMES = totalScores.length;
    SCORES = totalScores;
    completed -= 1;
    responseDataScores(res, TOT_GAMES, SCORES, USR_SORT_SCORES, completed)
  })
  db.all('SELECT * FROM COLORS_GameStats ORDER BY UserID ASC', [], (err, userData) => {
    if(err) {
      console.log(err)
    }
    completed -= 1;
    USR_SORT_SCORES = userData;
    responseDataScores(res, TOT_GAMES, SCORES, USR_SORT_SCORES, completed);
  })
  */
  pool.query('SELECT * FROM COLORS_GameStats', [], (err, totalScores) => {
    if (err) {
      console.log(err);
    }
    TOT_GAMES = totalScores.rowCount;
    SCORES = totalScores.rows;
    completed -= 1;
    responseDataScores(res, TOT_GAMES, SCORES, USR_SORT_SCORES, completed);
  });
  pool.query('SELECT * FROM COLORS_GameStats ORDER BY UserID ASC', [], (err, userData) => {
    if (err) {
      console.log(err);
    }
    completed -= 1;
    USR_SORT_SCORES = userData.rows;
    responseDataScores(res, TOT_GAMES, SCORES, USR_SORT_SCORES, completed);
  });
})

const responseUserGames = (res, games) => {
  res.json({
    gameHistory: games
  })
}

app.get('/previousGames', (req, res) => {
  let user = 1;
  if (req.session.token !== null) {
    user = req.session.token
  }
  /*
  db.all(`SELECT * FROM COLORS_GameStats`, [], (err, gameHistory) => {
    if (err) {
      console.log(err);
    }
    responseUserGames(res, gameHistory);
  })
  */
  pool.query(`SELECT Session.UserID FROM session WHERE session.UserSessionID=${req.session.token}`, (error, response) => {
    if (error) { 
      console.log(error);
    }
    let userID = response.rows[0].userid;
    console.log('userID from SELECT: ' + userID);
    pool.query(`SELECT COLORS_Gamestats.Score, COLORS_GameMode.ModeName FROM COLORS_GameStats INNER JOIN COLORS_GameMode ON COLORS_GameStats.Mode=COLORS_GameMode.ModeID WHERE COLORS_GameStats.UserID=${userID}`, (error, results) => {
      if (error) {
        console.log(error);
      }
      responseUserGames(res, results.rows)
    })
  });
})

app.get('/scoreComparison', (req, res) => {
  let user = 1;
  if (req.session.token !== null) {
    user = req.session.token
  }
  /*
  db.all('SELECT COLORS_GameStats.Score, COLORS_GameStats.Mode FROM COLORS_GameStats', [], (err, scoreData) => {
    if (err) {
      console.log(err);
    }
    res.json({
      scoreHistory: scoreData
    })
  })
  */
  pool.query('SELECT COLORS_GameStats.Score, COLORS_GameMode.ModeName FROM COLORS_GameStats INNER JOIN COLORS_GameMode ON COLORS_GameStats.Mode=COLORS_GameMode.ModeID', (error, results) => {
    if (error) {
      console.log(error);
    }
    res.json({
      scoreHistory: results.rows
    })
  })
})

app.get('/leaderboard', (req,res) => {
  /*
  db.all('SELECT COLORS_GameStats.Score, COLORS_GameStats.Mode FROM COLORS_GameStats ORDER BY COLORS_GameStats.score DESC', [], (err, scoreData) => {
    if (err) {
      console.log(err);
    }
    res.json({
      scores: scoreData
    })
  })
  */
  pool.query('SELECT COLORS_GameStats.Score, COLORS_GameMode.ModeName FROM COLORS_GameStats INNER JOIN COLORS_GameMode ON COLORS_GameStats.Mode=COLORS_GameMode.ModeID ORDER BY COLORS_GameStats.score DESC', [], (err, scoreData) => {
    if (err) {
      console.log(err);
    }
    res.json({
      scores: scoreData.rows
    })
  });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
