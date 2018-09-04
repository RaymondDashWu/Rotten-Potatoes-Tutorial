//import reviews from 'reviews';

const reviews = require("./controllers/reviews");
const Review = require("./models/review");
const Comment = require('./models/comment')
const comments = require('./controllers/comments');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
comments(app, Comment);

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

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
});

app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id)
        .then(review => {
            Comment.find({reviewId: req.params.id})
                .then(comments => {
                    res.render('reviews-show', {review: review, comments: comments})
                })
        })
        .catch((err) => {
            console.log(err.message);
        })
});

app.delete('/reviews/comments/:id', function (req, res) {
    console.log("DELETE comment")
    Comment.findByIdAndRemove(req.params.id)
        .then((comment) => {
            res.redirect(`/reviews/${comment.reviewId}`)
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

//SERVER START
app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
})

//let reviews = [
//  { title: "Great Review" },
//  { title: "Next Review" },
//  { title: "TERRIBLE REVIEW"}
//]
