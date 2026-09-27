import rateLimit from 'express-rate-limit';

// Global API Rate Limiter: 150 requests per 15 minutes per IP
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again in a few minutes.'
  }
});

// Strict Rate Limiter for RSVP Submissions: max 10 submissions per 15 minutes per IP
export const rsvpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'You have submitted multiple RSVPs recently. Please wait a few minutes before trying again.'
  }
});

// Strict Brute-Force Protection for Admin Login: max 5 attempts per 15 minutes per IP
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many incorrect login attempts. Access is locked for 15 minutes for security.'
  }
});
