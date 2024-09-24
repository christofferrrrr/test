import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  facilityname: String,
  facilitytype: { type: String, enum: ['badminton', 'tennis'] },
  isAvailable: Boolean
});

export default mongoose.model('Facility', facilitySchema);
