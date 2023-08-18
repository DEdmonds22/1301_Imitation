const express = require('express');
const app = express();
const fruits = require('./Models/fruits');

// lines 6-7: to set up our view engine; must be done above the routes
app.set('view engine', "jsx");
app.engine('jsx', require('express-react-views').createEngine());

// Define Middleware; It runs in the middle of the request response cycle, sometimes after the request is recieved, but definently befire the final route handler is called. Be sure to put Middleware at the top of your server.js file, so that other routes dont handle the request and senfd the response before the middleware can be executed. Most of the time, you won't write your own middleware, but a lot of plugins and extended functionality of express exist as middleware.
app.use(express.urlencoded({extended:false}));

app.get('/fruits', (req, res) => {
    // ... instead of res.send(fruits);
    res.render("Index", {fruits: fruits});
});

// brings up the page/form to create a new fruit; this will allow us to create a new fruit
app.get("/fruits/new", (req, res) => {
    res.render('New');
});

app.get('/fruits/:index', (req, res) => {
    res.render('Show', {
        fruit: fruits[req.params.index]
    }); 
    // ... instead of res.send(fruits[req.params.index]);
    // 2nd param must  be an object
    // renders the HTML in Views ; Show.jsx
    // there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.index]
});

// since the form at /fruits/new tells the browser to create a POST request to /fruits, we'll need to set up a router handler for this kind of request - Here is where middleware comes in.
app.post('/fruits', (req, res) => {
    if (req.body.readyToEat === 'on') { // When Ready To Eat checkbox is clicked, the value of "on" is passed to the key "readyToEat", so this is checking if it has the value of "on"
        req.body.readyToEat = true;     // some data correction
    } else {
        req.body.readyToEat = false;    // some data correction
    }
    fruits.push(req.body);
    console.log(fruits)
    res.redirect('/fruits');
});

app.listen(3000, () => {
    console.log('listening');
});