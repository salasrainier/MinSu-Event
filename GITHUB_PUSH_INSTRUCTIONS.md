# 🚀 Push to GitHub - Instructions

Your code is ready to push to GitHub! Follow these steps:

## Step 1: Create GitHub Repository

1. Go to **https://github.com/new**
2. Create a new repository with these settings:
   - **Repository name:** `minsu-events`
   - **Description:** `Web-Based Event Management System for Mindoro State University`
   - **Visibility:** Choose `Public` (recommended for Render deployment)
   - **Initialize repository:** Leave unchecked (we already have files)
3. Click **Create repository**

## Step 2: Add Remote and Push

After creating the repository, GitHub will show you commands to run. Copy your repository URL (should look like: `https://github.com/YOUR_USERNAME/minsu-events.git`)

Then run these commands in PowerShell:

```powershell
$env:Path += ";C:\Program Files\Git\cmd"
cd "C:\Users\salas\OneDrive\Desktop\content_event_system"
git remote add origin https://github.com/YOUR_USERNAME/minsu-events.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 3: Verify Push

1. Go to your GitHub repository URL
2. You should see all your files there
3. Confirm that `.env` is NOT visible (it's in `.gitignore`)

---

## What Gets Pushed?

✅ **WILL be pushed:**
- All source code files
- `package.json`, `package-lock.json`
- Routes, controllers, models, views
- Configuration files
- Documentation files

❌ **WILL NOT be pushed (protected by `.gitignore`):**
- `.env` (database credentials are safe!)
- `node_modules/`
- `.DS_Store`
- Logs

---

## Next: Create Render Account

Once your code is on GitHub, we'll:
1. Create a Render account
2. Connect your GitHub repository
3. Deploy the app with environment variables

---

## Troubleshooting

**Error: "fatal: could not read User Password"**
- GitHub requires authentication tokens now
- Go to https://github.com/settings/tokens
- Create a "Personal Access Token" with `repo` permissions
- Use the token as password when pushing

**Error: "fatal: reference is not a tree"**
- Run: `git branch -M main`
- Then: `git push -u origin main`

---

Let me know when your repository is on GitHub! Then we can proceed to Render deployment. 🎉
