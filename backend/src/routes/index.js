import express from 'express';
import adminRoutes from './admin.js';
import donorRoutes from './donor.js';
import receiverRoutes from './receiver.js';
import authRoutes from './auth.js';

const router = express.Router();

router.use(adminRoutes);
router.use(donorRoutes);
router.use(receiverRoutes);
router.use('/auth', authRoutes);

export default router;








