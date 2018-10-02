const Commment = require('../models/comment')

module.exports = function (app, Comment) {
//     app.post('/movies/:movieId/reviews/:id/comments', (req, res) => {
//         console.log(req.body)
//         Comment.create(req.body)
//             .then(comment => {
//                 console.log(comment)
//                 res.redirect(`/movies/:movieId/reviews/${comment.reviewId}`)
//             })
//             .catch((err) => {
//                 console.log(err.message)
//             })
//         //res.send('reviews comment')
//   })

// app.post('/reviews/comments', (req, res) => {
//     Comment.create(req.body).then(comment => {
//       res.status(200).send({ comment: comment });
//     }).catch((err) => {
//       res.status(400).send({ err: err })
//     })
//   })

    app.post('/movies/:movieId/reviews/:id/comments', (req, res) => {
        console.log(req.body)
        Comment.create(req.body)
            .then(comment => {
                res.status(200).send({comment:comment});
            })
            .catch((err) => {
                res.status(400).send({err:err})
            })
    })

    app.delete('/comments/:id', (req, res) => {
        console.log(req.params.id)
        Comment.findByIdAndRemove(req.params.id)
            .then(comment => {
                console.log(comment)
                res.redirect(`/movies/:movieId/reviews/${comment.reviewId}`)
            })
            .catch((err) => {
                console.log(err.message)
            })
    })

    app.delete('/reviews/comments/:id', function (req, res) {
        console.log("DELETE comment")
        console.log(req.params.id)
        Comment.findOneAndDelete({ _id: req.params.id })
            .then(comment => {
                res.status(200).send(comment);
            })
            .catch((err) => {
                console.log(err.message);
                res.status(400).send(err)
            })
    })
}


/*
    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
        res.redirect(`/reviews/${comment.reviewId}`)
    }).catch((err) => {
        console.log(err.message)
    })
    });

*/
