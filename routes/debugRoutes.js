import express from "express";

const router = express.Router();

// Debug endpoint - show current session
router.get("/debug/session", (req, res) => {
  console.log("🔍 Session Debug:");
  console.log("   req.session:", req.session);
  console.log("   req.session.user:", req.session.user);
  console.log("   req.sessionID:", req.sessionID);
  
  res.json({
    session: req.session,
    user: req.session.user || null,
    sessionID: req.sessionID,
    cookies: req.headers.cookie
  });
});

export default router;
