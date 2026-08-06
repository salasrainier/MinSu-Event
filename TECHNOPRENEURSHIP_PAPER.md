# TECHNOPRENEURSHIP PAPER
## MinSU Events — Web-Based Event Management System
### Mindoro State University

---

**Submitted by:**
Christian I. Cabrera
Rainier M. Salas
Mindoro State University — College of Computer Studies

**Course:** Technopreneurship
**Academic Year:** 2025–2026

---

## TABLE OF CONTENTS

| | | Page |
|---|---|---|
| I. | INTRODUCTION | 4 |
| II. | WHY MinSU EVENTS | 5 |
| III. | NAME AND DESCRIPTION OF THE PRODUCT/SERVICE | 6 |
| IV. | BUSINESS MODEL CANVAS | 7 |
| | a. Value Proposition | 8 |
| | b. Customer Segments | 8 |
| | c. Channel | 8 |
| | d. Relationship | 8 |
| | e. Key Partners | 8 |
| | f. Cost | 8 |
| | g. Key Resources | 8 |
| | &nbsp;&nbsp;&nbsp;&nbsp;i. Manpower Requirements | 8 |
| | &nbsp;&nbsp;&nbsp;&nbsp;ii. Organization Structure | 9 |
| | h. Key Activities | 9 |
| | i. Revenue Stream | 9 |
| V. | BROCHURE | 10 |
| VI. | MARKET VALIDATION | 11 |
| VII. | FINANCIAL ASPECT | 14 |
| | a. Projected Cost | 14 |
| | b. Financial Statement – Project Cash Flow | 15 |
| VIII. | PROTOTYPING | 16 |
| IX. | PITCHING DIALOG | 17 |
| X. | CONCLUSION | 18 |
| XI. | APPENDICES | 19 |
| XII. | REFERENCES | 24 |

---

## I. INTRODUCTION

Mindoro State University (MinSU) is a state university in the Philippines that hosts numerous academic, cultural, and organizational events throughout the academic year. These events — ranging from departmental seminars and sports fests to university-wide celebrations — require careful coordination between student organizations, faculty organizers, and the university administration.

Currently, the process of requesting, approving, and monitoring events at MinSU is largely manual. Organizers submit paper-based proposals, administrators review them through physical documents, and participants learn about events through word of mouth or physical bulletin boards. This fragmented approach leads to scheduling conflicts, delayed approvals, poor attendance tracking, and a lack of transparency in the event management process.

The rapid advancement of information and communication technology presents an opportunity to modernize this process. Web-based systems have proven effective in streamlining administrative workflows across educational institutions worldwide. A dedicated event management platform tailored to the needs of MinSU can eliminate inefficiencies, reduce paperwork, and create a more connected campus community.

**MinSU Events** is a web-based event management system developed specifically for Mindoro State University. It provides a centralized digital platform where organizers can submit event proposals, administrators can review and approve them, and participants can discover and join events — all in one place. The system is built using modern web technologies including Node.js, Express.js, MySQL, and Handlebars, and is designed to be accessible from any device with a web browser.

This technopreneurship paper presents the conceptualization, development, business model, market validation, financial projections, and prototype of the MinSU Events system. It demonstrates how technology entrepreneurship can address real institutional problems and create sustainable value for the university community.

---

## II. WHY MinSU EVENTS

The idea for MinSU Events emerged from a direct observation of the pain points experienced by students, organizers, and administrators at Mindoro State University.

**The Problem:**

Every semester, student organizations and departments submit dozens of event proposals to the university administration. The current process involves:

1. Printing and physically submitting proposal documents
2. Waiting days or weeks for approval with no status updates
3. No centralized calendar — scheduling conflicts happen frequently
4. Participants have no easy way to discover or register for events
5. Administrators have no data-driven overview of campus event activity
6. No digital record of past events, attendance, or engagement

These inefficiencies waste time, cause frustration, and result in poorly attended events that could have been better promoted.

**The Opportunity:**

MinSU has over 10,000 students and hundreds of faculty members. Each academic year, an estimated 50–100 events are organized across all departments. A digital platform that streamlines this process would save hundreds of hours of administrative work, reduce scheduling conflicts to near zero, and significantly improve event visibility and participation.

**Why Now:**

The post-pandemic shift toward digital tools in Philippine education has accelerated the adoption of web-based systems in universities. Students and faculty are now comfortable using online platforms for academic and administrative tasks. MinSU Events is positioned at the right time to capitalize on this digital readiness.

**Why Us:**

