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
hbs.handlebars.registerHelper('missions_lenght', function(missions){
    //var national = senator_data.national-missions.length;
    //var international = senator_data.international-missions.length;
    return missions.length + "";
})

hbs.handlebars.registerHelper('awards_generate', function(resources_data){
    var awardList = ""
    var award1 = "<i class='the-target large circular inverted gem outline icon'></i><br>";
    var award2 = "<i class='the-target large circular inverted trophy icon'></i><br>";
    var award3 = "<i class='the-target large circular inverted paw icon'></i><br>";

    var divOpen = "<div class='column'><div class='ui basic center aligned segment with-popup' data-content='trophy explanation'>";

    var divClose = "</div></div>"

    for(var i = 0; i < 3; i++){
        awardList = awardList + divOpen + award1 + "bling bling bling" + divClose;
        awardList = awardList + divOpen + award2 + "grande champ" + divClose;
        awardList = awardList + divOpen + award3 + "pet lover s2" + divClose;
    }
    return awardList;
});

hbs.handlebars.registerHelper('cotas_resources', function(resources_data){
    var total = 0.0;
    for(var i = 0, j=resources_data.length; i < j; i++){
        if(resources_data[i].type == "ceap"){
            total = parseFloat(total) + parseFloat(resources_data[i].value);    
        }
        
    }

    var currency = (total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")).toString();
    currency = currency.replace(".", "#");
    currency = currency.replace(/,/g, ".");
    return currency.replace("#", ",");
})
hbs.handlebars.registerHelper('other_resources', function(resources_data){
    var total = 0.0;
    for(var i = 0, j=resources_data.length; i < j; i++){
        if(resources_data[i].type == "other"){
            total = parseFloat(total) + parseFloat(resources_data[i].value);    
        }
        
    }

    var currency = (total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")).toString();
    currency = currency.replace(".", "#");
    currency = currency.replace(/,/g, ".");
    return currency.replace("#", ",");
})

hbs.handlebars.registerHelper('hired_ppl', function(resources_data){
    //helper function to remove duplicates
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    var years = [];

    //grab all (with duplicate) mandate years
    for(var i = 0, j=resources_data.length; i < j; i++){
        years.push(resources_data[i].year);
    }

    //remove duplicates and sort
    var unique_year_list = years.filter(onlyUnique);
    unique_year_list.sort();


    //sum hired ppl by year
    var list = ""
    var total = 0;
    for(var i = 0, j = unique_year_list.length; i<j; i++){
        var yearTotal = 0;

        //for each resource
        for(var ii = 0, jj=resources_data.length; ii < jj; ii++){          
            var r = resources_data[ii];
            if(r.type == "people" && r.year == unique_year_list[i] && 
                r.description != "Gabinete" && r.description != "Escritório(s) de Apoio"){
                var v = resources_data[ii].value.replace("['", "");
                yearTotal = yearTotal + parseInt(v.replace("']", ""));
            }
        }

        total = total + yearTotal;

        list = list + "<b>" + unique_year_list[i] + "</b><br>" + total + " pessoas <br>";
    }

    var m = Math.round(total / unique_year_list.length);
    return "" + m;

    //return list;
})

hbs.handlebars.registerHelper('senator_salary', function(first_mandate_year){
    //2007-2011: 16500,00
    //2011-2014: 26723,13
    //2015-2018: 33763,00


    var cur_year = (new Date()).getFullYear();
    var total_salary = 0.0;
    var mandate = parseInt(first_mandate_year);
    
    while(mandate < cur_year) {
        if(mandate >= 2007 && mandate < 2011){
            total_salary = total_salary + 12 * 16500;
        }

        if(mandate >= 2011 && mandate < 2014){
            total_salary = total_salary + 12 * 26723,13;
        }

        if(mandate >= 2014 && mandate < 2018){
            total_salary = total_salary + 12 * 33763;
        }

        mandate = mandate + 1;

    }

    var currency = (total_salary.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")).toString();
    currency = currency.replace(".", "#");
    currency = currency.replace(/,/g, ".")
    return currency.replace("#", ",")

})

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
