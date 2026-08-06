# NEXT STEPS: Switch to Local Laragon MySQL

## What I Just Did
✅ Updated `.env` to point to your **local Laragon MySQL** (`localhost:3306`)
✅ Updated `models/db.js` with better connection pooling
✅ Made `index.js` more resilient to database errors
✅ Your Laragon MySQL is already running (verified)

## Your Laragon Default Credentials
```
Host: localhost
Port: 3306
User: root
Password: (empty)
Database: content_event_system
```

## Test Locally First
Before deploying, test locally:

```bash
npm run dev
```

Then try registering on `http://localhost:3000` with any new account.

If this works locally, you're good to deploy!

---

## Deploy to Render (Free Tier)

Once local testing works, you need to expose your local MySQL to the internet so Render can access it.

### Option A: Cloudflare Tunnel (Recommended - Free)

1. **Download cloudflared**
   - Go to: https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/install-and-setup/
   - Download for Windows

2. **Start the tunnel** (keep this PowerShell window OPEN while using the app)
   ```powershell
   # From directory where you extracted cloudflared.exe
   .\cloudflared.exe tunnel --url tcp://127.0.0.1:3306
   ```

3. **You'll see output like:**
   ```
   Your quick tunnel has been created!
   tcp://xxxxx-xxxxx-xxxxx.trycloudflare.com:XXXXX -> 127.0.0.1:3306
   ```
   
   Copy the **host** and **port** from this output.

4. **Tell me the tunnel URL**
   Provide the tunnel host and port to the agent, and I'll update Render.

### Option B: Ngrok (Paid after free credits)
- You had auth token issues before, so we skipped this

---

## Data Import After Connection Works

Once your local database is connected to Render, we can import your legacy data:

**Your legacy database users:**
- rainiersalas@gmail.com (participant)
- rain@gmail.com (participant)
- john@gmail.com (organizer)
- participant@test.com (participant)
- organizer@test.com (organizer)
- admin@msu.edu (admin)

Location: `C:\Users\salas\Downloads\content_event_system (1).sql`

We'll import this after confirming the tunnel connection works.

---

## Summary of Changes

| File | Change |
|------|--------|
| `.env` | Now points to `localhost:3306` instead of Aiven |
| `models/db.js` | Added connection pooling + better error handling |
| `index.js` | More helpful error messages for offset issues |
| New file | `CLOUDFLARE_TUNNEL_SETUP.md` - tunnel instructions |

All committed and ready to push to GitHub.

---

## Quick Commands

```bash
# Test locally
npm run dev

# Push to GitHub
git add .
git commit -m "Switch to local Laragon MySQL"
git push

# Check Render status
# Visit: https://minsu-event.onrender.com
```

Next: Set up Cloudflare Tunnel and provide the tunnel URL!
