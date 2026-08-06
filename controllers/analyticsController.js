import { EventRequest } from "../models/Eventrequest.js";
import { User } from "../models/userModel.js";
import { Participation } from "../models/Participation.js";
import { sequelize } from "../models/db.js";
import { Op } from "sequelize";

export const analyticsPage = async (req, res) => {
  if (!req.session.user) return res.redirect("/auth/login");
  if (req.session.user.role !== "admin") return res.redirect("/");

  try {
    console.log("\n📊 Analytics Dashboard Loading...\n");

    // ✅ Total Events by Status
    const totalEvents = await EventRequest.count();
    const pendingEvents = await EventRequest.count({ where: { status: "Pending" } });
    const approvedEvents = await EventRequest.count({ where: { status: "Approved" } });
    const deniedEvents = await EventRequest.count({ where: { status: "Denied" } });
    
    const approvalRate = totalEvents > 0 ? ((approvedEvents / totalEvents) * 100).toFixed(1) : 0;
    const denialRate = totalEvents > 0 ? ((deniedEvents / totalEvents) * 100).toFixed(1) : 0;

    console.log(`✅ Total Events: ${totalEvents} | Pending: ${pendingEvents} | Approved: ${approvedEvents} | Denied: ${deniedEvents}`);

    // ✅ User Statistics
    const totalUsers = await User.count();
    const organizerUsers = await User.count({ where: { role: "organizer" } });
    const participantUsers = await User.count({ where: { role: "participant" } });
    const adminUsers = await User.count({ where: { role: "admin" } });

    console.log(`👥 Users: Total=${totalUsers} | Organizers=${organizerUsers} | Participants=${participantUsers} | Admins=${adminUsers}`);

    // ✅ Monthly Trends (last 12 months for line graph)
    const currentDate = new Date();
    const monthlyTrends = [];
    const monthLabels = [];
    const monthCounts = [];
    
    for (let i = 11; i >= 0; i--) {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
      
      const monthName = startDate.toLocaleString('default', { month: 'short' });
      const monthYear = startDate.getFullYear() + "-" + String(startDate.getMonth() + 1).padStart(2, '0');
      
      const count = await EventRequest.count({
        where: {
          created_at: {
            [Op.between]: [startDate, endDate]
          }
        }
      });
      
      monthlyTrends.push({
        month: monthName,
        monthYear: monthYear,
        count: count,
        percentage: count > 0 ? (count / Math.max(1, totalEvents || 1)) * 100 : 0
      });
      
      monthLabels.push(monthName);
      monthCounts.push(count);
    }

    console.log(`📈 Monthly Trends:`, monthlyTrends);

    // ✅ Events by Department (for bar chart)
    const departmentBreakdown = await EventRequest.findAll({
      attributes: [
        'department',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['department'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      raw: true,
      subQuery: false
    });

    const departmentLabels = departmentBreakdown.map(d => d.department || "Unknown");
    const departmentCounts = departmentBreakdown.map(d => parseInt(d.count));

    console.log(`🏢 Departments:`, departmentBreakdown);

    // ✅ Recent Events Activity (last 10)
    const recentActivity = await EventRequest.findAll({
      attributes: ['id', 'event_title', 'organizer_name', 'status', 'created_at'],
      order: [['created_at', 'DESC']],
      limit: 10,
      raw: true
    });

    console.log(`📋 Recent Activity: ${recentActivity.length} events`);

    // ✅ Total Participants (unique users in Participation table)
    const totalParticipants = await Participation.count({
      distinct: true,
      col: 'user_id'
    });

    // ✅ Total Participations
    const totalParticipations = await Participation.count();

    console.log(`🎫 Participation: ${totalParticipants} unique participants | ${totalParticipations} total registrations\n`);

    // ✅ Pie Chart Data (Event Status Distribution)
    const pieChartData = {
      labels: ['Approved', 'Pending', 'Denied'],
      data: [approvedEvents, pendingEvents, deniedEvents],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      borderColor: ['#059669', '#d97706', '#dc2626']
    };

    // ✅ Bar Chart Data (Department Breakdown)
    const barChartData = {
      labels: departmentLabels.length > 0 ? departmentLabels : ['No Data'],
      data: departmentCounts.length > 0 ? departmentCounts : [0],
      backgroundColor: '#3b82f6',
      borderColor: '#1e40af'
    };

    // ✅ Line Chart Data (Monthly Trends)
    const lineChartData = {
      labels: monthLabels,
      data: monthCounts,
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4
    };

    res.render("analytics", {
      title: "Analytics Dashboard",
      user: req.session.user,
      stats: {
        totalEvents,
        pendingEvents,
        approvedEvents,
        deniedEvents,
        approvalRate,
        denialRate,
        totalUsers,
        organizerUsers,
        participantUsers,
        adminUsers,
        totalParticipants,
        totalParticipations,
        monthlyTrends,
        departmentBreakdown: departmentBreakdown.length > 0 ? departmentBreakdown : [],
        recentActivity,
        // ✅ Chart data for Chart.js
        pieChartData: JSON.stringify(pieChartData),
        barChartData: JSON.stringify(barChartData),
        lineChartData: JSON.stringify(lineChartData)
      }
    });
  } catch (error) {
    console.error("❌ Analytics error:", error);
    req.flash("error_msg", "Error loading analytics");
    res.redirect("/admin/dashboard");
  }
};