The development team consists of Computer Studies students at MinSU who understand both the technical requirements and the institutional context. We have direct access to end users, deep knowledge of the university's processes, and the technical skills to build and maintain the system. This insider advantage gives MinSU Events a strong foundation for adoption and long-term sustainability.

---

## III. NAME AND DESCRIPTION OF THE PRODUCT/SERVICE

### Product Name: **MinSU Events**
*Web-Based Event Management System for Mindoro State University*

### Tagline:
*"One Platform. Every Event."*

### Description:

MinSU Events is a full-stack web application that digitizes and streamlines the entire event lifecycle at Mindoro State University — from proposal submission to post-event analytics. The system serves three distinct user roles, each with a tailored experience:

**1. Organizers**
Student organizations, clubs, and department representatives who want to host events. They can:
- Submit event proposals with complete details (title, date, venue, purpose, department)
- Attach proposal documents (PDF, Word, PowerPoint) for admin review
- Upload event photos and videos
- View a real-time schedule calendar to avoid conflicts before submitting
- Track the status of their proposals (Pending, Approved, Denied)
- Manage their approved events and monitor participant registrations

**2. Administrators**
University administrators responsible for reviewing and approving event proposals. They can:
- Access a unified admin dashboard with sidebar navigation
- Review all submitted proposals with attached documents
- Approve or deny proposals with one click
- Monitor the event schedule through an interactive calendar
- View analytics: event trends, department breakdowns, monthly submissions
- Manage user accounts and monitor system activity through audit logs

**3. Participants**
Students and faculty who want to discover and join events. They can:
- Browse the event feed (similar to a social media feed) showing all approved events
- Join events with a single click
- React to and comment on event posts
- Track their participation history through their personal dashboard
- Receive real-time notifications when events they follow are updated

### Key Features:

| Feature | Description |
|---|---|
| Event Proposal System | Digital submission with document attachment (required) |
| Schedule Conflict Detection | Real-time calendar check before submission |
| Admin Approval Workflow | One-click approve/deny with organizer notifications |
| Event Feed | Social-media-style feed for all approved events |
| Participation Tracking | Join/leave events, attendance history |
| Analytics Dashboard | Charts for event trends, department stats, user metrics |
| Audit Logs | Full activity trail for administrative accountability |
| Real-time Notifications | Instant alerts for approval/denial status |
| Proposal Viewer | In-browser PDF/document viewer — no download needed |
| Role-Based Access | Separate dashboards for Admin, Organizer, Participant |

### Technology Stack:

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Frontend | Handlebars (HBS), Tailwind CSS |
| Database | MySQL with Sequelize ORM |
| Authentication | Express-Session, bcrypt |
| File Uploads | Multer |
| Real-time | Server-Sent Events (SSE) |
| Charts | Chart.js |

---

## IV. BUSINESS MODEL CANVAS

### a. Value Proposition

MinSU Events delivers the following core values to its users:

- **For Organizers:** Eliminates paperwork, provides real-time approval tracking, prevents scheduling conflicts through a live calendar, and increases event visibility through the digital feed.
- **For Administrators:** Centralizes all event proposals in one dashboard, provides data-driven insights through analytics, reduces manual coordination effort, and creates an auditable record of all decisions.
- **For Participants:** Makes event discovery easy and social, enables one-click registration, and keeps them informed through real-time notifications.
- **For the University:** Modernizes administrative processes, reduces operational costs, improves event attendance, and builds institutional data on campus activity.

### b. Customer Segments

**Primary Users (Direct):**
- Student organizations and clubs (organizers)
- Department heads and faculty event coordinators (organizers)
- University administrators and event approval officers (admins)
- Students and faculty who attend events (participants)

**Secondary Beneficiaries:**
- Mindoro State University as an institution
- Future students and faculty who benefit from a more organized campus

**Market Size:**
- MinSU has approximately 10,000+ enrolled students
- 50+ recognized student organizations
- 8+ colleges and departments
- Estimated 50–100 events organized per academic year

### c. Channel

**Distribution and Access Channels:**
- **Web Browser:** Accessible via any device (desktop, laptop, mobile) at the university's domain
- **University Intranet:** Deployed on the university's local server for secure internal access
- **Social Media Promotion:** Facebook pages of student organizations and departments
- **University Announcements:** Official university communication channels (email, bulletin boards)
- **Word of Mouth:** Student-to-student and faculty-to-faculty referrals

### d. Relationship

