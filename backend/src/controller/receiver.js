import { Receiver, Donor } from '../models/index.js';

// Submit a blood request
const createRequest = async (req, res) => {
  try {
    const receiver = new Receiver({
      userId: req.user.id,
      bloodGroupNeeded: req.body.bloodGroup,
      location: req.body.location,
    });

    await receiver.save();
    res.status(201).json(receiver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search for donors
const searchDonors = async (req, res) => {
  try {
    const donors = await Donor.find({
      bloodGroup: req.query.bloodGroup,
      location: req.query.location,
      availability: true,
    });

    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track request status
const trackRequestStatus = async (req, res) => {
  console.log('Request object:', req);
  // console.log('Request user:', req.user);
  // console.log('Request user ID:', req.user ? req.user.id : 'undefined');
  try {
    const requests = await Receiver.find({ userId: req.user.id });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createRequest, searchDonors, trackRequestStatus };
