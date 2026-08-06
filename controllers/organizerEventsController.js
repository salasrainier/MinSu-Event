import { EventRequest } from "../models/Eventrequest.js";
import { User } from "../models/userModel.js";
import { Participation } from "../models/Participation.js";
import { Op } from "sequelize";

/* ──────────────────────────────
   📋 MY EVENTS (Organizer View)
────────────────────────────── */
export const myEvents = async (req, res) => {
  try {
    const userId = req.session.user.id;

    // Auto-expire events that are past their end date
    await EventRequest.update(
      { is_expired: true },
      {
        where: {
          event_end_date: { [Op.lt]: new Date() },
          is_expired: false,
        },
      }
    );

    // Get all events created by this organizer
    const activeEvents = await EventRequest.findAll({
      where: { 
        user_id: userId,
        status: "Approved",
        is_expired: false,
      },
      include: [
        {
          model: Participation,
          attributes: ["participant_id"],
          required: false,
        },
      ],
      order: [["created_at", "DESC"]],
    });

    const expiredEvents = await EventRequest.findAll({
      where: { 
        user_id: userId,
        status: "Approved",
        is_expired: true,
      },
      include: [
        {
          model: Participation,
          attributes: ["participant_id"],
          required: false,
        },
      ],
      order: [["created_at", "DESC"]],
    });

    // Add participant count to each event
    const enrichActiveEvents = activeEvents.map(event => {
      const eventData = event.toJSON();
      eventData.participantCount = eventData.Participations.length;
      return eventData;
    });

    const enrichExpiredEvents = expiredEvents.map(event => {
      const eventData = event.toJSON();
      eventData.participantCount = eventData.Participations.length;
      return eventData;
    });

    res.render("my_events", {
      title: "My Events",
      user: req.session.user,
      activeEvents: enrichActiveEvents,
      expiredEvents: enrichExpiredEvents,
      success_msg: req.flash("success_msg"),
      error_msg: req.flash("error_msg"),
    });
  } catch (error) {
    console.error("❌ My Events Error:", error);
    req.flash("error_msg", "Failed to load your events");
    res.redirect("/");
  }
};
