import { Router } from 'express';
import {
  getStudentDashboard,
  getSessionHistory,
  getDashboardStats,
} from '../controllers/dashboardController';

const router = Router();

// Get dashboard summary for a single student
router.get('/:studentId', getStudentDashboard);

// Get session history for a single student
router.get('/history/:studentId', getSessionHistory);

// Get dashboard statistics for a single student
router.get('/stats/:studentId', getDashboardStats);

export default router;
