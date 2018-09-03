const Review = require('../models/review');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {reviews: reviews});
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router


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
