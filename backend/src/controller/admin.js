import { User, Donor, Receiver } from '../models/index.js';

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve or reject donor applications
const updateDonorStatus = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    donor.approvalStatus = req.body.status;
    await donor.save();

    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View analytics
const viewAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await Donor.countDocuments();
    const totalReceivers = await Receiver.countDocuments();

    res.json({ totalUsers, totalDonors, totalReceivers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, updateDonorStatus, viewAnalytics };
 