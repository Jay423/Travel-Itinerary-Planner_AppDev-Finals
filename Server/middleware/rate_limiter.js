const rateLimit = require('express-rate-limit');

const rateLimiterMiddleware = rateLimit({
    windowMs: 1 * 10 * 1000, 
    max: 10, 
    message: {
        error: 'Too many requests. Please try again later',
    },
    headers: true,
});

module.exports = rateLimiterMiddleware;
