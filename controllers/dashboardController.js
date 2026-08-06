import { EventRequest } from "../models/Eventrequest.js";

export const dashboardPage = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  try {
    const events = await EventRequest.findAll({
      where: { user_id: req.session.user.id }, // ✅ fixed column
      order: [["created_at", "DESC"]],
      raw: true,
    });

    res.render("dashboard", {
      title: "Dashboard",
      user: req.session.user,
      events,
      message: req.flash("success_msg") || req.flash("error_msg"),
    });
  } catch (err) {
    console.error("❌ Dashboard error:", err);
    req.flash("error_msg", "Error loading dashboard");
    res.redirect("/");
  }
};

export const submitEvent = async (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  try {
    const { organizer_name, department, event_title, event_date, venue, purpose } = req.body;
    const proposal_file = req.file ? `/uploads/${req.file.filename}` : null;

    await EventRequest.create({
      organizer_name,
      department,
      event_title,
      event_date,
      venue,
      purpose,
      proposal_file,
      status: "Pending",
      user_id: req.session.user.id, // ✅ match DB column
    });

    req.flash("success_msg", "✅ Event submitted successfully!");
    res.redirect("/dashboard");
  } catch (err) {
    console.error("❌ Error submitting event:", err);
    req.flash("error_msg", "Failed to submit event");
    res.redirect("/submit-event");
  }
};
