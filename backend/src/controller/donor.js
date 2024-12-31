import { Donor } from '../models/index.js';

// Get donor profile
const getDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    res.json(donor);
    console.log(donor);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
    
  }
};




// Update donor availability
const updateAvailability = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    donor.availability = req.body.availability;
    await donor.save();

    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View requests
const viewRequests = async (req, res) => {
  try {
    const requests = await Receiver.find({ bloodGroupNeeded: req.user.bloodGroup });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export  { getDonorProfile, updateAvailability, viewRequests };
