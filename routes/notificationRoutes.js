import express from 'express';
import { isLoggedIn } from '../middleware/isAdmin.js';
import { EventRequest } from '../models/Eventrequest.js';
import { Op } from 'sequelize';

const router = express.Router();

// Store active SSE connections
const activeConnections = new Map();

// ✅ Real-time notifications via Server-Sent Events
router.get('/live', isLoggedIn, (req, res) => {
  const userId = req.session.user.id;
  
  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  // Send initial connection message
  res.write('data: {"type": "connected", "message": "Connected to real-time notifications"}\n\n');

  // Store connection
  activeConnections.set(userId, res);

  // Keep connection alive
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 30000);

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(heartbeat);
    activeConnections.delete(userId);
  });

  res.on('error', () => {
    clearInterval(heartbeat);
    activeConnections.delete(userId);
  });
});

// ✅ Broadcast notification to specific user
export const sendNotificationToUser = (userId, notification) => {
  const connection = activeConnections.get(userId);
  if (connection) {
    connection.write(`data: ${JSON.stringify(notification)}\n\n`);
  }
};

// ✅ Broadcast to all users
export const broadcastNotification = (notification) => {
  activeConnections.forEach(connection => {
    connection.write(`data: ${JSON.stringify(notification)}\n\n`);
  });
};

// ✅ Get user notifications
router.get('/user', isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const limit = req.query.limit || 10;

    // Get recent events with status changes
    const events = await EventRequest.findAll({
      where: { user_id: userId },
      order: [['updatedAt', 'DESC']],
      limit: parseInt(limit),
      raw: true
    });

    const notifications = events.map(event => ({
      id: event.id,
      title: event.event_title,
      message: `Event "${event.event_title}" is now ${event.status}`,
      status: event.status,
      type: event.status === 'Approved' ? 'success' : event.status === 'Denied' ? 'error' : 'info',
      timestamp: event.updatedAt,
      read: false
    }));

    res.json({
      success: true,
      notifications,
      count: notifications.length
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
});

// ✅ Get all system notifications
router.get('/all', isLoggedIn, async (req, res) => {
  try {
    const events = await EventRequest.findAll({
      order: [['updatedAt', 'DESC']],
      limit: 20,
      raw: true
    });

    const notifications = events.map(event => ({
      id: event.id,
      title: event.event_title,
      message: `Event "${event.event_title}" (by ${event.organizer_name}) is now ${event.status}`,
      status: event.status,
      type: event.status === 'Approved' ? 'success' : event.status === 'Denied' ? 'error' : 'info',
      timestamp: event.updatedAt,
      organizer: event.organizer_name
    }));

    res.json({
      success: true,
      notifications,
      count: notifications.length
    });
  } catch (error) {
    console.error('Get all notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
});

export default router;
export { activeConnections };
