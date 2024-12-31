import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bloodGroup: { type: String, required: true },
    availability: { type: Boolean, default: true },
    location: { type: String, required: true },
  });
  
  const Donor = mongoose.model('Donor', donorSchema);
  export default Donor;