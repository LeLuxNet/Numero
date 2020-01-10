var express = require('express');
var locale = require("locale");

var app = express();

var naming = require("./views/naming.json");

app.set('view engine', 'pug');
app.use(locale(["en", "de"], "en"));

app.use('/', express.static('static'));

app.get('/', function(req, res) {
  var params = naming;
  params.locale = req.locale;
  res.render('index', params);
});

app.get('/lang.js', function(req, res) {
  res.send("const lang = " + JSON.stringify(naming.words[req.locale]) + ";");
});

app.listen(80, function() {
  console.log('Website listening on port 80!');
});
