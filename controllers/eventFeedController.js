import { EventRequest } from "../models/Eventrequest.js";
import { Comment } from "../models/Comment.js";
import { Reaction } from "../models/Reaction.js";
import { User } from "../models/userModel.js";
import { Participation } from "../models/Participation.js";
import { Op } from "sequelize";

/* ──────────────────────────────
   📱 FACEBOOK-LIKE EVENT FEED
────────────────────────────── */
export const eventFeed = async (req, res) => {
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

    // Get all approved events (including expired ones - they're still visible!)
    const events = await EventRequest.findAll({
      where: { 
        status: "Approved",
      },
      include: [
        {
          model: User,
          attributes: ["user_id", "name", "profile_picture"],
        },
        {
          model: Reaction,
          attributes: ["reaction_id", "user_id", "reaction_type"],
          required: false,
        },
        {
          model: Comment,
          attributes: ["comment_id", "user_id", "content", "created_at"],
          include: [
            {
              model: User,
              attributes: ["user_id", "name", "profile_picture"],
            },
          ],
          required: false,
          limit: 3,
          order: [["created_at", "DESC"]],
        },
        {
          model: Participation,
          attributes: ["participant_id", "user_id"],
          required: false,
        },
      ],
      order: [["created_at", "DESC"]],
    });

    // Check if user has joined each event and their reaction
    const enrichedEvents = events.map((event) => {
      const eventData = event.toJSON();
      
      // Check if user joined
      eventData.userJoined = eventData.Participations.some(
        (p) => p.user_id === userId
      );

      // Get user's reaction if any
      const userReaction = eventData.Reactions.find(
        (r) => r.user_id === userId
      );
      eventData.userReaction = userReaction ? userReaction.reaction_type : null;

      // Count reactions by type
      eventData.reactionCounts = {
        like: eventData.Reactions.filter((r) => r.reaction_type === "like")
          .length,
        love: eventData.Reactions.filter((r) => r.reaction_type === "love")
          .length,
        haha: eventData.Reactions.filter((r) => r.reaction_type === "haha")
          .length,
        wow: eventData.Reactions.filter((r) => r.reaction_type === "wow")
          .length,
        sad: eventData.Reactions.filter((r) => r.reaction_type === "sad")
          .length,
        angry: eventData.Reactions.filter((r) => r.reaction_type === "angry")
          .length,
      };

      eventData.totalReactions = eventData.Reactions.length;
      eventData.totalComments = eventData.Comments.length;
      eventData.totalParticipants = eventData.Participations.length;

      return eventData;
    });

    res.render("event_feed", {
      title: "Event Feed",
      user: req.session.user,
      events: enrichedEvents,
      currentPage: "feed",
      success_msg: req.flash("success_msg"),
      error_msg: req.flash("error_msg"),
    });
  } catch (error) {
    console.error("❌ Event Feed Error:", error);
    req.flash("error_msg", "Failed to load events");
    res.redirect("/");
  }
};

/* ──────────────────────────────
   ❤️ ADD REACTION
────────────────────────────── */
export const addReaction = async (req, res) => {
  try {
    const { eventId, reactionType } = req.body;
    const userId = req.session.user.id;

    console.log(`\n❤️ Adding reaction - Event: ${eventId}, User: ${userId}, Type: ${reactionType}`);

    // Check if user already reacted
    const existingReaction = await Reaction.findOne({
      where: { event_id: eventId, user_id: userId },
    });

    if (existingReaction) {
      // If same reaction, remove it (toggle)
      if (existingReaction.reaction_type === reactionType) {
        await existingReaction.destroy();
        console.log("✅ Reaction removed (toggled)");
        return res.json({
          success: true,
          message: "Reaction removed",
          userReaction: null,
        });
      } else {
        // Update to new reaction type
        await existingReaction.update({ reaction_type: reactionType });
        console.log("✅ Reaction updated");
        return res.json({
          success: true,
          message: "Reaction updated",
          userReaction: reactionType,
        });
      }
    }

    // Create new reaction
    await Reaction.create({
      event_id: eventId,
      user_id: userId,
      reaction_type: reactionType,
    });

    console.log("✅ Reaction added");
    res.json({
      success: true,
      message: "Reaction added",
      userReaction: reactionType,
    });
  } catch (error) {
    console.error("❌ Reaction Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add reaction",
    });
  }
};

