const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const csrf = require('csurf');

const LocalStrategy = require('passport-local');

//init app
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.json());
app.use(session({secret: "mySecretStaysWithTheTeam123"}));
app.use(passport.session());

//generate sample password
const salt = bcrypt.genSaltSync();
const localPassword = bcrypt.hashSync('websec', salt);
console.log({localPassword, salt});

passport.use(new LocalStrategy(
    function(username, password, done) {
        const result = bcrypt.compareSync(password, localPassword);
        if (!result) { return done('password is incorrect', false); }
        return done(null, {username});
    }
  ));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
  });

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    next();
    return;
  }
  res.status(401).json({status: "unauthorized"});
}

app.use(csrf({}));

app.get('/', function (req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
    console.log({user: req.user, isAuth: req.isAuthenticated()});
    const views = req.session.views || 0;
    req.session.views = views + 1;
    res.render('main.ejs', {views: views, currentUser: req.user?.username, qparam: req.query.param});
});

app.get('/attempt-logout', isAuthenticated, function (req, res) {
  res.render('attempt-logout.ejs');
});

app.post('/auth', passport.authenticate('local'), (req, res) => {
    console.log({body:req.body});
    res.json({status:"authenticated"});
});

app.get('/info', isAuthenticated, (req, res) => {
  res.json({user: req.user});
})

app.post('/logout', (req, res) => {
    req.logout();
    res.send("logged out");
})
  
app.listen(3000);