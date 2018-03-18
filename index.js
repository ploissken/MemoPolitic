const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');


// Express
const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
    const states = ["desligado", "conectado", "conectando", "desconectando"];
    res.send("Esse Mongo diz que tem");
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