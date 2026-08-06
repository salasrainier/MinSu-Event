import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

/* ──────────────────────────────
   Helper: detect AJAX / JSON submit
────────────────────────────── */
function isAjax(req) {
  return req.xhr || req.get("Accept")?.includes("application/json") || req.is("application/json");
}

/* ──────────────────────────────
   LOGIN ACTION
───────────────────────────── */
export const loginUser = async (req, res) => {
  const { email, password } = req.body || {};
  console.log(`\n🔐 Login Attempt - Email: ${email}`);

  try {
    if (!email || !password) {
      const msg = "Email and password are required.";
      console.log(`   ❌ ${msg}`);
      if (isAjax(req)) return res.json({ success: false, message: msg });
      req.flash("error_msg", msg);
      return res.redirect("/auth/login");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const msg = "Email not found. Please register first.";
      console.log(`   ❌ ${msg}`);
      if (isAjax(req)) return res.json({ success: false, message: `❌ ${msg}` });
      req.flash("error_msg", msg);
      return res.redirect("/auth/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const msg = "Incorrect password. Try again.";
      console.log(`   ❌ ${msg}`);
      if (isAjax(req)) return res.json({ success: false, message: `❌ ${msg}` });
      req.flash("error_msg", msg);
      return res.redirect("/auth/login");
    }

    // Save user info in session
    req.session.user = { id: user.user_id, name: user.name, email: user.email, role: user.role, department: user.department };

    console.log(`   ✅ User authenticated: ${user.name} (${user.role})`);
    console.log(`   📝 Session Set:`, req.session.user);
    console.log(`   Session ID: ${req.sessionID}`);

    // ✅ Redirect based on role
    let redirectUrl = "/";
    if (user.role === "admin") {
      redirectUrl = "/admin/dashboard";
    } else if (user.role === "organizer") {
      redirectUrl = "/organizer/dashboard";
    } else if (user.role === "participant") {
      redirectUrl = "/participant/dashboard";
    }

    console.log(`   🔀 Redirect URL: ${redirectUrl}`);

    const successMessage = `✅ Welcome back, ${user.name}!`;

    if (isAjax(req)) {
      // ✅ CRITICAL: Save session before sending response
      return req.session.save((err) => {
        if (err) {
          console.error("   ❌ Session save error:", err);
          return res.json({ success: false, message: "❌ Session error. Please try again." });
        }
        console.log(`   ✅ Session saved successfully`);
        res.json({ success: true, message: successMessage, redirect: redirectUrl });
      });
    }

    // ✅ For non-AJAX, ALWAYS save session before redirecting (critical for admin)
    console.log(`   🔐 Saving session before redirect for non-AJAX request`);
    req.flash("success_msg", successMessage);
    return req.session.save((err) => {
      if (err) {
        console.error("   ❌ Session save error on non-AJAX:", err);
        req.flash("error_msg", "Session error. Please try again.");
        return res.redirect("/auth/login");
      }
      console.log(`   ✅ Session saved successfully, redirecting to ${redirectUrl}`);
      return res.redirect(redirectUrl);
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    if (isAjax(req)) return res.json({ success: false, message: "❌ Something went wrong. Please try again." });
    req.flash("error_msg", "Something went wrong. Please try again.");
    return res.redirect("/auth/login");
  }
};

/* ──────────────────────────────
   REGISTER ACTION
───────────────────────────── */
export const registerUser = async (req, res) => {
  const { name, email, password, role, department, course, year } = req.body || {};

  try {
    if (!name || !email || !password || !role) {
      const msg = "All fields are required.";
      if (isAjax(req)) return res.json({ success: false, message: `❌ ${msg}` });
      req.flash("error_msg", msg);
      return res.redirect("/auth/register");
    }

    // Validate role
    if (!["participant", "organizer"].includes(role)) {
      const msg = "Invalid role selected.";
      if (isAjax(req)) return res.json({ success: false, message: `❌ ${msg}` });
      req.flash("error_msg", msg);
      return res.redirect("/auth/register");
    }

    // Organizers must provide department
    if (role === "organizer" && !department) {
      const msg = "Department is required for organizers.";
      if (isAjax(req)) return res.json({ success: false, message: `❌ ${msg}` });
      req.flash("error_msg", msg);
      return res.redirect("/auth/register");
    }

    // Participants should provide course and year
    if (role === "participant" && (!course || !year)) {
      const msg = "Course and Year are required for participants.";
      if (isAjax(req)) return res.json({ success: false, message: `❌ ${msg}` });
      req.flash("error_msg", msg);
      return res.redirect("/auth/register");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const msg = "Invalid email format.";
      if (isAjax(req)) return res.json({ success: false, message: `❌ ${msg}` });
      req.flash("error_msg", msg);
      return res.redirect("/auth/register");
    }

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters.";
      if (isAjax(req)) return res.json({ success: false, message: `❌ ${msg}` });
      req.flash("error_msg", msg);
      return res.redirect("/auth/register");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const msg = "Email already registered. Please login.";
      if (isAjax(req)) return res.json({ success: false, message: `❌ ${msg}` });
      req.flash("error_msg", msg);
      return res.redirect("/auth/login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role,
      department: role === "organizer" ? department : null,
      course: role === "participant" ? course : null,
      year: role === "participant" ? year : null
    });

    const successMsg = "✅ Registration successful! Please login.";

    if (isAjax(req)) {
      return res.json({ success: true, message: successMsg, redirect: "/auth/login" });
    }

    req.flash("success_msg", successMsg);
    return res.redirect("/auth/login");
  } catch (err) {
    console.error("❌ Register Error:", err);
    if (isAjax(req)) return res.json({ success: false, message: "❌ Something went wrong. Please try again." });
    req.flash("error_msg", "Something went wrong. Please try again.");
    return res.redirect("/auth/register");
  }
};

/* ──────────────────────────────
   LOGOUT
───────────────────────────── */
export const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("❌ Logout Error:", err);
      return res.redirect("/");
    }
    res.clearCookie("connect.sid");
    return res.redirect("/auth/login"); // redirect to login page
  });
};