/* ──────────────────────────────
   💬 ADD COMMENT
────────────────────────────── */
export const addComment = async (req, res) => {
  try {
    const { eventId, content } = req.body;
    const userId = req.session.user.id;

    console.log(`\n💬 Adding comment - Event: ${eventId}, User: ${userId}`);

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty",
      });
    }

    const comment = await Comment.create({
      event_id: eventId,
      user_id: userId,
      content: content.trim(),
    });

    // Fetch the comment with user details
    const populatedComment = await Comment.findByPk(comment.comment_id, {
      include: [
        {
          model: User,
          attributes: ["user_id", "name", "profile_picture"],
        },
      ],
    });

    console.log("✅ Comment added");
    res.json({
      success: true,
      message: "Comment added",
      comment: populatedComment,
    });
  } catch (error) {
    console.error("❌ Comment Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};

/* ──────────────────────────────
   📝 GET COMMENTS
────────────────────────────── */
export const getComments = async (req, res) => {
  try {
    const { eventId } = req.params;

    const comments = await Comment.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: User,
          attributes: ["user_id", "name", "profile_picture"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json({
      success: true,
      comments: comments,
    });
  } catch (error) {
    console.error("❌ Get Comments Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};

/* ──────────────────────────────
   🎫 JOIN EVENT (same as before)
────────────────────────────── */
export const joinEvent = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const eventId = req.params.eventId;

    console.log(`\n🎫 JOIN EVENT - userId: ${userId}, eventId: ${eventId}`);

    // Check if event exists and is not expired
    const event = await EventRequest.findByPk(eventId);
    
    if (!event) {
      return res.json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.is_expired) {
      console.log(`   ⚠️ Event is expired`);
      return res.json({
        success: false,
        message: "⏰ This event has expired. You can no longer join.",
      });
    }

    // Check if already joined
    const existing = await Participation.findOne({
      where: { user_id: userId, event_id: eventId },
    });

    if (existing) {
      console.log(`   ⚠️ Already joined`);
      return res.json({
        success: false,
        message: "You have already joined this event",
      });
    }

    // ── Check if user's course is allowed to join ────────────
    const user = await User.findByPk(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const allowedCourses = event.allowed_courses || ["All Courses (Public Event)"];
    const isPublicEvent = allowedCourses.includes("All Courses (Public Event)");
    const isUserCourseAllowed = allowedCourses.includes(user.course);

    if (!isPublicEvent && !isUserCourseAllowed) {
      console.log(`   ❌ Course not allowed. User: ${user.course}, Allowed: ${JSON.stringify(allowedCourses)}`);
      return res.json({
        success: false,
        message: `❌ You cannot join this event. It is only open to: ${allowedCourses.join(", ")}`,
      });
    }

    // Create participation record
    await Participation.create({
      user_id: userId,
      event_id: eventId,
      status: "registered",
    });

    console.log(`   ✅ Joined successfully`);
    res.json({
      success: true,
      message: "✅ Successfully joined the event!",
    });
  } catch (error) {
    console.error("❌ Join Event Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to join event",
    });
  }
};

/* ──────────────────────────────
   🚪 LEAVE EVENT
────────────────────────────── */
export const leaveEvent = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const eventId = req.params.eventId;

    console.log(`\n🚪 LEAVE EVENT - userId: ${userId}, eventId: ${eventId}`);

    await Participation.destroy({
      where: { user_id: userId, event_id: eventId },
    });

    console.log(`   ✅ Left successfully`);
    res.json({
      success: true,
      message: "Successfully left the event",
    });
  } catch (error) {
    console.error("❌ Leave Event Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to leave event",
    });
  }
};


/* ──────────────────────────────
   🔄 REOPEN EVENT (Organizer Only)
────────────────────────────── */
export const reopenEvent = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const eventId = req.params.eventId;

    console.log(`\n🔄 REOPEN EVENT - userId: ${userId}, eventId: ${eventId}`);

    // Find the event
    const event = await EventRequest.findByPk(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check if user is the organizer
    if (event.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Only the organizer can reopen this event",
      });
    }

    // Reopen the event
    await event.update({ is_expired: false });

    console.log(`   ✅ Event reopened successfully`);
    res.json({
      success: true,
      message: "✅ Event has been reopened!",
    });
  } catch (error) {
    console.error("❌ Reopen Event Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reopen event",
    });
  }
};

/* ──────────────────────────────
   🔒 CLOSE EVENT (Organizer Only)
────────────────────────────── */
export const closeEvent = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const eventId = req.params.eventId;

    console.log(`\n🔒 CLOSE EVENT - userId: ${userId}, eventId: ${eventId}`);

    // Find the event
    const event = await EventRequest.findByPk(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check if user is the organizer
    if (event.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Only the organizer can close this event",
      });
    }

    // Close the event
    await event.update({ is_expired: true });

    console.log(`   ✅ Event closed successfully`);
    res.json({
      success: true,
      message: "✅ Event has been closed!",
    });
  } catch (error) {
    console.error("❌ Close Event Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to close event",
    });
  }
};
