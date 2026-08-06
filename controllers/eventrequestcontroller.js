import multer from "multer";
import path from "path";
import fs from "fs";
import { EventRequest } from "../models/Eventrequest.js";
import { Op } from "sequelize";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ──────────────────────────────
   📁 Ensure Upload Folder Exists
────────────────────────────── */
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

/* ──────────────────────────────
   📁 MULTER CONFIG (file uploads)
────────────────────────────── */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

// Accepts all three file fields from the submit form
export const uploadFields = upload.fields([
  { name: "proposal_file", maxCount: 1 },
  { name: "event_images",  maxCount: 5 },
  { name: "event_video",   maxCount: 1 },
]);

/* ──────────────────────────────
   📝 VIEW SUBMIT FORM (Anyone logged in)
────────────────────────────── */
export const viewForm = (req, res) => {
  res.render("submit_event", {
    title: "Submit Event",
    user: req.session.user,
    organizerName: req.session.user.name, // Auto-fill organizer name
  });
};

/* ──────────────────────────────
   🚀 HANDLE EVENT SUBMISSION
────────────────────────────── */
export const submitEvent = async (req, res) => {
  try {
    const { event_title, department, event_date, event_end_date, venue, purpose, allowed_courses } = req.body;

    // ── Proposal document required ───────────────────────────
    const proposal_file = req.files?.proposal_file?.[0]
      ? `/uploads/${req.files.proposal_file[0].filename}`
      : null;

    if (!proposal_file) {
      req.flash("error_msg", "Proposal document is required. Please attach a PDF or Word file.");
      return res.redirect("/submit-event");
    }

    // ── Server-side conflict check ───────────────────────────
    const start = new Date(event_date);
    const end   = new Date(event_end_date);

    const conflict = await EventRequest.findOne({
      where: {
        status: "Approved",
        event_date:     { [Op.lt]: end   },
        event_end_date: { [Op.gt]: start },
      },
    });

    if (conflict) {
      req.flash("error_msg",
        `Schedule conflict: "${conflict.event_title}" is already approved on that date/time. Please choose a different time slot.`
      );
      return res.redirect("/submit-event");
    }

    // ── event_images — array of image paths ─────────────────
    const event_images = req.files?.event_images
      ? req.files.event_images.map(f => `/uploads/${f.filename}`)
      : [];

    // ── event_video — single video ───────────────────────────
    const event_video = req.files?.event_video?.[0]
      ? `/uploads/${req.files.event_video[0].filename}`
      : null;

    // ── allowed_courses — convert to array if needed ──────────
    let allowedCoursesArray = ["All Courses (Public Event)"];
    if (allowed_courses) {
      allowedCoursesArray = Array.isArray(allowed_courses) 
        ? allowed_courses 
        : [allowed_courses];
    }

    await EventRequest.create({
      organizer_name: req.session.user.name,
      event_title,
      department,
      event_date,
      event_end_date,
      venue,
      purpose,
      proposal_file,
      event_images,
      event_video,
      allowed_courses: allowedCoursesArray,
      status: "Pending",
      user_id: req.session.user.id,
    });

    req.flash("success_msg", "Event submitted successfully! Waiting for admin approval.");
    res.redirect("/organizer/dashboard");
  } catch (error) {
    console.error("❌ Error submitting event:", error);
    req.flash("error_msg", "Failed to submit event. Please try again.");
    res.redirect("/submit-event");
  }
};

