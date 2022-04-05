const express = require('express');
var session = require('express-session');
const app = express()

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(session({secret: "mySecretStaysWithTheTeam123"}))

app.get('/', function (req, res) {
    if(req.query.current) {
        req.session.current = req.query.current;
    }
    const currentUser = req.session.current || 'unknown';
    const views = req.session.views || 0;
    req.session.views = views + 1;
    res.render('main.ejs', {views: views, currentUser: currentUser});
});
  
app.listen(3000);