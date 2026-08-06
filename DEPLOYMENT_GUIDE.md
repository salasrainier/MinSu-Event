# MinSU Events — Deployment Guide
## Render + Aiven MySQL

---

## PART 1: SET UP AIVEN MYSQL DATABASE

### Step 1.1: Create Aiven Account
1. Go to **https://aiven.io**
2. Click **Sign Up** (top right)
3. Register with email and password
4. Verify your email
5. Log in to your Aiven dashboard

### Step 1.2: Create MySQL Service
1. Click **Create Service** (or + button)
2. Select **MySQL** from the database options
3. Choose these settings:
   - **Service Name:** `minsu-events-db` (or any name)
   - **Cloud Provider:** Choose closest to Philippines (Singapore or Tokyo recommended)
   - **Plan:** `Startup-2` (free tier, $12/month after trial)
   - **MySQL Version:** 8.0
4. Click **Create Service**
5. Wait 2-3 minutes for the service to start (you'll see a green checkmark)

### Step 1.3: Get Connection Details
1. Once service is running, click on it
2. Go to **Overview** tab
3. You'll see **Connection Details** — copy these values:
   ```
   Host: (something like "mysql-12abc.aivencloud.com")
   Port: (usually 21306 or 3306)
   Username: avnadmin
   Password: (shown here)
   Database: defaultdb
   ```
4. **Save these somewhere safe** — you'll need them later

### Step 1.4: Whitelist Render's IP (Optional)
1. In Aiven, on your MySQL service page, look for **Networking** in the left sidebar or scroll down on the Overview tab
2. Look for **IP Allow List** or **Connection security** option
3. Click **+ Add IP** or **Allow New IP**
4. For now, set to allow **0.0.0.0/0** (all IPs) to keep it simple
   - In production, you'd restrict to Render's specific IP range
5. Click **Save** or **Add**

**Note:** If you can't find a Security/Networking tab, Aiven may have this in a different location in the current UI. You can also skip this step — Aiven typically allows connections by default for most plans. If connection fails later, come back to this step.

**Your database is ready!** ✓

---

## PART 2: PREPARE YOUR PROJECT FOR RENDER

### Step 2.1: Create `.env` File (Local)
In your project root folder, create a file called `.env`:

```
PORT=3000
DB_HOST=your_aiven_host_here
DB_PORT=21306
DB_USER=avnadmin
DB_PASSWORD=your_aiven_password_here
DB_NAME=defaultdb
NODE_ENV=development
SECRET_KEY=your-secret-session-key-here
```

**Replace with your actual Aiven credentials.**

### Step 2.2: Verify `index.js` Uses Environment Variables
At the top of your `index.js`, make sure this exists:

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
```

### Step 2.3: Make Sure `dotenv` is Installed
Run in your terminal:
```bash
npm install dotenv
```

### Step 2.4: Verify `.gitignore` Includes `.env`
Create or update `.gitignore`:

```
node_modules/
.env
.DS_Store
uploads/
logs/
.vscode/
```

**Never commit `.env` to GitHub!**

### Step 2.5: Ensure `package.json` Has `start` Script
Your `package.json` should have:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

### Step 2.6: Push to GitHub
If not already on GitHub:

```bash
git init
git add .
git commit -m "Initial commit for Render deployment"
git remote add origin https://github.com/YOUR_USERNAME/minsu-events.git
git branch -M main
git push -u origin main
```

**Your project is ready!** ✓

---

## PART 3: DEPLOY TO RENDER

### Step 3.1: Create Render Account
1. Go to **https://render.com**
2. Click **Sign Up**
3. Choose **GitHub** as sign-up method (easiest)
4. Authorize Render to access your GitHub account

### Step 3.2: Create New Web Service
1. In Render dashboard, click **New +** (top right)
2. Select **Web Service**
3. Search for your GitHub repo: `minsu-events` (or your repo name)
4. Click **Connect** next to your repo

### Step 3.3: Configure Service
Fill in these settings:

- **Name:** `minsu-events` (or your service name)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- **Plan:** `Free` (or paid if needed)

### Step 3.4: Add Environment Variables
1. Scroll down to **Environment** section
2. Click **Add Environment Variable** for each:

```
PORT=3000
DB_HOST=your_aiven_host
DB_PORT=21306
DB_USER=avnadmin
DB_PASSWORD=your_aiven_password
DB_NAME=defaultdb
NODE_ENV=production
SECRET_KEY=generate-a-random-secret-key
```

**Generate a SECRET_KEY:** Run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3.5: Deploy
1. Scroll down, click **Create Web Service**
2. Render will start deploying (2-5 minutes)
3. Watch the logs in real-time
4. When it says **"Your service is live"**, you're done!
5. Your app URL will be shown (e.g., `https://minsu-events.onrender.com`)

**Your app is now live!** ✓

---

## PART 4: VERIFY EVERYTHING WORKS

### Step 4.1: Test the Connection
1. Go to your Render URL (e.g., `https://minsu-events.onrender.com`)
2. Try logging in with test credentials
3. If you see the login page, it worked!
4. If there are database errors:
   - Check Aiven host/port/credentials are correct
   - Verify Aiven IP whitelist includes all IPs (0.0.0.0/0)
   - Ensure database tables exist

### Step 4.2: Check Logs
In Render dashboard:
1. Click your service
2. Click **"Logs"** tab
3. Look for errors (red text)
4. If all green, you're good!

### Step 4.3: Monitor in Aiven
In Aiven dashboard:
- Check **Connections** tab for active connections
- Monitor **Metrics** for CPU/memory usage
- Review **Logs** if there are issues

---

## PART 5: ONGOING MAINTENANCE

### Auto-Redeploy on GitHub Push
Render automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Backup Your Database
In Aiven:
1. Go to **Backups** tab
2. Automatic backups are enabled by default
3. You can also take manual snapshots

---

## PART 6: COMMON ISSUES & FIXES

### "Connection Refused" or "Cannot Connect to Database"
- Verify Aiven credentials in Render env variables
- Check Aiven IP whitelist (should include 0.0.0.0/0)
- Verify port is 21306 (not 3306)
- Ensure Aiven service is running (green status)

### "ENOTFOUND" or "Unknown Host"
- Make sure host includes `.aivencloud.com`
- Copy the exact host from Aiven, don't type manually

### "502 Bad Gateway"
- Check Render logs for errors
- Make sure `npm install` and `node index.js` work locally
- Verify all packages are in `package.json`
- Restart the service in Render

### "Something went wrong" on App
- Check Render logs for database connection errors
- Verify all env variables are set correctly
- Make sure database migrations ran

---

## PART 7: CUSTOM DOMAIN (OPTIONAL)

To use your own domain instead of `minsu-events.onrender.com`:

1. In Render dashboard, go to your service
2. Click **Settings** → **Custom Domain**
3. Add your domain (e.g., `events.msu.edu.ph`)
4. Update your domain registrar's DNS records
5. Render will provide the exact DNS values

---

## CHECKLIST

- [ ] Created Aiven MySQL service
- [ ] Got connection details (host, port, user, password)
- [ ] Created `.env` file locally
- [ ] Updated `index.js` to use `dotenv`
- [ ] Installed `dotenv` package
- [ ] Created `.gitignore` file
- [ ] Pushed code to GitHub
- [ ] Created Render account
- [ ] Connected GitHub repo to Render
- [ ] Added environment variables to Render
- [ ] Deployed web service
- [ ] Tested the live app
- [ ] Verified database connection works

**Congratulations! Your app is now live on Render with Aiven MySQL!** 🎉

---

### Useful Links
- Aiven Console: https://console.aiven.io
- Render Dashboard: https://dashboard.render.com
- Render Docs: https://render.com/docs
- Aiven Docs: https://aiven.io/docs

