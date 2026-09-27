import mongoose from 'mongoose';
import Guest from '../models/Guest.js';

// Fallback in-memory guest list if DB is offline
const memoryGuests = [
  {
    _id: 'mem_1',
    name: 'Kasun Perera',
    phone: '0771234567',
    attending: true,
    note: 'Looking forward to celebrating with you both!',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: 'mem_2',
    name: 'Dilini Fernando',
    phone: '0719876543',
    attending: true,
    note: 'Warmest congratulations!',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'mem_3',
    name: 'Sahan Jayawardena',
    phone: '0754443322',
    attending: false,
    note: 'Sending best wishes from abroad.',
    createdAt: new Date().toISOString(),
  }
];

// Sanitizes user string input: strips HTML tags, trims, and truncates to maxLength
const sanitizeInput = (str, maxLength = 200) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // Strip HTML characters to prevent stored XSS
    .trim()
    .slice(0, maxLength);
};

// @desc    Create new RSVP entry
// @route   POST /api/rsvp
// @access  Public
export const createRSVP = async (req, res) => {
  try {
    const { name, phone, attending, note } = req.body;

    const cleanName = sanitizeInput(name, 80);
    const cleanPhone = sanitizeInput(phone, 25);
    const cleanNote = sanitizeInput(note, 500);

    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid full name (at least 2 characters).'
      });
    }

    if (!cleanPhone || cleanPhone.length < 7 || !/^[\d\s+\-()]{7,25}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number (digits, spaces, or +).'
      });
    }

    if (typeof attending !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Please specify whether you will attend (true or false).'
      });
    }

    let savedGuest;

    // Check if Mongoose is connected
    if (mongoose.connection.readyState === 1) {
      savedGuest = await Guest.create({
        name: cleanName,
        phone: cleanPhone,
        attending,
        note: cleanNote
      });
    } else {
      // In-memory fallback
      savedGuest = {
        _id: 'mem_' + Date.now(),
        name: cleanName,
        phone: cleanPhone,
        attending,
        note: cleanNote,
        createdAt: new Date().toISOString()
      };
      memoryGuests.unshift(savedGuest);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for your response ❤️',
      data: savedGuest
    });
  } catch (error) {
    console.error('Error creating RSVP:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while submitting RSVP. Please try again.'
    });
  }
};

// @desc    Verify Admin Passcode
// @route   POST /api/rsvp/admin-login
// @access  Public
export const verifyAdmin = async (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    return res.json({ success: true, message: 'Authentication successful' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid Admin Password' });
  }
};

// @desc    Get all RSVP entries
// @route   GET /api/rsvp
// @access  Protected (Admin Password)
export const getRSVPs = async (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    const expectedKey = process.env.ADMIN_PASSWORD || 'admin123';

    if (!adminKey || adminKey !== expectedKey) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Valid Admin Key required.'
      });
    }

    let guests = [];

    if (mongoose.connection.readyState === 1) {
      guests = await Guest.find().sort({ createdAt: -1 });
    } else {
      guests = memoryGuests;
    }

    const total = guests.length;
    const attending = guests.filter(g => g.attending === true).length;
    const notAttending = guests.filter(g => g.attending === false).length;

    return res.status(200).json({
      success: true,
      summary: {
        total,
        attending,
        notAttending
      },
      data: guests
    });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching RSVP entries.'
    });
  }
};
