import 'dotenv/config.js';
import express from "express";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import router from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import eventFeedRoutes from "./routes/eventFeedRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import debugRoutes from "./routes/debugRoutes.js";
import fs from "fs";
import hbs from "hbs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { sequelize } from "./models/db.js";
import { Participation } from "./models/Participation.js";
import moment from "moment";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

/* ──────────────────────────────
   MIDDLEWARE
────────────────────────────── */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// --- Session ---
app.use(
  session({
    secret: process.env.SECRET_KEY || "xianfire-secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour, httpOnly: true by default
  })
);

// --- Flash ---
app.use(flash());

/* ──────────────────────────────
   VIEW ENGINE
────────────────────────────── */
app.engine("xian", hbs.__express);
app.set("view engine", "xian");
app.set("views", path.join(__dirname, "views"));

/* ──────────────────────────────
   REGISTER PARTIALS
────────────────────────────── */
const partialsDir = path.join(__dirname, "views", "partials");
if (fs.existsSync(partialsDir)) {
  fs.readdirSync(partialsDir).forEach((file) => {
    if (file.endsWith(".xian")) {
      const partialName = file.replace(".xian", "");
      const content = fs.readFileSync(path.join(partialsDir, file), "utf8");
      hbs.registerPartial(partialName, content);
    }
  });
}

/* ──────────────────────────────
   REGISTER HELPERS
────────────────────────────── */
// Comparison helper — supports both:
//   {{#ifCond a b}} (direct equality)
//   {{#ifCond a '===' b}}, {{#ifCond a '>' b}}, etc.
hbs.registerHelper("ifCond", function (v1, operator, v2, options) {
  // If called with 2 args: {{#ifCond a b}} — treat as equality
  if (options === undefined) {
    options = v2;
    v2 = operator;
    operator = "===";
  }
  let result;
  switch (operator) {
    case "===": result = v1 === v2; break;
    case "!==": result = v1 !== v2; break;
    case "<":   result = v1 < v2;   break;
    case "<=":  result = v1 <= v2;  break;
    case ">":   result = v1 > v2;   break;
    case ">=":  result = v1 >= v2;  break;
    default:    result = v1 === v2;
  }
  return result ? options.fn(this) : options.inverse(this);
});

// Equality helper for use with #if
hbs.registerHelper("eq", function (a, b, options) {
  if (a === b) return options.fn(this);
  return options.inverse(this);
});

// Greater than helper (returns boolean for use in conditionals)
hbs.registerHelper("gt", function (a, b) {
  return a > b;
});

// Date formatting helper
hbs.registerHelper("formatDate", function (date, format) {
  if (!date) return "";
  const fmt = typeof format === "string" ? format : "MMMM Do YYYY";
  const m = moment(date);
  return m.isValid() ? m.format(fmt) : "";
});

// Substring helper (used in navbar for avatar initials)
hbs.registerHelper("substring", function (str, start, end) {
  if (!str) return "";
  return String(str).substring(start, end);
});

// JSON helper (used to pass server data to client-side JS)
hbs.registerHelper("json", function (context) {
  return JSON.stringify(context || []);
});

// Math helpers for analytics calculations
hbs.registerHelper("plus", function (a, b) {
  return a + b;
});

hbs.registerHelper("minus", function (a, b) {
  return a - b;
});

hbs.registerHelper("subtract", function (a, b) {
  return a - b;
});

hbs.registerHelper("multiply", function (a, b) {
  return Math.round(a * b);
});

hbs.registerHelper("divide", function (a, b) {
  return b !== 0 ? a / b : 0;
});

/* ──────────────────────────────
   GLOBAL VARIABLES
────────────────────────────── */
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.user = req.session.user || null;
  next();
});
  
/* ──────────────────────────────
   ROUTES
────────────────────────────── */
app.use("/", router);
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/api", eventFeedRoutes);
app.use("/api", calendarRoutes);
app.use("/notifications", notificationRoutes);
app.use("/debug", debugRoutes);

/* ──────────────────────────────
   DATABASE SYNC & MIGRATION
────────────────────────────── */
(async () => {
  try {
    // Simply sync all models - Sequelize will create tables as needed
    await sequelize.sync({ alter: false, force: false });
    console.log("✅ Database ready!");
  } catch (err) {
    // Database sync errors are non-critical for local Laragon
    // App will still work and create tables on-demand
    if (err.message && err.message.includes("offset")) {
      console.log("⚠️  SOLUTION: Switch to local MySQL via Cloudflare Tunnel");
      console.log("   See CLOUDFLARE_TUNNEL_SETUP.md for instructions");
    } else {
      console.log("⚠️  Database sync note:", err.message.substring(0, 50));
    }
  }
})();

/* ──────────────────────────────
   ERROR HANDLER
────────────────────────────── */
app.use((err, req, res, next) => {
  console.error("❌ UNHANDLED ERROR:", err.message);
  console.error("   Stack:", err.stack);
  console.error("   URL:", req.url);
  res.status(500).send(`Something went wrong! <br><pre>${err.message}</pre>`);
});

/* ──────────────────────────────
   START SERVER
────────────────────────────── */
app.listen(PORT, () =>
  console.log(`🔥 Server running at http://localhost:${PORT}`)
);

export default app;
