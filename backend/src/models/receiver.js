import mongoose from "mongoose";

const receiverSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bloodGroupNeeded: { type: String, required: true },
    location: { type: String, required: true },
    requestStatus: { type: String, enum: ['pending', 'approved', 'fulfilled'], default: 'pending' },
  });
  
  const Receiver = mongoose.model('Receiver', receiverSchema);
  export default Receiver;