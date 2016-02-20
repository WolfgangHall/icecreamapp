//express setup
var express = require('express');
var app = express();
var port = 3000;

//database setup
var Sequelize = require('sequelize');
var connection = new Sequelize('icecream_db', 'root');

var Chocolate = connection.define('chocolate', {
    flavor: Sequelize.STRING,
    satisfactionlevel: Sequelize.INTEGER
});



//handlebars setup
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//routes
app.get('/', function(req, res) {
    Chocolate.findAll({}).then(function(chocolate){
        res.render('index', {chocolate});
    })
});

// database connection via sequelize
connection.sync().then(function() {
  app.listen(port, function() {
      console.log("Listening on:" + port)
  });
});