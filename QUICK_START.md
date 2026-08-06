# ⚡ Quick Start - Local MySQL + Cloudflare Tunnel

## TL;DR - 3 Steps

### 1️⃣ Download Cloudflared
https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/install-and-setup/

Extract to: `C:\cloudflared\` (or any folder)

### 2️⃣ Run the Tunnel
Open PowerShell and execute:

```powershell
C:\cloudflared\cloudflared.exe tunnel --url tcp://127.0.0.1:3306
```

**Keep this window OPEN!**

### 3️⃣ Copy the Tunnel URL
Look for output like:
```
tcp://xxxxx-abcde-fghij.trycloudflare.com:XXXXX -> 127.0.0.1:3306
```

Tell the agent:
> "Tunnel host: xxxxx-abcde-fghij.trycloudflare.com, Port: XXXXX"

---

## Testing Locally (Optional)

Before deploying to Render, test on your machine:

```bash
npm run dev
```

Visit: `http://localhost:3000`

Try registering → should work without the offset error!

---

## After Agent Updates Render

Visit: `https://minsu-event.onrender.com`

Try registering → should work! 🎉

---

## Still Having Issues?

- **Tunnel won't start?** Check if cloudflared path is correct
- **Laragon not running?** Start Laragon first
- **Registration fails on Render?** Make sure tunnel is still running in PowerShell
- **Need more help?** See `README_FIX_DATABASE.md` for full details

---

## Database Credentials

**Your local Laragon:**
```
Host: localhost:3306
User: root
Password: (empty)
Database: content_event_system
```

**After tunnel is set up:**
```
Host: <tunnel-host>.trycloudflare.com:<port>
User: root
Password: (empty)
Database: content_event_system
```

---

**Files created:**
- `START_TUNNEL.ps1` - Run this to start tunnel
- `START_LOCAL.bat` - Run this to start local dev server
- `README_FIX_DATABASE.md` - Full setup guide
- `CLOUDFLARE_TUNNEL_SETUP.md` - Tunnel details

**Files updated:**
- `.env` - Now points to localhost:3306
- `models/db.js` - Better error handling
- `index.js` - Helpful messages

---

**Ready?** Start the tunnel! 🚀
