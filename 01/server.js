const express = require('express');
const app = express()

app.set('view engine', 'ejs');
app.use(express.static('static'));

// hello zura -> ifmmpa vsb!
const ls = 'abcdefghijklmnopqrstuvwxyz ';
function cipher(text) {
    const res = [];
    for (i=0; i< text.length; i++) {
        res.push(ls[(ls.indexOf(text[i])+1) % (ls.length)]);
    }
    return res.join("") + "!";
}

function decipher(text) {
    const res = [];
    text = text.replace("!", "");
    for (i=0; i< text.length; i++) {
        let index = (ls.indexOf(text[i])-1) % (ls.length);
        if(index < 0) {
            index = ls.length - 1;
        }
        res.push(ls[index]);
    }
    return res.join("")
    return text;
}

app.get('/', function (req, res) {
    let text = cipher(req.query.text);
    res.render('main.ejs', {name: text});
});

app.get('/dec', function (req, res) {
    let text = decipher(req.query.text);
    res.render('main.ejs', {name: text});
});
  
app.listen(3000);