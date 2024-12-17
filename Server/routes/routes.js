const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controllers');
const destActController = require('../controllers/destAct_controllers');
const calendarController = require('../controllers/calendar_controllers');
const authToken = require('../middleware/auth_token');
const loggingMiddleware = require('../middleware/logging_mid');
const rateLimiter = require('../middleware/rate_limiter');

/* Authentication Routes */
router.post('/login', rateLimiter, userController.loginUserController);
router.post('/register', rateLimiter, userController.registerUserController);

/* User Profile Routes */
router.get('/home', rateLimiter, authToken, loggingMiddleware, userController.fetchUserProfile);
router.get('/pfp', rateLimiter, authToken, userController.fetchUserProfile);
router.put('/pfp', rateLimiter, authToken, userController.updateUserProfile);
router.post('/verify-password', rateLimiter, authToken, userController.verifyPassword);

/* Calendar and Trip Routes */
router.get('/calendar', rateLimiter, authToken, calendarController.getUpcomingTripsController);
router.get('/trip', rateLimiter, authToken, userController.fetchUserProfile);
router.get('/trip/:id', rateLimiter, authToken, destActController.getDestinationByIdController);
router.post('/trip', rateLimiter, authToken, destActController.create_destAct_Controller); 
router.put('/trip/:id', rateLimiter, authToken, destActController.updateDestinationController); 
router.delete('/trip/:id', rateLimiter, authToken, destActController.deleteDestinationActivityAndDestinationIdController);

/* Administrative Routes */
router.get('/users', userController.getAllUsersController);

module.exports = router;