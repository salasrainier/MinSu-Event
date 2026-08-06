# MinSU Events - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Start the Server
```bash
cd c:\Users\salas\content_event_system
npm run xian
```
Server runs at: **http://localhost:3000**

### Step 2: Access the System

#### As a Regular User (Event Organizer)
1. Go to http://localhost:3000/auth/register
2. Create account with your details
3. Fill out event submission form
4. View your events in dashboard
5. Check notifications for approvals

#### As an Admin
1. Login with admin credentials
2. Go to /admin/dashboard
3. Review pending events
4. Approve or deny submissions
5. Check analytics dashboard

### Step 3: Key Pages to Visit

| Page | URL | Purpose |
|------|-----|---------|
| Home | http://localhost:3000/ | System overview |
| Login | http://localhost:3000/auth/login | User authentication |
| Register | http://localhost:3000/auth/register | New account creation |
| Dashboard | http://localhost:3000/dashboard | User event management |
| Submit Event | http://localhost:3000/submit-event | Create new event |
| Calendar | http://localhost:3000/calendar | View all events |
| Notifications | http://localhost:3000/notifications | Status updates |
| Admin Panel | http://localhost:3000/admin/dashboard | Event approvals |
| Analytics | http://localhost:3000/admin/analytics | System statistics |

## 🎨 MinSU Branding

The system uses the Mindoro State University color palette:
- **Green** - Primary brand color
- **White** - Clean backgrounds
- **Yellow** - Accent highlights
- **Brown** - Subtle accents (optional)

## 📋 Main Features

### 1. Event Submission ✨
- Fill out comprehensive event form
- Upload supporting documents
- Get instant confirmation

### 2. Admin Approval 🎯
- Review pending events
- Quick approve/deny buttons
- Add remarks for feedback

### 3. Event Calendar 📅
- Browse all events by month
- Search and filter events
- Export results to CSV

### 4. Notifications 🔔
- Real-time status updates
- Manage notification preferences
- View complete history

### 5. Analytics 📊
- Total events managed
- Department statistics
- Monthly trends
- User engagement metrics

## 🔐 Login Credentials

### Test User (Organizer)
- Email: `demo@example.com`
- Password: `password`

### Test Admin
- Email: `admin@minsu.edu`
- Password: `adminpass`

## 📁 Project Structure

```
/views
  ├── home.xian              ← Landing page
  ├── login.xian             ← User login
  ├── register.xian          ← User registration
  ├── dashboard.xian         ← User dashboard
  ├── submit_event.xian      ← Event form
  ├── calendar.xian          ← Event calendar
  ├── notifications.xian     ← Notifications
  ├── dashboard_admin.xian   ← Admin panel
  ├── analytics.xian         ← Analytics
  └── partials/
      ├── head.xian          ← Global styles
      └── footer.xian        ← Footer

/controllers
  ├── authController.js      ← Authentication
  ├── eventrequestController.js ← Event management
  └── notificationController.js ← Notifications

/models
  ├── db.js                  ← Database config
  ├── userModel.js           ← User schema
  └── Eventrequest.js        ← Event schema

/routes
  ├── index.js               ← Main routes
  ├── authRoutes.js          ← Auth endpoints
  └── apiRoutes.js           ← API endpoints

index.js                      ← Server entry point
```

## 🔧 Common Tasks

### Task: Change System Name
1. Edit `views/home.xian` - change "MinSU Events" text
2. Edit `views/login.xian` - update login header
3. Edit `views/partials/footer.xian` - update footer

### Task: Change Colors
1. Edit `views/partials/head.xian`
2. Find color classes: `from-green-700`, `bg-yellow-400`
3. Replace with desired Tailwind colors

### Task: Add New Event Field
1. Edit `models/Eventrequest.js` - add field to schema
2. Edit `views/submit_event.xian` - add form input
3. Edit `controllers/eventrequestController.js` - handle field
4. Restart server

### Task: Send Notifications
Email functionality is ready to integrate:
1. Configure email service (Gmail, SendGrid, etc.)
2. Update `controllers/notificationController.js`
3. Add email templates
4. Test notification flow

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
# Kill the process and restart
taskkill /F /IM node.exe
npm run xian
```

### Database connection error
- Verify MySQL is running
- Check credentials in `models/db.js`
- Ensure database exists

### Page shows blank/error
- Check browser console for errors (F12)
- Verify server is running
- Clear browser cache

### File upload not working
- Check `/public/uploads/` folder exists
- Verify file size < 5MB
- Check file type restrictions

## 📊 Database Setup

### First Time Setup
```bash
# Server automatically syncs database
# Tables created: Users, EventRequests
# Indexes created automatically
```

### Reset Database
```bash
# Option 1: Delete and restart (auto-sync)
# Option 2: Manual SQL reset in MySQL Workbench
```

## 🚀 Production Deployment

### Before Going Live
1. Update database credentials
2. Set secure session secret in `index.js`
3. Enable HTTPS/SSL
4. Configure email notifications
5. Set up database backups
6. Configure firewall/security
7. Test all workflows thoroughly

### Recommended Hosting
- **Server**: AWS EC2, DigitalOcean, Heroku
- **Database**: AWS RDS, DigitalOcean Managed DB
- **Storage**: AWS S3, DigitalOcean Spaces
- **Email**: SendGrid, AWS SES

## 📞 Support

### Documentation Files
- **README.md** - Complete documentation
- **IMPLEMENTATION.md** - Customization guide
- **QUICKSTART.md** - This file

### Getting Help
1. Check README.md and IMPLEMENTATION.md
2. Review code comments in controllers
3. Check browser console for errors
4. Review server terminal output

## 🎓 Learning Path

### Beginner
1. Explore the home page
2. Create a test account
3. Submit a test event
4. Login as admin and approve it

### Intermediate
1. Review database schema
2. Understand event workflow
3. Explore API endpoints
4. Check notification system

### Advanced
1. Customize controllers
2. Add new features
3. Integrate external services
4. Deploy to production

## 📈 Next Steps

1. **Explore** - Visit all pages and test features
2. **Customize** - Adjust colors, text, and branding
3. **Extend** - Add new features as needed
4. **Deploy** - Move to production environment
5. **Monitor** - Track usage and performance

---

**MinSU Events** - Professional Event Management for Mindoro State University

Happy event managing! 🎉
