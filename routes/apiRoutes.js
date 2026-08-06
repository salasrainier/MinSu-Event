import express from 'express';
import { isLoggedIn } from '../middleware/isAdmin.js';
import { EventRequest } from '../models/Eventrequest.js';
import { Participation } from '../models/Participation.js';
import { Reaction } from '../models/Reaction.js';
import { Comment } from '../models/Comment.js';
import { User } from '../models/userModel.js';
import { Op } from 'sequelize';

const router = express.Router();

// ✅ Get approved events for participants to browse
router.get('/browse-events', isLoggedIn, async (req, res) => {
  try {
    const { search, department } = req.query;
    
    let whereClause = { status: 'Approved' };
    
    if (search) {
      whereClause[Op.or] = [
        { event_title: { [Op.like]: `%${search}%` } },
        { purpose: { [Op.like]: `%${search}%` } },
        { venue: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (department) whereClause.department = department;
    
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
    console.error('Browse events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
});

// Get participant's joined events
router.get('/my-events', isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const participations = await Participation.findAll({
      where: { user_id: userId },
      include: [{
        model: EventRequest,
        attributes: ['id', 'event_title', 'event_date', 'event_end_date', 'venue', 'organizer_name', 'department', 'status', 'purpose', 'proposal_file']
      }],
      order: [['created_at', 'DESC']]
    });
    const events = participations.map(p => ({
      ...p.EventRequest.dataValues,
      participation_status: p.status,
      joined_at: p.created_at
    }));
    res.json({ success: true, events, count: events.length });
  } catch (error) {
    console.error('Get my events error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch your events' });
  }
});

// Get user's events as JSON (for calendar and filters)
router.get('/events', isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const events = await EventRequest.findAll({
      where: { user_id: userId },
      order: [['event_date', 'ASC']]
    });

    res.json({
      success: true,
      events: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
});

// Search and filter events
router.get('/search', isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { search, status, department, startDate, endDate } = req.query;
    
    let whereClause = { user_id: userId };
    
    if (search) {
      whereClause[Op.or] = [
        { event_title: { [Op.like]: `%${search}%` } },
        { purpose: { [Op.like]: `%${search}%` } },
        { venue: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (status) whereClause.status = status;
    if (department) whereClause.department = department;
    
    if (startDate && endDate) {
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
});

// Export events to CSV
router.get('/export-csv', isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.user.id;
    
    const events = await EventRequest.findAll({
      where: { user_id: userId },
      order: [['createdAt', 'DESC']]
    });

    // Create CSV header
    let csv = 'Event Title,Organizer,Department,Date,Venue,Status,Purpose,Created Date\n';
    
    // Add data rows
    events.forEach(event => {
      const row = [
        `"${event.event_title}"`,
        `"${event.organizer_name}"`,
        `"${event.department}"`,
        new Date(event.event_date).toLocaleDateString(),
        `"${event.venue}"`,
        event.status,
        `"${event.purpose.replace(/"/g, '""')}"`,
        new Date(event.createdAt).toLocaleDateString()
      ].join(',');
      csv += row + '\n';
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="events-export-' + new Date().toISOString().split('T')[0] + '.csv"');
    res.send(csv);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export events'
    });
  }
});

// Get dashboard statistics
router.get('/stats', isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.user.id;
    
    const stats = {
      total: await EventRequest.count({ where: { user_id: userId } }),
      pending: await EventRequest.count({ where: { user_id: userId, status: 'Pending' } }),
      approved: await EventRequest.count({ where: { user_id: userId, status: 'Approved' } }),
      denied: await EventRequest.count({ where: { user_id: userId, status: 'Denied' } })
    };

    res.json({
      success: true,
      stats: stats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

// Get per-event stats: participants, reactions, comment count
router.get('/events/:id/stats', isLoggedIn, async (req, res) => {
  try {
    const eventId = req.params.id;

    // Participants with their names
    const participations = await Participation.findAll({
      where: { event_id: eventId },
      include: [{ model: User, attributes: ['user_id', 'name'] }]
    });
    const participants = participations.map(p => ({
      id: p.User?.user_id,
      name: p.User?.name || 'Unknown'
    }));

    // Reactions grouped by type
    const reactionRows = await Reaction.findAll({ where: { event_id: eventId } });
    const reactions = { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 };
    reactionRows.forEach(r => {
      if (reactions[r.reaction_type] !== undefined) reactions[r.reaction_type]++;
    });

    // Comment count
    const totalComments = await Comment.count({ where: { event_id: eventId } });

    res.json({ success: true, participants, reactions, totalComments });
  } catch (error) {
    console.error('Event stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch event stats' });
  }
});

// Get all booked date ranges (for submit-event calendar indicators)
router.get('/booked-dates', isLoggedIn, async (req, res) => {
  try {
    const events = await EventRequest.findAll({
      where: { status: 'Approved' },
      attributes: ['id', 'event_title', 'event_date', 'event_end_date', 'venue', 'organizer_name'],
      order: [['event_date', 'ASC']],
      raw: true,
    });
    res.json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch booked dates' });
  }
});

export default router;
