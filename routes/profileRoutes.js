import express from "express";
import { isLoggedIn } from "../middleware/isAdmin.js";
import { viewProfile, updateProfile, uploadProfilePicture, upload } from "../controllers/profileController.js";

const router = express.Router();

// Test endpoint
router.get("/profile/test", (req, res) => {
  res.json({ message: "Profile routes are working!", session: req.session.user });
});

// View profile page
router.get("/profile", isLoggedIn, viewProfile);

// Update profile information
router.post("/profile/update", isLoggedIn, updateProfile);

// Upload profile picture
router.post("/profile/upload-picture", isLoggedIn, upload.single('profile_picture'), uploadProfilePicture);

export default router;
