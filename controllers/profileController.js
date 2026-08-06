import multer from "multer";
import path from "path";
import fs from "fs";
import { User } from "../models/userModel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure upload folder exists
const uploadDir = path.join(__dirname, "../public/uploads/profiles");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer config for profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `profile_${Date.now()}_${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

export const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// View profile page
export const viewProfile = async (req, res) => {
  try {
    res.render("profile", {
      title: "My Profile",
      user: req.session.user,
      currentPage: "profile",
      success_msg: req.flash("success_msg"),
      error_msg: req.flash("error_msg"),
    });
  } catch (error) {
    console.error("Profile view error:", error);
    req.flash("error_msg", "Failed to load profile");
    res.redirect("/");
  }
};

// Update profile information
export const updateProfile = async (req, res) => {
  console.log('\n🔥 UPDATE PROFILE ROUTE HIT!');
  console.log('Session:', req.session);
  console.log('Body:', req.body);
  
  try {
    if (!req.session || !req.session.user) {
      console.log('❌ No session or user found!');
      req.flash("error_msg", "Session expired. Please login again.");
      return res.redirect("/login");
    }

    const { name, email, department } = req.body;
    // Handle both id and user_id in session
    const userId = req.session.user.user_id || req.session.user.id;

    console.log(`\n📝 Updating profile for user ${userId}`);
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Department: ${department}`);
    console.log(`   Request body:`, req.body);

    // Check if email is already taken by another user
    const existingUser = await User.findOne({
      where: { email: email }
    });

    if (existingUser && existingUser.user_id !== userId) {
      req.flash("error_msg", "Email is already taken by another user");
      return res.redirect("/profile");
    }

    // Update user
    const [updateCount] = await User.update(
      { name, email, department },
      { where: { user_id: userId } }
    );

    console.log(`   📊 Rows updated: ${updateCount}`);

    // Update session
    req.session.user.name = name;
    req.session.user.email = email;
    req.session.user.department = department;

    // Save session explicitly
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    console.log(`✅ Profile updated successfully`);
    console.log(`   Session updated:`, req.session.user);
    req.flash("success_msg", "Profile updated successfully!");
    res.redirect("/profile");
  } catch (error) {
    console.error("❌ Profile update error:", error);
    req.flash("error_msg", "Failed to update profile: " + error.message);
    res.redirect("/profile");
  }
};

// Upload profile picture
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      req.flash("error_msg", "Please select an image file");
      return res.redirect("/profile");
    }

    // Handle both id and user_id in session
    const userId = req.session.user.user_id || req.session.user.id;
    const profilePicturePath = `/uploads/profiles/${req.file.filename}`;

    console.log(`\n📸 Uploading profile picture for user ${userId}`);
    console.log(`   File: ${req.file.filename}`);
    console.log(`   Path: ${profilePicturePath}`);

    // Get old profile picture to delete it
    const user = await User.findOne({ where: { user_id: userId } });
    const oldPicture = user.profile_picture;

    // Update user profile picture
    await User.update(
      { profile_picture: profilePicturePath },
      { where: { user_id: userId } }
    );

    // Update session
    req.session.user.profile_picture = profilePicturePath;

    // Delete old profile picture if it exists
    if (oldPicture && oldPicture.startsWith('/uploads/profiles/')) {
      const oldPath = path.join(__dirname, '../public', oldPicture);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log(`   🗑️ Deleted old picture: ${oldPicture}`);
      }
    }

    console.log(`✅ Profile picture uploaded successfully`);
    req.flash("success_msg", "Profile picture updated successfully!");
    res.redirect("/profile");
  } catch (error) {
    console.error("Profile picture upload error:", error);
    req.flash("error_msg", "Failed to upload profile picture");
    res.redirect("/profile");
  }
};