/* ──────────────────────────────
   📊 USER/ORGANIZER DASHBOARD (View Own & Approved Events)
────────────────────────────── */
export const dashboard = async (req, res) => {
  try {
    console.log(`\n🚀 Dashboard Called`);
    console.log(`   Path: ${req.path}`);
    console.log(`   Session ID: ${req.sessionID}`);
    console.log(`   Session User:`, req.session.user);
    
    // Ensure user is logged in
    if (!req.session.user || !req.session.user.id) {
      console.log("🚫 No session user found, redirecting to login");
      req.flash("error_msg", "Please login first.");
      return res.redirect("/auth/login");
    }

    console.log(`✅ User found in session:`, { id: req.session.user.id, name: req.session.user.name, role: req.session.user.role });

    let events = [];
    let viewName = "dashboard";
    const userRole = req.session.user.role;
    const requestPath = req.path;
    
    console.log(`   User Role: ${userRole}`);
    console.log(`   Request Path: ${requestPath}`);
    
    // Check if accessing organizer dashboard but user is not organizer
    if (requestPath === "/organizer/dashboard" && userRole !== "organizer") {
      console.log(`🚫 Organizer dashboard access denied. Role: ${userRole}`);
      req.flash("error_msg", "Organizer access required.");
      return res.redirect("/");
    }

    // Check if accessing participant dashboard but user is not participant
    if (requestPath === "/participant/dashboard" && userRole !== "participant") {
      console.log(`🚫 Participant dashboard access denied. Role: ${userRole}`);
      req.flash("error_msg", "Participant access required.");
      return res.redirect("/");
    }

    // Determine which events and view to show based on role
    if (userRole === "admin") {
      events = await EventRequest.findAll({
        order: [["created_at", "DESC"]],
        raw: true,
      });
      viewName = "dashboard"; // Admin uses regular dashboard
      console.log(`✅ Rendering admin dashboard with ${events.length} events`);
    } else if (userRole === "organizer") {
      // Organizers see their submitted events
      events = await EventRequest.findAll({
        where: { user_id: req.session.user.id },
        order: [["event_date", "ASC"]],
        raw: true,
      });
      viewName = "organizer_dashboard";
      console.log(`✅ Rendering organizer dashboard for user ${req.session.user.id} with ${events.length} events`);
    } else if (userRole === "participant") {
      // Participants see their joined events (future)
      events = await EventRequest.findAll({
        where: { user_id: req.session.user.id },
        order: [["event_date", "ASC"]],
        raw: true,
      });
      viewName = "participant_dashboard";
      console.log(`✅ Rendering participant dashboard for user ${req.session.user.id} with ${events.length} events`);
    }

    console.log(`   Rendering view: ${viewName}`);
    res.render(viewName, {
      title: "Dashboard",
      user: req.session.user,
      events: events || [],
      success_msg: req.flash("success_msg"),
      error_msg: req.flash("error_msg"),
    });
  } catch (error) {
    console.error("❌ Dashboard Load Error:", error);
    req.flash("error_msg", "Could not load events.");
    res.redirect("/");
  }
};

