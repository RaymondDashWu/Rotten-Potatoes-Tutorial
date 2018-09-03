//import reviews from 'reviews';
const reviews = require("./controllers/reviews");
const Review = require("./models/review")

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {reviews: reviews})
        })
        .catch(err => {
            console.log(err)
        })
    //res.render('home', {msg: 'Hello World!'});
});

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
});

app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id)
        .then(review => {
            res.render('reviews-show', { review: review })
        })
        .catch(err => {
            console.log(err);
        })
});

app.post('/reviews', (req, res) => {
    Review.create(req.body)
        .then((review) => {
            //console.log(review);
            res.redirect(`/reviews/${review._id}`);
        })
        .catch((err) => {
            console.log(err.message)
    })
});

app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
});

app.get('/reviews/:id/edit', function (req, res) {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
    })
});





app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
})

//let reviews = [
//  { title: "Great Review" },
//  { title: "Next Review" },
//  { title: "TERRIBLE REVIEW"}
//]
