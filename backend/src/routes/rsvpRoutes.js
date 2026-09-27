import express from 'express';
import { createRSVP, getRSVPs, verifyAdmin } from '../controllers/rsvpController.js';
import { rsvpLimiter, adminLoginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.route('/')
  .post(rsvpLimiter, createRSVP)
  .get(getRSVPs);

router.post('/admin-login', adminLoginLimiter, verifyAdmin);

export default router;
