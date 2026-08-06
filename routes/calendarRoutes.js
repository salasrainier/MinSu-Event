import express from 'express';
import { isLoggedIn } from '../middleware/isAdmin.js';
import {
  organizerCalendar,
  checkConflicts,
  getCalendarData,
  lockSlot,
  getLockedSlot,
} from '../controllers/calendarController.js';

const router = express.Router();

// API endpoints for calendar
router.post('/calendar/check-conflicts', isLoggedIn, checkConflicts);
router.get('/calendar/data', isLoggedIn, getCalendarData);
router.post('/calendar/lock-slot', isLoggedIn, lockSlot);
router.get('/calendar/locked-slot', isLoggedIn, getLockedSlot);

export default router;
