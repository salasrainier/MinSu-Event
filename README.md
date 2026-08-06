# MinSU Events - Mindoro State University Event Management System

## Overview

**MinSU Events** is a professional event management platform built specifically for Mindoro State University. It streamlines the process of submitting, reviewing, and approving university events while providing comprehensive analytics and notifications.

### Key Features

- ✅ **Event Submission** - Easy-to-use forms for submitting event proposals
- ✅ **Admin Approval Dashboard** - Streamlined review and approval workflow
- ✅ **Event Calendar** - Interactive calendar view of all university events
- ✅ **Real-Time Notifications** - Stay updated on event status changes
- ✅ **Analytics Dashboard** - Comprehensive statistics and insights
- ✅ **Export to CSV** - Download event data for reporting
- ✅ **Role-Based Access** - Secure access control (Organizer, Admin)
- ✅ **Document Management** - Upload and store event proposals

## Technology Stack

- **Backend**: Express.js (Node.js)
- **Database**: MySQL with Sequelize ORM
- **View Engine**: Handlebars (Custom .xian extension)
- **Frontend**: Tailwind CSS
- **Authentication**: Express-session with bcrypt
- **File Upload**: Multer
- **Session Management**: Express-session (1-hour timeout)

## Project Structure

```
content_event_system/
├── controllers/
│   ├── authController.js          # Login, Register, Logout
│   ├── eventrequestController.js  # Event management logic
│   └── notificationController.js  # Notification system
├── models/
│   ├── db.js                      # Database connection
│   ├── userModel.js               # User schema
│   └── Eventrequest.js            # Event request schema
├── routes/
│   ├── index.js                   # Main routes
│   ├── authRoutes.js              # Authentication routes
│   └── apiRoutes.js               # API endpoints
├── middleware/
│   └── isAdmin.js                 # Authentication middleware
├── views/
│   ├── home.xian                  # Landing page
│   ├── login.xian                 # Login page
│   ├── register.xian              # Registration page
│   ├── dashboard.xian             # User dashboard
│   ├── dashboard_admin.xian       # Admin approval panel
│   ├── submit_event.xian          # Event submission form
│   ├── calendar.xian              # Event calendar
│   ├── notifications.xian         # Notifications page
│   ├── analytics.xian             # Admin analytics
│   └── partials/
│       ├── head.xian              # Global styles & animations
│       └── footer.xian            # Footer component
├── public/
│   ├── tailwind.css               # Tailwind styles
│   └── uploads/                   # Event files storage
├── index.js                       # Server entry point
├── package.json                   # Dependencies
└── README.md                      # This file

```

## Installation & Setup

### Prerequisites

- Node.js v24.11.0+
- MySQL database
- npm package manager

### Installation Steps

