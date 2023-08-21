require('dotenv').config();
const express = require('express');
const app = express();
const fruits = require('./Models/fruits');
const mongoose = require('mongoose');
const Fruit = require('./Models/Fruit');

// lines 6-7: to set up our view engine; must be done above the routes
app.set('view engine', "jsx");
app.engine('jsx', require('express-react-views').createEngine());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// says once the connection is opened => do this function. Helps w/ debugging
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
// Define Middleware; It runs in the middle of the request response cycle, sometimes after the request is recieved, but definently befire the final route handler is called. Be sure to put Middleware at the top of your server.js file, so that other routes dont handle the request and senfd the response before the middleware can be executed. Most of the time, you won't write your own middleware, but a lot of plugins and extended functionality of express exist as middleware.
// allows us to parse our json and not just return a string.
app.use(express.urlencoded({extended:false}));

// INDUCES

// Index
app.get('/fruits', (req, res) => {
    //when using .then is opens up the possibility of using .catch
        Fruit.find({}).then((allFruits) => {
            res.render("Index",  { fruits: allFruits });
        })
        .catch(error => {
            console.error(error);
        })
});

// New
// brings up the page/form to create a new fruit; this will allow us to create a new fruit
app.get("/fruits/new", (req, res) => {
    res.render('New');
});

// Delete

// Update

// Create
// since the form at /fruits/new tells the browser to create a POST request to /fruits, we'll need to set up a router handler for this kind of request - Here is where middleware comes in.
app.post('/fruits', (req, res) => {
    if (req.body.readyToEat === 'on') { // When Ready To Eat checkbox is clicked, the value of "on" is passed to the key "readyToEat", so this is checking if it has the value of "on"
        req.body.readyToEat = true;     // some data correction
    } else {
        req.body.readyToEat = false;    // some data correction
    }
    Fruit.create(req.body).then(req.body)
    .then((createdFruit) => {
        res.send(createdFruit)
    })
    .catch(error => {
        console.log(error)
    })
});

// Edit

// Show
app.get('/fruits/:index', (req, res) => {
    Fruit.findOne({index: req.params.id})
    .then((foundFruit) => {
        res.render('Show', {
            fruit: foundFruit
    })
})
.catch(error => {
    console.error(error);
})
});

app.listen(3000, () => {
    console.log('listening');
});