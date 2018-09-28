const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('112f018ba4f42d21d04582c7e7dcada0')
const Review = require('../models/review')

// app.get('/', (req, res) => {
//   req.render('movies-index');
//   })

function movies (app) {
  app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies()
      .then(response => {
        res.render('movies-index', { movies: response.results });
    })
      .catch(console.error);
    })
  app.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({ id: req.params.id }).then(movie => {
      Review.find({ movieId: req.params.id }).then(reviews => {
        console.log(movie)
        res.render('movies-show', { movie: movie, reviews: reviews });
        // console.log(movie)
      })
    }).catch(console.error)
  })
  // app.get('/movies/:id', (req, res) => {
  //   moviedb.movieInfo({id: req.params.id})
  //     .then(movie => {
  //       if (movie.video) {
  //         moviedb.movieVideos({id: req.params.id})
  //           .then(videos => {
  //             movie.trailer_youtube_id = videos.results[0].key
  //             renderTemplate(movie)
  //           })
  //       } else {
  //         renderTemplate(movie)
  //       }

  //       function renderTemplate(movie) {
  //         res.render('movies-show', {movie: movie})
  //       }
      
  //     }).catch(console.error)
  // })
}

module.exports = movies