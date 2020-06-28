const router = require('express').Router();

const MovieController = require('../controllers/MovieController')


router.get('/allMovies', MovieController.getAllMovies);
router.get('/title/:title', MovieController.searchtitle);
router.get('/id/:id', MovieController.searchid);
router.get('/mostpopular', MovieController.mostPopular);
router.get('/lastmovies', MovieController.lastMovies);

module.exports = router