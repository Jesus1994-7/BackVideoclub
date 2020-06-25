const router = require('express').Router();

const UserController = require('../controllers/UserController');

const  {auth,isAdmin} = require('../middleware/auth')

router.get('/giveUsers', UserController.getAllUsers)
router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.delete('/delete/:id', UserController.delete)

module.exports = router;