import { Participation } from "../models/Participation.js";
import { User } from "../models/userModel.js";
import { EventRequest } from "../models/Eventrequest.js";

/**
 * Get all participants for an event with their attendance status
 */
export const getEventParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { organizerId } = req.query;

    // Verify organizer owns this event
    const event = await EventRequest.findOne({
      where: { id: eventId, user_id: organizerId }
    });

    if (!event) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this event's participants"
      });
    }

    // Get all participants for this event
    const participants = await Participation.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: User,
          attributes: ['user_id', 'name', 'email', 'course', 'year', 'department']
        }
      ]
    });

    res.json({
      success: true,
      event: {
        id: event.id,
        title: event.event_title,
        date: event.event_date
      },
      participants: participants.map(p => ({
        participantId: p.participant_id,
        userId: p.User.user_id,
        name: p.User.name,
        email: p.User.email,
        course: p.User.course,
        year: p.User.year,
        department: p.User.department,
        status: p.status,
        registeredAt: p.created_at
      }))
    });
  } catch (error) {
    console.error("❌ Error fetching participants:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching participants"
    });
  }
};

/**
 * Mark a participant as attended
 */
export const markAttendance = async (req, res) => {
  try {
    const { participantId, eventId, organizerId } = req.body;

    // Verify organizer owns this event
    const event = await EventRequest.findOne({
      where: { id: eventId, user_id: organizerId }
    });

    if (!event) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to mark attendance for this event"
      });
    }

    // Update participation status to 'attended'
    const participation = await Participation.findOne({
      where: { participant_id: participantId, event_id: eventId }
    });

    if (!participation) {
      return res.status(404).json({
        success: false,
        message: "Participant not found"
      });
    }

    await participation.update({ status: 'attended' });

    res.json({
      success: true,
      message: `✅ Marked as attended`,
      participation: {
        participantId: participation.participant_id,
        status: participation.status
      }
    });
  } catch (error) {
    console.error("❌ Error marking attendance:", error);
    res.status(500).json({
      success: false,
      message: "Error marking attendance"
    });
  }
};

/**
 * Mark a participant as not attended / cancel
 */
export const unmarkAttendance = async (req, res) => {
  try {
    const { participantId, eventId, organizerId } = req.body;

    // Verify organizer owns this event
    const event = await EventRequest.findOne({
      where: { id: eventId, user_id: organizerId }
    });

    if (!event) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to modify attendance for this event"
      });
    }

    // Update participation status back to 'registered'
    const participation = await Participation.findOne({
      where: { participant_id: participantId, event_id: eventId }
    });

    if (!participation) {
      return res.status(404).json({
        success: false,
        message: "Participant not found"
      });
    }

    await participation.update({ status: 'registered' });

    res.json({
      success: true,
      message: `✅ Marked as not attended`,
      participation: {
        participantId: participation.participant_id,
        status: participation.status
      }
    });
  } catch (error) {
    console.error("❌ Error unmarking attendance:", error);
    res.status(500).json({
      success: false,
      message: "Error unmarking attendance"
    });
  }
};

/**
 * Get attendance statistics for an event
 */
export const getAttendanceStats = async (req, res) => {
  try {
    const { eventId, organizerId } = req.query;

    // Verify organizer owns this event
    const event = await EventRequest.findOne({
      where: { id: eventId, user_id: organizerId }
    });

    if (!event) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this event"
      });
    }

    // Get attendance stats
    const [registered, attended, cancelled] = await Promise.all([
      Participation.count({ where: { event_id: eventId, status: 'registered' } }),
      Participation.count({ where: { event_id: eventId, status: 'attended' } }),
      Participation.count({ where: { event_id: eventId, status: 'cancelled' } })
    ]);

    const total = registered + attended + cancelled;
    const attendanceRate = total > 0 ? Math.round((attended / total) * 100) : 0;

    res.json({
      success: true,
      stats: {
        total,
        registered,
        attended,
        cancelled,
        attendanceRate: `${attendanceRate}%`
      }
    });
  } catch (error) {
    console.error("❌ Error getting stats:", error);
    res.status(500).json({
      success: false,
      message: "Error getting attendance statistics"
    });
  }
};