1. **Clone/Extract the project**
```bash
cd c:\Users\salas\content_event_system
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure database** (in `models/db.js`):
```javascript
const sequelize = new Sequelize('content_event_system', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
```

4. **Start the server**
```bash
npm run xian
```

Server will run at `http://localhost:3000`

## Database Schema

### Users Table
```sql
- user_id (PK)
- name
- email (unique)
- password (bcrypted)
- role (user/admin)
- department
- contact_number
- profile_picture
- createdAt, updatedAt
```

### EventRequests Table
```sql
- id (PK)
- organizer_name
- event_title
- department
- event_date
- venue
- purpose
- proposal_file
- status (pending/approved/denied)
- remarks
- user_id (FK)
- createdAt, updatedAt
```

## User Roles

### 1. **Organizer (Regular User)**
- Submit new event proposals
- View personal dashboard with event status
- Access calendar to see all events
- Receive notifications on approvals/denials
- Export event data to CSV

### 2. **Admin**
- Access admin dashboard to review pending events
- Approve or deny event submissions
- View system analytics and statistics
- Manage all users and events
- Export comprehensive reports

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - New user registration
- `GET /auth/logout` - User logout

### Events
- `GET /dashboard` - User event dashboard
- `POST /submit-event` - Submit new event
- `GET /admin/dashboard` - Admin approval panel
- `GET /admin/analytics` - System analytics

### Calendar & Search
- `GET /calendar` - Event calendar view
- `GET /api/events` - Fetch user events (JSON)
- `GET /api/search` - Search events with filters
- `GET /api/export-csv` - Export events to CSV

### Notifications
- `GET /notifications` - View notifications
- `GET /api/stats` - Get dashboard statistics

## Color Palette - MinSU Brand

- **Primary Green**: `#15803d` (Green-700)
- **Secondary Green**: `#059669` (Emerald-600)
- **Accent Yellow**: `#facc15` (Yellow-400)
- **White**: `#ffffff`
- **Gray**: `#6b7280` (Text)
- **Brown** (subtle borders): Used in accents

## Key Features Explained

### 1. Event Submission
Users fill out a comprehensive form with:
- Organizer details
- Event title and description
- Date, time, and venue
- Department classification
- File upload for proposals

### 2. Admin Approval Workflow
- View all pending submissions
- Quick approve/deny buttons
- Real-time status updates
- Admin remarks for feedback

### 3. Event Calendar
- Interactive monthly calendar
- Color-coded event status
- Search and filter capabilities
- Export filtered results

### 4. Analytics Dashboard
- Total events managed
- Approval statistics
- Department breakdown
- Monthly trends
- User engagement metrics

### 5. Notifications System
- Status change notifications
- Email integration ready
- Notification preferences
- Activity history

## Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **Session Management**: Secure session with 1-hour timeout
- **Role-Based Access**: Admin middleware verification
- **CSRF Protection**: Via session tokens
- **Input Validation**: Server-side validation on all inputs
- **File Upload Safety**: Whitelist accepted file types

## Error Handling

The system includes comprehensive error handling:
- Database errors caught and logged
- Flash messages for user feedback
- Graceful error pages
- Detailed console logging for debugging

## Performance Optimizations

- Sequelize query optimization
- Indexed database columns
- Static file caching
- CSS/JS minification ready
- Responsive design for all devices

## Testing the System

### Test Credentials
- **Demo User**: demo@example.com / password
- **Admin User**: admin@minsu.edu / adminpass

### Test Workflows

1. **User Registration & Login**
   - Register new account
   - Login and access dashboard
   - Logout and verify session

2. **Event Submission**
   - Submit new event from dashboard
   - Upload proposal document
   - Verify success notification

3. **Admin Approval**
   - Login as admin
   - View pending events
   - Approve/deny with remarks
   - Check analytics dashboard

4. **Calendar & Notifications**
   - View calendar with events
   - Check notification count
   - Export events to CSV

## Common Issues & Solutions

### Port Already in Use
```bash
taskkill /F /IM node.exe  # Windows
# or
lsof -ti:3000 | xargs kill -9  # Mac/Linux
```

### Database Connection Error
- Verify MySQL is running
- Check credentials in `models/db.js`
- Ensure database exists

### File Upload Issues
- Check `/public/uploads/` permissions
- Verify file size limits
- Ensure file types are allowed

## Future Enhancements

- [ ] Email notifications integration
- [ ] SMS alerts for admins
- [ ] Multi-file upload support
- [ ] Event cancellation system
- [ ] Participant RSVPs
- [ ] Event feedback surveys
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Advanced reporting
- [ ] Integration with university systems

## Contributing

To contribute to MinSU Events:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit pull request

## Support

For issues, bugs, or feature requests:
- Email: support@minsu-events.edu
- Contact: IT Department, Mindoro State University

## License

© 2025 Mindoro State University. All rights reserved.

## Version History

- **v1.0.0** (November 2025) - Initial release
  - Core event management features
  - Admin approval workflow
  - Calendar and notifications
  - Analytics dashboard
  - MinSU branding implementation

---

**MinSU Events** - Empowering the Mindoro State University Community