**Customer Relationships:**
- **Self-Service:** Users register, submit proposals, and manage their events independently through the platform
- **Automated Notifications:** Real-time alerts keep users informed without manual follow-up
- **Community Building:** The event feed and reaction/comment system fosters a sense of campus community
- **Admin Support:** Administrators can directly communicate decisions through the approval/denial system
- **Feedback Loop:** Analytics data helps administrators understand event trends and improve planning

### e. Key Partners

| Partner | Role |
|---|---|
| Mindoro State University IT Department | Server hosting, domain, network infrastructure |
| University Administration | Policy support, official adoption, user mandate |
| Student Government (SSC/USC) | Promotion, adoption among student organizations |
| College Deans and Department Heads | Encouraging organizer registration and use |
| Open Source Community | Node.js, Express, MySQL, Tailwind CSS (free tools) |

### f. Cost

**Development Costs (One-Time):**

| Item | Estimated Cost |
|---|---|
| System Development (labor) | ₱0 (student project) |
| Domain Name Registration | ₱500–₱1,500/year |
| SSL Certificate | ₱0 (Let's Encrypt — free) |
| Development Tools & Software | ₱0 (open source) |
| **Total Initial Cost** | **₱500–₱1,500** |

**Operational Costs (Annual):**

| Item | Estimated Cost |
|---|---|
| Server Hosting (university server) | ₱0 (university-provided) |
| Domain Renewal | ₱500–₱1,500/year |
| Maintenance & Updates | ₱0 (developer team) |
| **Total Annual Cost** | **₱500–₱1,500** |

### g. Key Resources

#### i. Manpower Requirements

| Role | Responsibility | Count |
|---|---|---|
| Lead Developer / Full-Stack Developer | System architecture, backend, frontend development, database design | 1 |
| Co-Developer / Frontend Developer | UI/UX design, template development, testing | 1 |
| System Administrator | Server setup, deployment, maintenance | 1 (shared with developer) |
| Project Manager | Documentation, coordination, stakeholder communication | 1 (shared with developer) |

**Skills Required:**
- Node.js / Express.js development
- MySQL database management
- HTML, CSS (Tailwind), JavaScript
- Git version control
- Basic server administration (Linux/Windows)

#### ii. Organization Structure

```
University Administration
        |
   IT Department
        |
  MinSU Events Team
   /            \
Lead Developer   Co-Developer
(Backend/DB)     (Frontend/UI)
        |
   End Users
  /    |    \
Admin  Organizer  Participant
```

**Reporting Structure:**
- The development team reports to the University IT Department
- The IT Department coordinates with University Administration for policy and deployment
- End users interact directly with the system

### h. Key Activities

1. **System Development & Maintenance**
   - Continuous improvement of features based on user feedback
   - Bug fixes and security updates
   - Database optimization and backup management

2. **User Onboarding & Training**
   - Orientation sessions for organizers and administrators
   - User manual and help documentation
   - Video tutorials for common tasks

3. **Event Lifecycle Management**
   - Processing proposal submissions
   - Conflict detection and schedule management
   - Approval workflow execution
   - Post-event data archiving

4. **Analytics & Reporting**
   - Monthly event activity reports for administration
   - Department-level event statistics
   - Participation and engagement metrics

5. **Marketing & Adoption**
   - Coordination with student organizations for adoption
   - Demonstration to department heads and administrators
   - Continuous feedback collection and feature iteration

### i. Revenue Stream

MinSU Events is designed as a **free institutional service** for Mindoro State University. However, the following revenue and sustainability models are considered:

**Model 1: University Budget Allocation (Primary)**
- The university allocates a small annual budget for system maintenance and hosting
- Estimated: ₱5,000–₱10,000/year for domain and minor operational costs

**Model 2: Grant Funding**
- Application to CHED (Commission on Higher Education) ICT grants for educational technology
- DOST (Department of Science and Technology) student innovation grants

**Model 3: Scalability to Other Universities (Future)**
- The system can be rebranded and licensed to other state universities in MIMAROPA region
- Subscription model: ₱5,000–₱15,000/year per institution
- Potential market: 5–10 state universities in the region

**Model 4: Premium Features (Future)**
- Advanced analytics and reporting modules
- SMS notification integration
- Mobile application version

---

## V. BROCHURE

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║              🎓  MinSU Events                                ║
║         Web-Based Event Management System                    ║
║         Mindoro State University                             ║
║                                                              ║
║    "One Platform. Every Event."                              ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  FOR ORGANIZERS                                              ║
║  ✓ Submit event proposals online                             ║
║  ✓ Attach proposal documents (PDF, Word, PPT)                ║
║  ✓ Check schedule conflicts before submitting                ║
║  ✓ Track approval status in real-time                        ║
║  ✓ Manage your events and participants                        ║
║                                                              ║
║  FOR PARTICIPANTS                                            ║
║  ✓ Discover all campus events in one feed                    ║
║  ✓ Join events with one click                                ║
║  ✓ React and comment on events                               ║
║  ✓ Track your event history                                  ║
║  ✓ Get notified when events are approved                     ║
║                                                              ║
║  FOR ADMINISTRATORS                                          ║
║  ✓ Review all proposals in one dashboard                     ║
║  ✓ Approve or deny with one click                            ║
║  ✓ Monitor the event calendar                                ║
║  ✓ View analytics and reports                                ║
║  ✓ Full audit trail of all actions                           ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  HOW IT WORKS                                                ║
║                                                              ║
║  1. Register → 2. Submit Proposal → 3. Admin Reviews         ║
║  4. Get Notified → 5. Event Goes Live → 6. Participants Join ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  BUILT WITH                                                  ║
║  Node.js | Express | MySQL | Tailwind CSS | Chart.js         ║
║                                                              ║
║  Developed by: CCS Students, Mindoro State University        ║
║  Contact: minsu.events@msu.edu.ph                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

## VI. MARKET VALIDATION

### Problem Validation

To validate the problem, the development team conducted informal interviews and observations within Mindoro State University. The following findings were gathered:

**Survey Results (Sample: 50 students and 10 faculty/staff):**

| Question | Yes | No |
|---|---|---|
| Have you experienced difficulty finding out about campus events? | 82% | 18% |
| Have you missed an event because you didn't know about it? | 74% | 26% |
| Do you think the current event proposal process is slow? | 88% | 12% |
| Would you use a digital platform to discover and join events? | 90% | 10% |
| Do you think a digital system would improve event management? | 94% | 6% |

**Key Pain Points Identified:**

1. **Organizers** spend an average of 3–5 days waiting for proposal approval with no status updates
2. **Scheduling conflicts** occur at least 2–3 times per semester due to lack of a centralized calendar
3. **Participants** rely on Facebook group posts and physical flyers — both unreliable
4. **Administrators** manually track proposals using spreadsheets or paper files
5. **No historical data** exists on past events, attendance, or engagement

### Solution Validation

A prototype of MinSU Events was demonstrated to a group of 15 students (5 organizers, 10 participants) and 3 administrators. Feedback was collected through a structured walkthrough.

**Prototype Feedback:**

| Feature | Satisfaction Rating (1–5) |
|---|---|
| Event proposal submission form | 4.7 |
| Schedule conflict detection calendar | 4.8 |
| Admin approval dashboard | 4.6 |
| Event feed (participant view) | 4.5 |
| Real-time notifications | 4.4 |
| Analytics dashboard | 4.6 |
| Overall system usability | 4.6 |

**Selected Quotes from Testers:**

> *"Ang ganda ng calendar feature — makikita mo agad kung may conflict bago pa mag-submit."*
> — Student Organizer, CCS

> *"Hindi na kailangan pang pumunta sa admin office para malaman kung approved na ang event."*
> — Student Council Officer

> *"As an admin, this would save me at least 2–3 hours per week of manual tracking."*
> — University Staff

> *"The feed looks like Facebook but for school events — students will definitely use this."*
> — Faculty Member

### Competitive Analysis

| Feature | MinSU Events | Manual Process | Generic Google Forms | Facebook Groups |
|---|---|---|---|---|
| Online proposal submission | ✓ | ✗ | Partial | ✗ |
| Schedule conflict detection | ✓ | ✗ | ✗ | ✗ |
| Real-time approval tracking | ✓ | ✗ | ✗ | ✗ |
| Participant registration | ✓ | ✗ | Partial | ✗ |
| Analytics & reporting | ✓ | ✗ | ✗ | ✗ |
| Audit logs | ✓ | ✗ | ✗ | ✗ |
| Role-based access | ✓ | ✗ | ✗ | ✗ |
| Tailored for MinSU | ✓ | ✓ | ✗ | ✗ |
| Free to use | ✓ | ✓ | ✓ | ✓ |

MinSU Events is the only solution that addresses all identified pain points in a single, integrated platform tailored specifically for Mindoro State University.

### Target Market Size

**Total Addressable Market (TAM):**
- All state universities and colleges in the Philippines: ~112 SUCs
- Estimated 1.5 million students enrolled in SUCs

**Serviceable Addressable Market (SAM):**
- State universities in MIMAROPA region: ~8 institutions
- Estimated 50,000 students

**Serviceable Obtainable Market (SOM) — Year 1:**
- Mindoro State University: ~10,000 students
- Target active users: 2,000–3,000 (20–30% adoption rate)

---

## VII. FINANCIAL ASPECT

### a. Projected Cost

**One-Time Development Costs:**

| Item | Description | Cost (PHP) |
|---|---|---|
| System Development | Full-stack web application (student project) | ₱0 |
| Domain Name | .edu.ph or .com domain registration | ₱1,200 |
| SSL Certificate | Let's Encrypt (free) | ₱0 |
| Development Tools | VS Code, Git, MySQL Workbench (free/open source) | ₱0 |
| Testing & QA | Internal testing by development team | ₱0 |
| Documentation | Printed manuals and user guides | ₱500 |
| **TOTAL ONE-TIME COST** | | **₱1,700** |

**Annual Operational Costs:**

| Item | Description | Cost/Year (PHP) |
|---|---|---|
| Domain Renewal | Annual domain registration fee | ₱1,200 |
| Server Hosting | University server (provided by IT Dept.) | ₱0 |
| Maintenance | Bug fixes, updates, feature additions | ₱0 |
| Backup Storage | External backup (Google Drive/university storage) | ₱0 |
| **TOTAL ANNUAL COST** | | **₱1,200** |

**3-Year Total Cost of Ownership:**

| Year | Cost (PHP) |
|---|---|
| Year 1 (Development + Operations) | ₱2,900 |
| Year 2 (Operations only) | ₱1,200 |
| Year 3 (Operations only) | ₱1,200 |
| **3-Year Total** | **₱5,300** |

### b. Financial Statement – Project Cash Flow

**Projected Cash Flow (3 Years):**

| Item | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| **INFLOWS** | | | |
| University Budget Allocation | ₱5,000 | ₱5,000 | ₱5,000 |
| CHED/DOST Grant (projected) | ₱20,000 | ₱0 | ₱0 |
| Licensing to Other SUCs | ₱0 | ₱10,000 | ₱20,000 |
| **Total Inflows** | **₱25,000** | **₱15,000** | **₱25,000** |
| **OUTFLOWS** | | | |
| Development Cost | ₱1,700 | ₱0 | ₱0 |
| Annual Operations | ₱1,200 | ₱1,200 | ₱1,200 |
| Marketing & Promotion | ₱500 | ₱500 | ₱500 |
| **Total Outflows** | **₱3,400** | **₱1,700** | **₱1,700** |
| **NET CASH FLOW** | **₱21,600** | **₱13,300** | **₱23,300** |
| **Cumulative Cash Flow** | **₱21,600** | **₱34,900** | **₱58,200** |

**Return on Investment (ROI):**
- Total Investment (3 years): ₱5,300
- Total Revenue (3 years): ₱65,000 (projected)
- **ROI: 1,126%** over 3 years

**Cost-Benefit Analysis:**

The primary benefit of MinSU Events is not monetary but operational:
- Estimated time saved per administrator: 2–3 hours/week = ~100 hours/year
- Estimated reduction in scheduling conflicts: 90%
- Estimated increase in event participation: 30–50% (based on improved visibility)
- Estimated reduction in paper usage: 200–300 sheets/semester

---

## VIII. PROTOTYPING

The MinSU Events system has been fully developed as a functional prototype. The following screens represent the key interfaces of the system:

### Screen 1: Login Page
- Clean, branded login form with MinSU logo
- Email and password fields with show/hide password toggle
- Redirects to role-specific dashboard upon successful login

### Screen 2: Organizer Dashboard
- Stats cards: Total Events, Pending, Approved, Denied
- Events table with filter tabs (All/Pending/Approved/Denied)
- Participant count per event
- Proposal viewer (in-browser, no download required)
- Active/Expired status indicators

### Screen 3: Submit Event Form
- 4-section form: Basic Info, Schedule & Location, Event Details, Attachments
- Mini calendar with booked date indicators (red dots)
- Real-time conflict detection when dates are selected
- Proposal document upload (required) with cancel/replace option
- Optional photo and video uploads with drag-and-drop

### Screen 4: Event Feed (Participant View)
- Social media-style feed of all approved events
- Event cards with photos, details, organizer info
- React (like, love, etc.) and comment functionality
- Join/Leave event buttons
- Real-time participant count

### Screen 5: Admin Dashboard
- Sidebar navigation: Overview, Event Proposals, Schedule, Analytics, Users, Audit Logs
- Overview: Stats, upcoming events, approval rate
- Event Proposals: Full table with Approve/Deny/View Proposal actions
- Schedule: Interactive calendar with event indicators
- Analytics: Doughnut, Bar, and Line charts (Chart.js)
- Users: Recent user registrations with role/status
- Audit Logs: Full activity trail

### Screen 6: Participant Dashboard
- Stats: Total Joined, Registered, Attended
- Participated events table with filter tabs
- Leave event functionality
- Browse Events button linking to the feed

### Technology Prototype Details:

| Component | Implementation |
|---|---|
| Server | Node.js v18+ with Express.js framework |
| Database | MySQL 8.0 with Sequelize ORM |
| View Engine | Handlebars (.xian extension) |
| Styling | Tailwind CSS (CDN) |
| Authentication | bcrypt password hashing, express-session |
| File Storage | Local filesystem via Multer |
| Real-time | Server-Sent Events for notifications |
| Charts | Chart.js 4.4.0 |

---

## IX. PITCHING DIALOG

**Setting:** University Board Room, Mindoro State University
**Audience:** University President, VP for Academic Affairs, IT Director, Student Council President

---

**[OPENING]**

*Developer:* "Good morning, everyone. Thank you for giving us the opportunity to present MinSU Events — a web-based event management system we built specifically for Mindoro State University."

*Developer:* "Let me start with a question: How many of you have experienced a situation where two events were scheduled at the same venue on the same day? Or where an organizer had to wait a week just to find out if their proposal was approved?"

*[Audience nods]*

*Developer:* "That's exactly the problem we set out to solve."

---

**[PROBLEM]**

*Developer:* "Right now, event management at MinSU involves paper proposals, manual scheduling, and a lot of back-and-forth between organizers and the admin office. Our survey of 50 students and 10 faculty members found that 88% think the current process is too slow, and 74% have missed events simply because they didn't know about them."

*VP Academic Affairs:* "That's a significant number. What exactly are you proposing?"

---

**[SOLUTION]**

*Developer:* "MinSU Events is a complete digital platform that handles the entire event lifecycle — from proposal submission to post-event analytics. Let me show you a quick demo."

*[Screen demonstration]*

*Developer:* "Here's the organizer's view. They fill out the event details, and before they even submit, the system shows them a calendar with all existing events. If there's a conflict, they're warned immediately — no more double bookings."

*IT Director:* "What technology does it run on? Can our servers handle it?"

*Developer:* "It runs on Node.js and MySQL — both lightweight and well-supported. It can run on the university's existing server infrastructure. We've tested it with concurrent users and it performs well."

---

**[VALUE PROPOSITION]**

*Developer:* "For administrators, the dashboard gives you everything in one place — pending proposals, the event calendar, analytics, user management, and a full audit log of every action taken in the system."

*University President:* "What about security? Student data is involved."

*Developer:* "All passwords are encrypted using bcrypt. Sessions are managed securely. File uploads are validated. And the system uses role-based access — admins, organizers, and participants each see only what they're supposed to see."

---

**[FINANCIALS]**

*Developer:* "In terms of cost, the system was built at essentially zero cost since it's a student project using open-source tools. Annual operational cost is approximately ₱1,200 for domain renewal. The university's existing server handles hosting."

*Student Council President:* "Will students actually use this? It looks complicated."

*Developer:* "We designed it to feel familiar — the event feed looks like a social media feed. Students can join events, react, comment, and track their participation. In our prototype testing, satisfaction ratings averaged 4.6 out of 5."

---

**[CLOSING]**

*Developer:* "MinSU Events is ready for deployment. We're asking for the university's official adoption — a domain name, server access, and an announcement to the university community. In return, you get a modern, efficient, and transparent event management system that will save hundreds of hours of administrative work every year."

*University President:* "This is impressive work. Let's discuss the next steps with the IT department."

*Developer:* "Thank you. We're ready to support the deployment and train all users. MinSU Events — One Platform. Every Event."

---

## X. CONCLUSION

MinSU Events addresses a genuine and persistent problem in Mindoro State University's administrative operations. The manual, paper-based event management process that currently exists is inefficient, error-prone, and disconnected from the digital habits of today's students and faculty.

Through the development of this web-based system, we have demonstrated that:

1. **The problem is real and validated** — surveys and interviews confirm that 88% of stakeholders find the current process inadequate.

2. **The solution is technically sound** — the system is fully functional, built on proven technologies, and tested with real users who rated it 4.6/5 for usability.

3. **The business model is sustainable** — with near-zero development cost, minimal operational expenses, and potential for expansion to other universities, MinSU Events is financially viable.

4. **The impact is significant** — the system eliminates scheduling conflicts, reduces administrative workload by an estimated 2–3 hours per week, increases event visibility, and creates a data-driven foundation for campus event planning.

5. **The timing is right** — the post-pandemic digital shift in Philippine education has created the perfect environment for institutional adoption of web-based tools.

MinSU Events is more than a student project — it is a practical, deployable solution that can transform how Mindoro State University manages its campus events. With the support of the university administration and IT department, it has the potential to become a permanent part of the university's digital infrastructure and a model for other state universities in the region.

We believe that technology, when applied thoughtfully to real institutional problems, creates lasting value. MinSU Events is our contribution to a smarter, more connected Mindoro State University.

---

## XI. APPENDICES

### Appendix A: System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│         Chrome / Firefox / Safari / Edge                 │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/HTTPS
┌──────────────────────▼──────────────────────────────────┐
│                  EXPRESS.JS SERVER                       │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Routes    │  │ Controllers │  │   Middleware     │  │
│  │ /auth       │  │ authCtrl    │  │ isLoggedIn       │  │
│  │ /api        │  │ eventCtrl   │  │ isAdmin          │  │
│  │ /organizer  │  │ analyticsCtrl│ │ multer (upload)  │  │
│  │ /admin      │  │ calendarCtrl│  │ session          │  │
│  │ /participant│  │ feedCtrl    │  │ flash            │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              HANDLEBARS VIEW ENGINE                  │ │
│  │  dashboard_admin.xian | organizer_dashboard.xian    │ │
│  │  participant_dashboard.xian | event_feed.xian       │ │
│  │  submit_event.xian | login.xian | register.xian     │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────┘
                       │ Sequelize ORM
┌──────────────────────▼──────────────────────────────────┐
│                    MySQL DATABASE                        │
│                                                          │
│  ┌──────────┐ ┌──────────────┐ ┌──────────────────────┐ │
│  │  Users   │ │EventRequests │ │    Participations     │ │
│  └──────────┘ └──────────────┘ └──────────────────────┘ │
│  ┌──────────┐ ┌──────────────┐                          │
│  │ Reactions│ │   Comments   │                          │
│  └──────────┘ └──────────────┘                          │
└─────────────────────────────────────────────────────────┘
```

### Appendix B: Database Schema

**Table: Users**
| Column | Type | Description |
|---|---|---|
| user_id | INT (PK) | Unique user identifier |
| name | VARCHAR | Full name |
| email | VARCHAR (UNIQUE) | Login email |
| password | VARCHAR | bcrypt hashed password |
| role | ENUM | participant / organizer / admin |
| department | VARCHAR | College/department |
| contact_number | VARCHAR | Optional contact |
| status | ENUM | active / pending / banned |
| profile_picture | VARCHAR | Profile image path |
| created_at | DATETIME | Registration timestamp |
| updated_at | DATETIME | Last update timestamp |

**Table: EventRequests**
| Column | Type | Description |
|---|---|---|
| id | INT (PK) | Unique event ID |
| organizer_name | VARCHAR | Name of organizer |
| event_title | VARCHAR | Title of the event |
| department | VARCHAR | Organizing department |
| event_date | DATETIME | Start date and time |
| event_end_date | DATETIME | End date and time |
| venue | VARCHAR | Event location |
| purpose | TEXT | Event description |
| proposal_file | VARCHAR | Path to proposal document |
| event_images | JSON | Array of image paths |
| event_video | VARCHAR | Path to video file |
| status | ENUM | Pending / Approved / Denied |
| remarks | TEXT | Admin remarks |
| user_id | INT (FK) | References Users.user_id |
| is_expired | BOOLEAN | Whether event has expired |
| created_at | DATETIME | Submission timestamp |
| updated_at | DATETIME | Last update timestamp |

**Table: Participations**
| Column | Type | Description |
|---|---|---|
| participant_id | INT (PK) | Unique participation ID |
| user_id | INT (FK) | References Users.user_id |
| event_id | INT (FK) | References EventRequests.id |
| status | ENUM | registered / attended / cancelled |
| created_at | DATETIME | Join timestamp |

**Table: Reactions**
| Column | Type | Description |
|---|---|---|
| reaction_id | INT (PK) | Unique reaction ID |
| event_id | INT (FK) | References EventRequests.id |
| user_id | INT (FK) | References Users.user_id |
| reaction_type | ENUM | like / love / haha / wow / sad / angry |
| created_at | DATETIME | Reaction timestamp |

**Table: Comments**
| Column | Type | Description |
|---|---|---|
| comment_id | INT (PK) | Unique comment ID |
| event_id | INT (FK) | References EventRequests.id |
| user_id | INT (FK) | References Users.user_id |
| content | TEXT | Comment text |
| created_at | DATETIME | Comment timestamp |

### Appendix C: User Roles and Permissions

| Feature | Admin | Organizer | Participant |
|---|---|---|---|
| Submit event proposal | ✓ | ✓ | ✗ |
| Approve/Deny proposals | ✓ | ✗ | ✗ |
| View all proposals | ✓ | Own only | ✗ |
| View event feed | ✓ | ✓ | ✓ |
| Join events | ✗ | ✗ | ✓ |
| React & comment | ✓ | ✓ | ✓ |
| View analytics | ✓ | ✗ | ✗ |
| Manage users | ✓ | ✗ | ✗ |
| View audit logs | ✓ | ✗ | ✗ |
| View schedule calendar | ✓ | ✓ (submit form) | ✗ |

### Appendix D: Survey Questionnaire

**MinSU Events — Needs Assessment Survey**

1. How do you currently find out about campus events?
   - [ ] Facebook/Social Media
   - [ ] Physical bulletin boards
   - [ ] Word of mouth
   - [ ] Email announcements
   - [ ] Other: ___________

2. Have you ever missed an event because you didn't know about it?
   - [ ] Yes  [ ] No

3. If you are an organizer, how long does it typically take to get your event proposal approved?
   - [ ] 1–2 days  [ ] 3–5 days  [ ] 1–2 weeks  [ ] More than 2 weeks

4. Have you experienced scheduling conflicts (two events at the same venue/time)?
   - [ ] Yes, frequently  [ ] Yes, occasionally  [ ] No

5. Would you use a digital platform to submit and track event proposals?
   - [ ] Definitely  [ ] Probably  [ ] Unsure  [ ] No

6. What features would be most useful to you? (Check all that apply)
   - [ ] Online proposal submission
   - [ ] Real-time approval tracking
   - [ ] Event discovery feed
   - [ ] Schedule conflict detection
   - [ ] Participant registration
   - [ ] Analytics and reports

7. Overall, how would you rate the current event management process at MinSU?
   - [ ] Excellent  [ ] Good  [ ] Fair  [ ] Poor

---

## XII. REFERENCES

1. Osterwalder, A., & Pigneur, Y. (2010). *Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers.* John Wiley & Sons.

2. Commission on Higher Education (CHED). (2023). *Higher Education Statistics.* Republic of the Philippines. Retrieved from https://ched.gov.ph

3. Department of Science and Technology (DOST). (2024). *ICT Innovation Programs for Higher Education.* Republic of the Philippines.

4. Node.js Foundation. (2024). *Node.js Documentation.* Retrieved from https://nodejs.org/docs

5. Express.js. (2024). *Express — Fast, unopinionated, minimalist web framework for Node.js.* Retrieved from https://expressjs.com

6. Sequelize. (2024). *Sequelize ORM Documentation.* Retrieved from https://sequelize.org

7. Tailwind CSS. (2024). *Tailwind CSS Documentation.* Retrieved from https://tailwindcss.com

8. Chart.js. (2024). *Chart.js Documentation.* Retrieved from https://www.chartjs.org

9. MySQL. (2024). *MySQL 8.0 Reference Manual.* Oracle Corporation. Retrieved from https://dev.mysql.com/doc

10. Multer. (2024). *Multer — Node.js middleware for handling multipart/form-data.* Retrieved from https://github.com/expressjs/multer

11. bcrypt.js. (2024). *bcrypt — A library to help you hash passwords.* Retrieved from https://github.com/kelektiv/node.bcrypt.js

12. Handlebars.js. (2024). *Handlebars — Minimal Templating on Steroids.* Retrieved from https://handlebarsjs.com

13. Mindoro State University. (2024). *Official Website.* Retrieved from https://www.msu.edu.ph

14. Philippine Statistics Authority. (2023). *Education Statistics.* Republic of the Philippines.

15. Pressman, R. S., & Maxim, B. R. (2019). *Software Engineering: A Practitioner's Approach* (9th ed.). McGraw-Hill Education.

---

*Document prepared by:*
*Christian I. Cabrera & Rainier M. Salas*
*College of Computer Studies*
*Mindoro State University*
*Academic Year 2025–2026*

*© 2025 MinSU Events Development Team. All rights reserved.*
