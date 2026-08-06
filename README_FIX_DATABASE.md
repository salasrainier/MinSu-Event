# 🚀 Database Fix: Switching from Aiven to Local Laragon

## The Problem
Aiven MySQL has a critical bug that causes:
```
The value of "offset" is out of range. It must be >= 0 and <= 5. Received 9
```

This happens at connection initialization and blocks ALL queries. No workaround has worked because it's an Aiven infrastructure issue.

## The Solution
Use your **local Laragon MySQL** instead, exposed to the internet via **Cloudflare Tunnel** so Render can access it.

---

## ✅ What I've Already Done

Updated 3 files:
- `.env` → points to `localhost:3306` instead of Aiven
- `models/db.js` → added connection pooling + better error handling
- `index.js` → more helpful error messages

Created helper scripts:
- `START_LOCAL.bat` → run app locally with Laragon
- `START_TUNNEL.ps1` → expose local MySQL to internet via Cloudflare Tunnel
- `CLOUDFLARE_TUNNEL_SETUP.md` → detailed setup instructions
- `NEXT_STEPS_LOCAL_DB.md` → complete action plan

---

## 📋 Your Action Plan

### Step 1: Test Locally (Optional but Recommended)

Run your app locally to confirm it works with Laragon:

```bash
npm run dev
```

Visit `http://localhost:3000` and try registering a new account.

**Expected:** Registration should work without the offset error.

---

### Step 2: Set Up Cloudflare Tunnel

This exposes your local MySQL to the internet so Render can access it.

1. **Download cloudflared**
   - Visit: https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/install-and-setup/
   - Download the Windows executable
   - Extract to a folder like `C:\cloudflared\`

2. **Run the tunnel script**
   - Edit `START_TUNNEL.ps1` in this project
   - Change the `$CloudflaredPath` variable to match your cloudflared location
   - Right-click `START_TUNNEL.ps1` → Run with PowerShell
   - Keep this PowerShell window OPEN

3. **Get the tunnel URL**
   - You'll see output like:
   ```
   tcp://xxxxx-abcde-fghij.trycloudflare.com:XXXXX -> 127.0.0.1:3306
   ```
   - Copy the **host** and **port** numbers

4. **Tell the agent the tunnel URL**
   - Format: `Host: xxxxx-abcde-fghij.trycloudflare.com, Port: XXXXX`
   - The agent will update your Render environment variables

---

### Step 3: Deploy to Render

Once the tunnel is set up and agent updates Render:

1. Visit `https://minsu-event.onrender.com`
2. Try registering a new account
3. If it works, the database is connected! 🎉

---

### Step 4: Import Legacy Data (After Connection Works)

Once registration works on Render, we'll import your old database:

File location: `C:\Users\salas\Downloads\content_event_system (1).sql`

Users to import:
- rainiersalas@gmail.com (participant)
- rain@gmail.com (participant)
- john@gmail.com (organizer)
- participant@test.com (participant)
- organizer@test.com (organizer)
- admin@msu.edu (admin)

---

## 🔧 Credentials Reference

**Local Laragon MySQL:**
```
Host: localhost
Port: 3306
User: root
Password: (empty)
Database: content_event_system
```

**After Tunnel Setup:**
```
Host: <tunnel-host>.trycloudflare.com
Port: <tunnel-port>
User: root
Password: (empty)
Database: content_event_system
```

**Render App:**
```
URL: https://minsu-event.onrender.com
```

---

## ❓ Troubleshooting

**Tunnel not working?**
- Make sure Laragon MySQL is running
- Check Task Manager for `mysql` or `mariadb` process
- Keep the PowerShell tunnel window OPEN

**Registration still fails after tunnel?**
- Check Render logs for connection errors
- Verify tunnel is still running (check PowerShell window)
- Restart tunnel if needed

**Local test works but Render fails?**
- Tunnel may have disconnected
- Verify tunnel URL is correct in Render environment variables
- Restart the tunnel

---

## 📝 Files Changed

| File | Status | Notes |
|------|--------|-------|
| `.env` | ✅ Updated | Points to `localhost:3306` |
| `models/db.js` | ✅ Updated | Better pooling + error handling |
| `index.js` | ✅ Updated | Helpful error messages |
| `START_LOCAL.bat` | ✅ Created | Run local dev server |
| `START_TUNNEL.ps1` | ✅ Created | Expose local MySQL to internet |
| `CLOUDFLARE_TUNNEL_SETUP.md` | ✅ Created | Detailed tunnel setup |
| `NEXT_STEPS_LOCAL_DB.md` | ✅ Created | Complete action plan |

---

## 🎯 Summary

1. Download cloudflared
2. Run `START_TUNNEL.ps1` (keep it open)
3. Get tunnel URL from PowerShell output
4. Tell agent the tunnel URL
5. Agent updates Render environment
6. Test on Render: `https://minsu-event.onrender.com`
7. Register a new account to confirm it works
8. (Optional) Import legacy database

**Next:** Set up the Cloudflare Tunnel and provide the URL!
