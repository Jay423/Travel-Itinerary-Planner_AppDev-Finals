const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controllers');
const destActController = require('../controllers/destAct_controllers');
const authToken = require('../middleware/auth_token');
const loggingMiddleware = require('../middleware/logging_mid');
const rateLimiter = require('../middleware/rate_limiter');

router.post('/login', rateLimiter, userController.loginUserController);
router.post('/register', rateLimiter, userController.registerUserController);
router.get('/home', rateLimiter, authToken, loggingMiddleware, userController.fetchUserProfile);
router.get('/calendar', rateLimiter, authToken, userController.fetchUserProfile);
router.get('/trip', rateLimiter, authToken, userController.fetchUserProfile);
router.post('/trip', rateLimiter, authToken, destActController.create_destAct_Controller); 
router.get('/users', userController.getAllUsersController);

module.exports = router;