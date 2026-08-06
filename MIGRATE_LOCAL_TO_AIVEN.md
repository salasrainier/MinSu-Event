# 🔄 Migrate Local Database to Aiven

Your data is still in your **local MySQL**, but Render is connecting to the new empty **Aiven MySQL**. We need to copy all data from local to Aiven.

---

## Option 1: Export & Import (Easiest)

### Step 1: Export Local Database
1. Open **phpMyAdmin** (usually at http://localhost/phpmyadmin)
2. Click on your database: `content_event_system`
3. Click **"Export"** tab
4. Click **"Go"** to download the SQL file
5. Save it as `backup.sql`

### Step 2: Import to Aiven

You'll need to use a MySQL client to connect to Aiven and import the data.

**Using MySQL Command Line:**

```bash
mysql -h minsu-events-db-mmellow274-ce3d.e.aivencloud.com \
  -P 24522 \
  -u avnadmin \
  -p \
  defaultdb < backup.sql
```

When prompted for password, enter: `AVNS_Lxmn8feGtPHLZoNpsCB`

---

## Option 2: Create Users Script (Quick)

If exporting is complex, I can create a script to insert your users into Aiven directly.

Your test users:
```
rainiersalas@gmail.com | newpass123 | participant
rain@gmail.com | newpass123 | participant
john@gmail.com | newpass123 | organizer
participant@test.com | newpass123 | participant
organizer@test.com | newpass123 | organizer
admin@msu.edu | newpass123 | admin
```

---

## Which option do you prefer?

1. **Option 1:** Export local DB and import to Aiven (keeps all data including events)
2. **Option 2:** I create a script to insert just the test users

Let me know and I'll help! 🚀
