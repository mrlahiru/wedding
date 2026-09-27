import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true,
      minlength: [7, 'Please enter a valid phone number'],
    },
    attending: {
      type: Boolean,
      required: [true, 'Please specify if you will attend'],
    },
    note: {
      type: String,
      trim: true,
      default: '',
    }
  },
  {
    timestamps: true,
  }
);

const Guest = mongoose.model('Guest', guestSchema);

export default Guest;
