import express from "express";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import router from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";
import fs from "fs";
import hbs from "hbs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { sequelize } from "./models/db.js";
import moment from "moment";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

console.log("App created");

app.use(express.json());
console.log("JSON middleware added");

app.use(express.urlencoded({ extended: true }));
console.log("urlencoded middleware added");

app.use(express.static(path.join(__dirname, "public")));
console.log("static middleware added");

app.use(
  session({
    secret: "xianfire-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);
console.log("session middleware added");

app.use(flash());
console.log("flash middleware added");

app.engine("xian", hbs.__express);
console.log("hbs engine set");

app.set("view engine", "xian");
app.set("views", path.join(__dirname, "views"));
console.log("views configured");

const partialsDir = path.join(__dirname, "views", "partials");
console.log("Partials dir:", partialsDir);

if (fs.existsSync(partialsDir)) {
  console.log("Partials directory exists");
  fs.readdirSync(partialsDir).forEach((file) => {
    if (file.endsWith(".xian")) {
      const partialName = file.replace(".xian", "");
      const content = fs.readFileSync(path.join(partialsDir, file), "utf8");
      hbs.registerPartial(partialName, content);
      console.log("Registered partial:", partialName);
    }
  });
} else {
  console.log("Partials directory does not exist");
}

console.log("About to register helpers");

hbs.registerHelper("ifCond", function (v1, v2, options) {
  if (v1 === v2) return options.fn(this);
  return options.inverse(this);
});
console.log("ifCond helper registered");

hbs.registerHelper("eq", (a, b) => a === b);
console.log("eq helper registered");

hbs.registerHelper("formatDate", function (date, format) {
  if (!date) return "";
  const fmt = typeof format === "string" ? format : "MMMM Do YYYY";
  const m = moment(date);
  return m.isValid() ? m.format(fmt) : "";
});
console.log("formatDate helper registered");

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.user = req.session.user || null;
  next();
});
console.log("Global middleware added");

app.use("/", router);
console.log("Main routes added");

app.use("/auth", authRoutes);
console.log("Auth routes added");

console.log("About to sync database");

sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Database synced!"))
  .catch((err) => console.error("❌ DB sync error:", err));

console.log("Database sync initiated");

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});
console.log("Error handler added");

console.log("Starting server...");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🔥 Server running at http://localhost:${PORT}`)
);
