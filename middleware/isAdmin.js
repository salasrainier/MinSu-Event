export const isLoggedIn = (req, res, next) => {
  console.log(`\n🔐 isLoggedIn Middleware - ${req.path}`);
  console.log(`   Session ID: ${req.sessionID}`);
  console.log(`   Session User:`, req.session.user);
  
  if (!req.session.user) {
    console.log(`   ❌ Not logged in, redirecting to /auth/login`);
    return res.redirect("/auth/login");
  }
  
  console.log(`   ✅ User logged in as: ${req.session.user.name}`);
  next();
};

export const isAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login"); // not logged in → go login
  }

  if (req.session.user.role !== "admin") {
    return res.status(403).send("⛔ Access Denied: Admins Only");
  }

  next(); // ✅ allow admin
};
