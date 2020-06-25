const router = require('express').Router();

const MovieController = require('../controllers/MovieController')


router.get('/allMovies', MovieController.getAllMovies)
router.get('/title/:title', MovieController.searchtitle)
router.get('/id/:id', MovieController.searchid)

module.exports = router