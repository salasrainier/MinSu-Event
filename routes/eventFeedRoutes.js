import express from 'express';
import { isLoggedIn } from '../middleware/isAdmin.js';
import {
  eventFeed,
  addReaction,
  addComment,
  getComments,
  joinEvent,
  leaveEvent,
  reopenEvent,
  closeEvent,
} from '../controllers/eventFeedController.js';

const router = express.Router();

// Event Feed
router.get('/feed', isLoggedIn, eventFeed);

// Reactions
router.post('/events/reaction', isLoggedIn, addReaction);

// Comments
router.post('/events/comment', isLoggedIn, addComment);
router.get('/events/:eventId/comments', isLoggedIn, getComments);

// Join/Leave Events
router.post('/events/:eventId/join', isLoggedIn, joinEvent);
router.post('/events/:eventId/leave', isLoggedIn, leaveEvent);

// Reopen/Close Events (Organizer only)
router.post('/events/:eventId/reopen', isLoggedIn, reopenEvent);
router.post('/events/:eventId/close', isLoggedIn, closeEvent);

// My Events (Organizer view)
import { myEvents } from '../controllers/organizerEventsController.js';
router.get('/my-events', isLoggedIn, myEvents);

export default router;
