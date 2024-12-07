const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controllers');
const rateLimiter = require('../middleware/rate_limiter');

router.post('/login', rateLimiter, userController.loginUserController);
router.post('/register', rateLimiter, userController.registerUserController);
router.get('/users', userController.getAllUsersController);

module.exports = router;
