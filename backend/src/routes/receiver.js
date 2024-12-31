

import { Router } from 'express';
import { authorize , authenticate } from '../middleware/auth.js';
import { createRequest, searchDonors, trackRequestStatus } from '../controller/receiver.js';
const router = Router();


router.post('/receiver/request', authenticate, authorize('receiver'), createRequest);
router.get('/receiver/donors', authenticate, authorize('receiver'), searchDonors);
router.get('/receiver/status', authenticate, authorize('receiver'), trackRequestStatus);
// router.get('/receiver/status', trackRequestStatus);

export default router;