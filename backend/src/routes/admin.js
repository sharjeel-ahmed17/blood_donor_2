import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getAllUsers, updateDonorStatus, viewAnalytics } from '../controller/admin.js';
const router = Router();

router.get('/admin/users', authenticate, authorize('admin'), getAllUsers);
router.patch('/admin/donor/:id', authenticate, authorize('admin'), updateDonorStatus);
router.get('/admin/analytics', authenticate, authorize('admin'), viewAnalytics);




export default router;