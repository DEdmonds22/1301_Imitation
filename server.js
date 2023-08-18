const express = require('express');
const app = express();
const fruits = require('./Models/fruits');

// lines 6-7: to set up our view engine; must be done above the routes
app.set('view engine', "jsx");
app.engine('jsx', require('express-react-views').createEngine());

app.get('/fruits', (req, res) => {
    res.render("Index", {fruits: fruits});
});
    // ... instead of res.send(fruits);

app.get('/fruits/:index', (req, res) => {
    res.render('Show', {
        fruit: fruits[req.params.index]
    }); 
});
    // ... instead of res.send(fruits[req.params.index]);
    // 2nd param must  be an object
    // renders the HTML in Views ; Show.jsx
    // there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.index]

app.listen(3000, () => {
    console.log('listening');
});