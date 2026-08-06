# New Features Added ✨

## 1. Student/Participant Details in Registration

### What's New:
- Registration form now collects **Course** and **Year Level** for participants
- Organizers still provide their **Department**

### Registration Form Fields:

**For Participants:**
- Full Name
- Email
- Password
- **Course/Program** (new) - e.g., "BS Information Technology"
- **Year Level** (new) - Dropdown: 1st Year, 2nd Year, 3rd Year, 4th Year

**For Organizers:**
- Full Name
- Email
- Password
- Department/Office

### Database Changes:
- User model now has `course` and `year` fields
- These are stored in the Users table in Railway

### Files Modified:
- `models/userModel.js` - Added course and year fields
- `views/register.xian` - Added form inputs
- `controllers/authController.js` - Handle new fields on registration

---

## 2. Attendance Tracking for Organizers

### What's New:
Organizers can now **monitor which students actually attended** their events.

### Features:

#### Attendance Endpoints (API):

1. **GET `/api/attendance/participants/:eventId`**
   - Get all participants registered for an event
   - Shows: Name, Email, Course, Year, Department, Registration Status

2. **POST `/api/attendance/mark`**
   - Mark a student as "attended"
   - Body: `{ participantId, eventId, organizerId }`

3. **POST `/api/attendance/unmark`**
   - Mark a student back to "registered" (undo attendance)
   - Body: `{ participantId, eventId, organizerId }`

4. **GET `/api/attendance/stats`**
   - Get attendance statistics for an event
   - Returns: Total registered, attended, cancelled, attendance rate %

### Participation Status Values:
- `registered` - Student signed up but hasn't attended
- `attended` - Student marked as attended by organizer
- `cancelled` - Student cancelled their participation

### How to Use (for Organizers):

1. Go to **Organizer Dashboard** → Select an event
2. View all registered participants
3. Click **Mark as Attended** next to each student
4. See attendance statistics:
   - Total registered
   - Total attended
   - Attendance rate percentage

### Files Created/Modified:
- `controllers/attendanceController.js` - New attendance logic
- `routes/apiRoutes.js` - Added attendance endpoints

---

## 3. Sample Attendance Workflow

### Example API Usage:

```bash
# Get all participants for event ID 7
GET /api/attendance/participants/7?organizerId=4

# Response:
{
  "success": true,
  "event": {
    "id": 7,
    "title": "CSS Day",
    "date": "2026-05-15T08:28:00.000Z"
  },
  "participants": [
    {
      "participantId": 1,
      "userId": 5,
      "name": "Student Name",
      "email": "student@email.com",
      "course": "BS Information Technology",
      "year": "3rd Year",
      "department": "CCS",
      "status": "registered",
      "registeredAt": "2025-12-10T19:53:19.000Z"
    }
  ]
}

# Mark student as attended
POST /api/attendance/mark
Body: {
  "participantId": 1,
  "eventId": 7,
  "organizerId": 4
}

# Get attendance stats
GET /api/attendance/stats?eventId=7&organizerId=4

# Response:
{
  "success": true,
  "stats": {
    "total": 4,
    "registered": 2,
    "attended": 2,
    "cancelled": 0,
    "attendanceRate": "50%"
  }
}
```

---

## 4. What's Next?

To fully implement the UI for organizers:

1. **Create Attendance View** - Show participant list with toggle buttons
   - Display participant details (name, course, year)
   - Quick attendance toggle buttons
   - Real-time stats dashboard

2. **Add to Organizer Dashboard**
   - Add "View Attendance" button to each event
   - Show attendance statistics summary

3. **Export Attendance Reports**
   - Export attendance list as CSV
   - Generate attendance certificates

---

## 5. Database Fields Added

### Users Table:
```sql
ALTER TABLE Users ADD COLUMN course VARCHAR(255) NULLABLE;
ALTER TABLE Users ADD COLUMN year VARCHAR(255) NULLABLE;
```

### Participations Table (unchanged but now used):
```
participant_id (int) - Primary key
user_id (int) - Student
event_id (int) - Event
status (enum) - 'registered', 'attended', 'cancelled'
created_at (datetime)
updated_at (datetime)
```

---

## 6. Testing the New Features

### Register as Participant:
1. Go to https://minsu-event.onrender.com/auth/register
2. Select "Participant" role
3. Fill in course and year
4. Register and login

### View Attendance (API):
```bash
curl "https://minsu-event.onrender.com/api/attendance/participants/7?organizerId=4"
```

### Mark Attendance (API):
```bash
curl -X POST "https://minsu-event.onrender.com/api/attendance/mark" \
  -H "Content-Type: application/json" \
  -d '{"participantId":1,"eventId":7,"organizerId":4}'
```

---

## 7. Status

✅ **Backend Complete**
- User model updated
- Registration form updated
- Attendance API endpoints created
- Pushed to GitHub
- Render will auto-deploy

⏳ **Frontend (Optional)**
- UI for organizers to mark attendance (can be added later)
- Attendance dashboard widgets

---

## Notes

- Course and Year are only collected for **participants**, not organizers
- Attendance can only be marked by the event organizer
- Security: Organizers can only mark attendance for their own events
- All changes are in Railway database and synced automatically

**Deployed at**: https://minsu-event.onrender.com
**Data**: Railway MySQL (7 events, 6 users, 4 participations)
