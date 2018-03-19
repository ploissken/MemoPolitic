const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const path = require("path");

// Express
const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'semantic')));


app.get('/', (req, res) => {
     res.render('senator-list', {
        list: require('./senators-list.json')
    });
});

app.get('/aecio', (req, res) => {
    res.render('senator', {
        senator: require('./391_bio.json'),
        commissions: require('./391_comm.json')
    });
});



// Catches unhandled errors during request handling.
app.use(function(error, req, res, next) {
    console.log("500 Request Failed.", error);
    res.status(500);
});

app.listen(3000, () => {
    console.log('Service is listening on port 3000.');
});

// Export server for testing
module.exports = app;
