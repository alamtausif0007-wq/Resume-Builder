const rateLimit=require('express-rate-limit')

//tells express to trust the first proxy
// app.set('trust proxy',1) -> Moved to server.js
//rate limiting middleware
const ApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    message: "You've reached the limit for AI enhancements. Please try again in 15 minutes."
  }
});

module.exports=ApiLimiter