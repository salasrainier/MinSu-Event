import express from "express";
import { homePage } from "../controllers/homeController.js";
import { 
  viewForm, 
  submitEvent, 
  dashboard, 
  upload,
  uploadFields,
  dashboardAdmin, 
  approveEvent, 
  denyEvent 
} from "../controllers/eventrequestcontroller.js";
import { analyticsPage } from "../controllers/analyticsController.js";
import { isAdmin, isLoggedIn } from "../middleware/isAdmin.js";

const router = express.Router();

// Middleware: Check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    req.flash("error_msg", "Admin access required.");
    return res.redirect("/");
  }
  next();
};

// Middleware: Check if user is organizer
const requireOrganizer = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "organizer") {
    req.flash("error_msg", "Organizer access required.");
    return res.redirect("/");
  }
  next();
};

// Middleware: Check if user is participant
const requireParticipant = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "participant") {
    req.flash("error_msg", "Participant access required.");
    return res.redirect("/");
  }
  next();
};

// Auth Redirects (convenience)
router.get("/login", (req, res) => res.redirect("/auth/login"));
router.get("/register", (req, res) => res.redirect("/auth/register"));

// Home
router.get("/", homePage);

// Event Submission
router.get("/submit-event", isLoggedIn, viewForm);
router.post("/submit-event", isLoggedIn, uploadFields, submitEvent);

// Browse Events (for participants)
router.get("/events", isLoggedIn, (req, res) => {
  res.render("event_list", { 
    user: req.session.user,
    title: "Browse Events",
    success_msg: req.flash("success_msg"),
    error_msg: req.flash("error_msg")
  });
});

// My Participation (for participants to see their joined events)
router.get("/my-participation", isLoggedIn, (req, res) => {
  res.render("my_participation", { 
    user: req.session.user,
    title: "My Participation",
    success_msg: req.flash("success_msg"),
    error_msg: req.flash("error_msg")
  });
});

// User Dashboard
router.get("/dashboard", isLoggedIn, (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return res.redirect("/admin/dashboard");
  }
  return dashboard(req, res, next);
});

// Role-Based Dashboards
router.get("/organizer/dashboard", isLoggedIn, dashboard);
router.get("/participant/dashboard", isLoggedIn, dashboard);

// Event Calendar
router.get("/calendar", isLoggedIn, (req, res) => {
  res.render("calendar", { user: req.session.user });
});

// Notifications
router.get("/notifications", isLoggedIn, (req, res) => {
  res.render("notifications", { user: req.session.user });
});

// Admin Dashboard
router.get("/admin/dashboard", requireAdmin, dashboardAdmin);
router.get("/admin/analytics", requireAdmin, analyticsPage);
router.get("/admin/events/approve/:id", requireAdmin, approveEvent);
router.get("/admin/events/deny/:id", requireAdmin, denyEvent);

export default router;
