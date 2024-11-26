const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controllers');
const rateLimiter = require('../middleware/rate_limiter');

router.get('/users', userController.getAllUsersController);
router.post('/register', rateLimiter, userController.registerUserController);

module.exports = router;
