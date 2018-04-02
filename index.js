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

// Create `ExpressHandlebars` instance with main layout.
var hbs = exphbs.create({
    defaultLayout: 'main',
    //helpers      : 'helpers/',
    partialsDir: 'views/partials/',
});

//define partials
var ps = require('./views/partials/partials.json')
ps.data.forEach(function(el, index) {
    // el - current element, i - index
    console.log(el.partial)
    var psPath = "./views/partials/" + el.partial + ".handlebars"
    hbs.handlebars.registerPartial(el.partial, psPath)
});

//define helpers
const ourHelpers = require('./helpers/helpers.js');
hbs.handlebars.registerHelper('missions_lenght', ourHelpers.missions_lenght);
hbs.handlebars.registerHelper('awards_generate', ourHelpers.awards_generate);
hbs.handlebars.registerHelper('cotas_resources', ourHelpers.cotas_resources);
hbs.handlebars.registerHelper('other_resources', ourHelpers.other_resources);
hbs.handlebars.registerHelper('hired_ppl', ourHelpers.hired_ppl);
hbs.handlebars.registerHelper('senator_salary', ourHelpers.senator_salary);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'semantic')));

app.get('/', (req, res) => {
    res.render('senator', {
        senatorList: require('./senators-list.json'),
        senator: require('./391_bio.json'),
        commissions: require('./391_comm.json'),
        resources: require('./391_resources.json'),
        projects: require('./391_proj.json')
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
