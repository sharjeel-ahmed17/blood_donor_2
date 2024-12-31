import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getDonorProfile, updateAvailability, viewRequests } from '../controller/donor.js';
const router = Router();



router.get('/donor/profile', authenticate, authorize('donor'), getDonorProfile);
router.patch('/donor/availability', authenticate, authorize('donor'), updateAvailability);
router.get('/donor/requests', authenticate, authorize('donor'), viewRequests);

export default router;