const express = require('express'),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    pagination = require('./config/database'),
    app = express();

mongoose.connect(pagination.database)
    .then(() => console.log("success access database"))
    .catch((err) => console.log(err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render('index');
});
app.use('/', require('./routes/product'));

app.listen(8000, () => console.log("run in port 8000"));