/* ──────────────────────────────
   📋 ADMIN DASHBOARD (All Pending Events)
────────────────────────────── */
export const dashboardAdmin = async (req, res) => {
  try {
    const { Op, QueryTypes } = await import("sequelize");
    const { sequelize } = await import("../models/db.js");
    const { User } = await import("../models/userModel.js");
    const { Participation } = await import("../models/Participation.js");

    // ── Events ───────────────────────────────────────────────
    const events = await EventRequest.findAll({
      order: [["created_at", "DESC"]],
      raw: true,
    });

    const totalEvents    = events.length;
    const pendingEvents  = events.filter(e => e.status === "Pending").length;
    const approvedEvents = events.filter(e => e.status === "Approved").length;
    const deniedEvents   = events.filter(e => e.status === "Denied").length;
    const expiredEvents  = events.filter(e => e.is_expired).length;
    const approvalRate   = totalEvents > 0 ? ((approvedEvents / totalEvents) * 100).toFixed(1) : 0;

    // ── Users ────────────────────────────────────────────────
    const totalUsers       = await User.count();
    const organizerUsers   = await User.count({ where: { role: "organizer" } });
    const participantUsers = await User.count({ where: { role: "participant" } });
    const recentUsers      = await User.findAll({
      attributes: ["user_id", "name", "email", "role", "status", "created_at"],
      order: [["created_at", "DESC"]],
      limit: 8,
      raw: true,
    });

    // ── Participation ────────────────────────────────────────
    const totalParticipations = await Participation.count();

    // ── Monthly trends (last 6 months) ───────────────────────
    const now = new Date();
    const monthLabels = [];
    const monthCounts = [];
    for (let i = 5; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end   = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const label = start.toLocaleString("default", { month: "short" });
      const count = await EventRequest.count({
        where: { created_at: { [Op.between]: [start, end] } },
      });
      monthLabels.push(label);
      monthCounts.push(count);
    }

    // ── Department breakdown ─────────────────────────────────
    const deptBreakdown = await EventRequest.findAll({
      attributes: ["department", [sequelize.fn("COUNT", sequelize.col("id")), "count"]],
      group: ["department"],
      order: [[sequelize.fn("COUNT", sequelize.col("id")), "DESC"]],
      raw: true,
    });

    // ── Audit logs (last 20 actions from events) ─────────────
    const auditLogs = await EventRequest.findAll({
      attributes: ["id", "event_title", "organizer_name", "status", "created_at", "updated_at"],
      order: [["updated_at", "DESC"]],
      limit: 20,
      raw: true,
    });

    // ── Upcoming approved events (next 30 days) ──────────────
    const upcoming = await EventRequest.findAll({
      where: {
        status: "Approved",
        is_expired: false,
        event_date: { [Op.between]: [now, new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)] },
      },
      order: [["event_date", "ASC"]],
      limit: 5,
      raw: true,
    });

    res.render("dashboard_admin", {
      title: "Admin Dashboard",
      user: req.session.user,
      events,
      stats: {
        totalEvents, pendingEvents, approvedEvents, deniedEvents, expiredEvents,
        approvalRate, totalUsers, organizerUsers, participantUsers, totalParticipations,
        monthLabels: JSON.stringify(monthLabels),
        monthCounts: JSON.stringify(monthCounts),
        deptLabels:  JSON.stringify(deptBreakdown.map(d => d.department || "Unknown")),
        deptCounts:  JSON.stringify(deptBreakdown.map(d => parseInt(d.count))),
      },
      recentUsers,
      auditLogs,
      upcoming,
      message: req.flash("success_msg") || req.flash("error_msg"),
      success_msg: req.flash("success_msg"),
      error_msg:   req.flash("error_msg"),
    });
  } catch (error) {
    console.error("❌ Admin Dashboard Error:", error);
    req.flash("error_msg", "Failed to load admin dashboard.");
    res.redirect("/");
  }
};

/* ✅ ADMIN Approve Event */
export const approveEvent = async (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    req.flash("error_msg", "Access denied.");
    return res.redirect("/auth/login");
  }

  try {
    const event = await EventRequest.findByPk(req.params.id);
    await EventRequest.update({ status: "Approved" }, { where: { id: req.params.id } });
    
    // Send real-time notification to organizer
    const { sendNotificationToUser } = await import("../routes/notificationRoutes.js");
    sendNotificationToUser(event.user_id, {
      type: "event_approved",
      title: "Event Approved! ✅",
      message: `Your event "${event.event_title}" has been approved!`,
      event_title: event.event_title,
      timestamp: new Date()
    });

    console.log(`✅ Event approved and notification sent to user ${event.user_id}`);
    req.flash("success_msg", "Event Approved ✅");
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("❌ Approve Event Error:", error);
    req.flash("error_msg", "Failed to approve event.");
    res.redirect("/admin/dashboard");
  }
};

/* ❌ ADMIN Deny Event */
export const denyEvent = async (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    req.flash("error_msg", "Access denied.");
    return res.redirect("/auth/login");
  }

  try {
    const event = await EventRequest.findByPk(req.params.id);
    await EventRequest.update({ status: "Denied" }, { where: { id: req.params.id } });
    
    // Send real-time notification to organizer
    const { sendNotificationToUser } = await import("../routes/notificationRoutes.js");
    sendNotificationToUser(event.user_id, {
      type: "event_denied",
      title: "Event Denied ❌",
      message: `Your event "${event.event_title}" has been denied.`,
      event_title: event.event_title,
      timestamp: new Date()
    });

    console.log(`❌ Event denied and notification sent to user ${event.user_id}`);
    req.flash("error_msg", "Event Denied ❌");
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("❌ Deny Event Error:", error);
    req.flash("error_msg", "Failed to deny event.");
    res.redirect("/admin/dashboard");
  }
};
