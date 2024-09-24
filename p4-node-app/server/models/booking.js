import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  facilityid: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility' },
  date: Date,
  starttime: String,
  endtime: String,
  iscancelled: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);
