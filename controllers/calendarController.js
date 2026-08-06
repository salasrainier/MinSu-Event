import { EventRequest } from "../models/Eventrequest.js";
import { Op } from "sequelize";

/* ──────────────────────────────
   📅 ORGANIZER CALENDAR VIEW
────────────────────────────── */
export const organizerCalendar = async (req, res) => {
  try {
    const userId = req.session.user.id;

    // Get all approved events to show conflicts
    const approvedEvents = await EventRequest.findAll({
      where: { status: "Approved" },
      attributes: [
        "id",
        "event_title",
        "event_date",
        "event_end_date",
        "venue",
        "department",
        "organizer_name",
      ],
      order: [["event_date", "ASC"]],
      raw: true,
    });

    // Get user's pending/submitted events
    const userEvents = await EventRequest.findAll({
      where: { user_id: userId },
      attributes: [
        "id",
        "event_title",
        "event_date",
        "event_end_date",
        "venue",
        "status",
      ],
      order: [["event_date", "ASC"]],
      raw: true,
    });

    console.log(`\n📅 Calendar loaded for user ${userId}`);
    console.log(`   Approved events: ${approvedEvents.length}`);
    console.log(`   User events: ${userEvents.length}`);

    res.render("organizer_calendar", {
      title: "Event Calendar - Schedule Your Event",
      user: req.session.user,
      approvedEvents: JSON.stringify(approvedEvents),
      userEvents: JSON.stringify(userEvents),
    });
  } catch (error) {
    console.error("❌ Calendar Error:", error);
    req.flash("error_msg", "Failed to load calendar");
    res.redirect("/");
  }
};

/* ──────────────────────────────
   🔍 CHECK FOR CONFLICTS
────────────────────────────── */
export const checkConflicts = async (req, res) => {
  try {
    const { eventDate, eventEndDate, venue } = req.body;

    console.log(`\n🔍 Checking conflicts`);
    console.log(`   Date: ${eventDate} to ${eventEndDate}`);
    console.log(`   Venue: ${venue}`);

    const startDate = new Date(eventDate);
    const endDate = new Date(eventEndDate);

    // Find conflicting approved events
    const conflicts = await EventRequest.findAll({
      where: {
        status: "Approved",
        venue: venue,
        [Op.or]: [
          {
            event_date: {
              [Op.lte]: endDate,
            },
            event_end_date: {
              [Op.gte]: startDate,
            },
          },
        ],
      },
      attributes: [
        "id",
        "event_title",
        "event_date",
        "event_end_date",
        "organizer_name",
      ],
      raw: true,
    });

    console.log(`   Conflicts found: ${conflicts.length}`);

    if (conflicts.length > 0) {
      return res.json({
        success: false,
        hasConflict: true,
        message: `⚠️ Conflict detected! ${conflicts.length} event(s) already scheduled at this venue during this time.`,
        conflicts: conflicts,
      });
    }

    console.log(`   ✅ No conflicts - slot available`);
    res.json({
      success: true,
      hasConflict: false,
      message: "✅ Time slot is available!",
    });
  } catch (error) {
    console.error("❌ Conflict Check Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check conflicts",
    });
  }
};

/* ──────────────────────────────
   📝 GET CALENDAR DATA (JSON)
────────────────────────────── */
export const getCalendarData = async (req, res) => {
  try {
    // Get all approved events
    const approvedEvents = await EventRequest.findAll({
      where: { status: "Approved" },
      attributes: [
        "id",
        "event_title",
        "event_date",
        "event_end_date",
        "venue",
        "department",
        "organizer_name",
      ],
      order: [["event_date", "ASC"]],
      raw: true,
    });

    // Format for calendar display
    const events = approvedEvents.map((event) => ({
      id: event.id,
      title: event.event_title,
      start: event.event_date,
      end: event.event_end_date,
      venue: event.venue,
      organizer: event.organizer_name,
      department: event.department,
      type: "approved",
    }));

    res.json({
      success: true,
      events: events,
    });
  } catch (error) {
    console.error("❌ Calendar Data Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch calendar data",
    });
  }
};

/* ──────────────────────────────
   🔒 LOCK SLOT (Reserve time)
────────────────────────────── */
export const lockSlot = async (req, res) => {
  try {
    const { eventDate, eventEndDate, venue } = req.body;
    const userId = req.session.user.id;

    console.log(`\n🔒 Locking slot for user ${userId}`);

    // Store in session for later use
    req.session.lockedSlot = {
      eventDate,
      eventEndDate,
      venue,
      lockedAt: new Date(),
    };

    console.log(`   ✅ Slot locked`);
    res.json({
      success: true,
      message: "Slot locked! Proceed to event details.",
    });
  } catch (error) {
    console.error("❌ Lock Slot Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to lock slot",
    });
  }
};

/* ──────────────────────────────
   🎯 GET LOCKED SLOT INFO
────────────────────────────── */
export const getLockedSlot = (req, res) => {
  try {
    const lockedSlot = req.session.lockedSlot;

    if (!lockedSlot) {
      return res.json({
        success: false,
        message: "No slot locked",
      });
    }

    res.json({
      success: true,
      lockedSlot: lockedSlot,
    });
  } catch (error) {
    console.error("❌ Get Locked Slot Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get locked slot",
    });
  }
};
