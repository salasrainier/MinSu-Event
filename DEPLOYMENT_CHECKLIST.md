# Deployment Checklist ✅

## Code Pushed ✅
- [x] All models imported in index.js
- [x] Railway credentials in .env
- [x] GitHub secrets approved
- [x] Code pushed to main branch

## Render Deployment (Watch This)
- [ ] Go to https://dashboard.render.com
- [ ] Select "minsu-events" app
- [ ] Status should change from "In Progress" → "Live" (takes 2-5 minutes)
- [ ] Check Logs tab for:
  - `✅ Database synced!`
  - `🔥 Server running at http://localhost:3000`

## After Render is Live
- [ ] Visit: https://minsu-event.onrender.com
- [ ] Try login with: `participant@test.com`
- [ ] Expected: Either "Email not found" OR login works
- [ ] Expected: NOT "Table doesn't exist" error

## If Deployment Shows Errors

### Error: "Table doesn't exist"
**Solution**: 
1. Check all 6 models are imported in index.js
2. Check Render environment variables are set to Railway
3. Restart the app from dashboard

### Error: "Connection refused"
**Solution**:
1. Check Railway is running
2. Check DB credentials in Render dashboard
3. Verify DB_HOST is: sakura.proxy.rlwy.net

### Error: "Cannot find module"
**Solution**:
1. Check package.json has all dependencies
2. Run: npm install locally first
3. Commit package-lock.json

## Success Indicators ✅

If you see these, deployment was successful:
- [x] App loads at https://minsu-event.onrender.com
- [x] No "Table doesn't exist" errors
- [x] Login page functions
- [x] Can create account or log in
- [x] Database queries work

## Monitoring

Keep this tab open while deploying:
https://dashboard.render.com/

Watch for:
- Build progress
- Deployment status
- Real-time logs

---

**Timeline**: Code pushed → Render deploys (2-5 min) → Test (2 min) = ~10 min total
