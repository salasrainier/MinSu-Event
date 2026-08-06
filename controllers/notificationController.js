// Notification Controller for Event Management System
import User from '../models/userModel.js';
import { EventRequest } from '../models/Eventrequest.js';

// Get user notifications
export const getNotifications = async (req, res) => {
  try {
    const userId = req.session.user.user_id;
    
    // Fetch recent events with status changes
    const events = await EventRequest.findAll({
      where: { user_id: userId },
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    // Create notifications based on event status
    const notifications = events.map(event => ({
      id: event.id,
      title: event.event_title,
      message: `Event "${event.event_title}" is ${event.status}`,
      status: event.status,
      date: event.updatedAt,
      read: false
    }));

    res.json({
      success: true,
      notifications: notifications,
      count: notifications.length
    });
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.session.user.user_id;
    
    const totalEvents = await EventRequest.count({
      where: { user_id: userId }
    });

    const pendingEvents = await EventRequest.count({
      where: { user_id: userId, status: 'pending' }
    });

    const approvedEvents = await EventRequest.count({
      where: { user_id: userId, status: 'approved' }
    });

    const deniedEvents = await EventRequest.count({
      where: { user_id: userId, status: 'denied' }
    });

    res.json({
      success: true,
      stats: {
        total: totalEvents,
        pending: pendingEvents,
        approved: approvedEvents,
        denied: deniedEvents
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};

// Get admin statistics
export const getAdminStats = async (req, res) => {
  try {
    const totalEvents = await EventRequest.count();
    const pendingEvents = await EventRequest.count({ where: { status: 'pending' } });
    const approvedEvents = await EventRequest.count({ where: { status: 'approved' } });
    const deniedEvents = await EventRequest.count({ where: { status: 'denied' } });
    const totalUsers = await User.count();

    res.json({
      success: true,
      stats: {
        total: totalEvents,
        pending: pendingEvents,
        approved: approvedEvents,
        denied: deniedEvents,
        users: totalUsers
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin statistics'
    });
  }
};

// Export events to CSV
export const exportEventsToCsv = async (req, res) => {
  try {
    const userId = req.session.user.user_id;
    
    const events = await EventRequest.findAll({
      where: { user_id: userId },
      order: [['createdAt', 'DESC']]
    });

    // Create CSV header
    let csv = 'Event Title,Organizer,Department,Date,Venue,Status,Created\n';
    
    // Add data rows
    events.forEach(event => {
      const row = [
        `"${event.event_title}"`,
        `"${event.organizer_name}"`,
        `"${event.department}"`,
        event.event_date,
        `"${event.venue}"`,
        event.status,
        new Date(event.createdAt).toLocaleDateString()
      ].join(',');
      csv += row + '\n';
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="events-export.csv"');
    res.send(csv);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export events'
    });
  }
};

// Search and filter events
export const searchEvents = async (req, res) => {
  try {
    const userId = req.session.user.user_id;
    const { search, status, department, startDate, endDate } = req.query;
    
    let whereClause = { user_id: userId };
    
    // Add filters
    if (search) {
      whereClause = {
        ...whereClause,
        [require('sequelize').Op.or]: [
          { event_title: { [require('sequelize').Op.like]: `%${search}%` } },
          { purpose: { [require('sequelize').Op.like]: `%${search}%` } },
          { venue: { [require('sequelize').Op.like]: `%${search}%` } }
        ]
      };
    }
    
    if (status) {
      whereClause.status = status;
    }
    
    if (department) {
      whereClause.department = department;
    }
    
    if (startDate && endDate) {
      const { Op } = require('sequelize');
      whereClause.event_date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const events = await EventRequest.findAll({
      where: whereClause,
      order: [['event_date', 'ASC']]
    });

    res.json({
      success: true,
      events: events,
      count: events.length
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search events'
    });
  }
};
