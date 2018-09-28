const Review = require('../models/review');
const express = require('express');
const Comment = require('../models/comment')

function reviews (app) {
    console.log("reviews loaded")
    app.get('/', (req, res) => {
        Review.find()
            .then(reviews => {
                res.render('reviews-index', {reviews: reviews});
            })
            .catch(err => {
                console.log(err);
            });
    });
    // app.get('/movies/:id/reviews/new', (req, res) => {
    //     res.render('reviews-new', {});
    // });
    
    app.delete('/movies/:movieId/reviews/:id', function (req, res) {
        Review.findByIdAndRemove(req.params.id)
            .then((review) => {
                res.redirect(`/movies/${req.params.movieId}`)
            })
            .catch((err) => {
                console.log(err.message)
            })
    })
    
    app.delete('/movies/:movieId/reviews/comments/:id', function (req, res) {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id)
            .then((comment) => {
                res.redirect(`/movies/${req.params.movieId}`)
            })
            .catch((err) => {
                console.log(err.message)
            })
    });
    
    app.put('/movies/:movieId/reviews/:id', (req, res) => {
        console.log("EDIT PUT WHATEVER")
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/movies/${req.params.movieId}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    });
    
    app.get('/movies/:movieId/reviews/:id/edit', function (req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {review: review});
        })
    });

    app.get('/movies/:movieId/reviews/new', (req, res) => {
        res.render('reviews-new', {movieId: req.params.movieId})
    })
    
    // app.post('/movies/:movieId/reviews', (req, res) => {
    //     console.log(req.body)
    // })

    app.post('/movies/:movieId/reviews', (req, res) => {
        Review.create(req.body)
            .then((review) => {
                // console.log(review);
                res.redirect(`/movies/${req.params.movieId}`);
            })
            .catch((err) => {
                console.log(err.message);
        })
    });

    app.get('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findById(req.params.id)
            .then(review => {
                Comment.find({reviewId: req.params.id})
                    .then(comments => {
                        res.render('reviews-show', {review: review, comments: comments.reverse()})
                    })
            })
            .catch((err) => {
                console.log(err.message);
            })
    });
    

    // app.post('/reviews', (req, res) => {
    //     Review.create(req.body).then(review => {
    //         res.redirect(`/movies/${review.movieId}`)
    //     })
    // })

}

module.exports = reviews


/* Does not work. NodeJS doesn't support stable ES6 as of writing
export default
function (app) {
    app.get('/', (req, res) => {
        Review.find()
            .then(reviews => {
                res.render('reviews-index', {reviews: reviews});
            })
            .catch(err => {
                console.log(err);
            });
    });
}
*/
