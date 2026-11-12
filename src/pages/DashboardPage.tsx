import { useMemo, useState } from "react";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import { currentUser, leaderboard, opportunities, rewards } from "../data/mockData";
import { getLeaderboardRank } from "../lib/leaderboard";
import { formatNumber } from "../lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { AppConfig } from "../config/appConfig";
import { getMockRecentActivity, getRealRecentActivity } from "../utils/mockDataHelper";
import { generateTimeSimulationData, generateTimeBasedChartData, TimeBasedMetrics } from "../utils/timeSimulation";
import NotificationIcon from "../components/notifications/NotificationIcon";

export default function DashboardPage() {
  const userRank = useMemo(() => {
    return getLeaderboardRank(leaderboard, currentUser.id);
  }, []);

  const totalVolunteers = leaderboard.length;
  
  const totalVolunteerHours = useMemo(() => {
    return leaderboard.reduce((total, user) => total + user.hours, 0);
  }, []);

  const totalActivities = opportunities.length;

  const completionRate = useMemo(() => {
    // Calculate completion rate based on completed activities
    const completedActivities = opportunities.filter(opportunity => opportunity.participants !== undefined).length;
    return opportunities.length > 0 ? Math.round((completedActivities / opportunities.length) * 100) : 0;
  }, []);

  const departmentPerformance = useMemo(() => {
    // Group users by department and calculate metrics
    const departmentMap: Record<string, { hours: number; activities: number }> = {};
    
    leaderboard.forEach(user => {
      if (!departmentMap[user.department]) {
        departmentMap[user.department] = { hours: 0, activities: 0 };
      }
      departmentMap[user.department].hours += user.hours;
      departmentMap[user.department].activities += user.activities;
    });
    
    return Object.entries(departmentMap).map(([department, { hours, activities }]) => ({
      department,
      hours,
      activities,
      completion: Math.round((activities / (activities + 10)) * 100) // Mock completion rate
    }));
  }, []);

  const topDepartments = useMemo(() => {
    // Get top departments by hours
    const departmentMap: Record<string, number> = {};
    
    leaderboard.forEach(user => {
      if (!departmentMap[user.department]) {
        departmentMap[user.department] = 0;
      }
      departmentMap[user.department] += user.hours;
    });
    
    return Object.entries(departmentMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  }, []);

  const recentActivity = useMemo(() => {
    // Get recent activities from opportunities
    if (AppConfig.USE_MOCK_DATA) {
      return getMockRecentActivity(4);
    } else {
      return getRealRecentActivity();
    }
  }, []);

  // ROI Analysis Metrics
  const roiMetrics = useMemo(() => {
    // Calculate ROI metrics based on volunteer program effectiveness
    const totalStudentsReached = opportunities.reduce((total, opp) => total + (opp.participants || 0), 0);
    
    // Calculate average impact per hour
    const avgImpactPerHour = totalVolunteerHours > 0 ? totalStudentsReached / totalVolunteerHours : 0;
    
    // Calculate program cost equivalence
    const avgVolunteerHourValue = 25; // Estimated value per hour (this would be customizable)
    const totalValue = totalVolunteerHours * avgVolunteerHourValue;
    
    // Company investment (set by business stakeholders)
    const companyInvestment = 50000; // $50,000 annual investment in volunteer programs
    
    // Calculate ROI based on company investment
    const roi = companyInvestment > 0 ? (totalValue / companyInvestment) * 100 : 0;
    
    return {
      totalStudentsReached,
      avgImpactPerHour,
      totalValue,
      avgVolunteerHourValue,
      companyInvestment,
      roi
    };
  }, [totalVolunteerHours]);

  // Partnership Effectiveness Metrics
  const partnershipMetrics = useMemo(() => {
    // Calculate partnership effectiveness based on program data
    const totalParticipants = opportunities.reduce((total, opp) => total + (opp.participants || 0), 0);
    const avgParticipantsPerActivity = opportunities.length > 0 ? totalParticipants / opportunities.length : 0;
    
    // Calculate participation rates
    const participationRate = opportunities.length > 0 
      ? Math.round((opportunities.filter(opp => opp.participants !== undefined).length / opportunities.length) * 100)
      : 0;
    
    return {
      totalParticipants,
      avgParticipantsPerActivity,
      participationRate
    };
  }, []);

  // Long-term Engagement Metrics
  const engagementMetrics = useMemo(() => {
    // Calculate long-term engagement indicators
    const avgActivitiesPerVolunteer = leaderboard.reduce((total, user) => total + user.activities, 0) / leaderboard.length;
    
    // Calculate retention (based on how many users have participated in multiple activities)
    const activeVolunteers = leaderboard.filter(user => user.activities > 1).length;
    const retentionRate = leaderboard.length > 0 ? Math.round((activeVolunteers / leaderboard.length) * 100) : 0;
    
    return {
      avgActivitiesPerVolunteer,
      retentionRate,
      activeVolunteers
    };
  }, []);

  const handleExport = () => {
    // Export functionality - would generate CSV or PDF report
    const reportData = {
      summary: {
        totalVolunteers,
        totalHours: totalVolunteerHours,
        totalActivities,
        completionRate
      },
      departmentPerformance,
      topDepartments,
      roiMetrics,
      partnershipMetrics,
      engagementMetrics
    };
    
    // For demonstration purposes, we'll just show an alert
    alert(`Report generated successfully! In a real implementation, this would export a CSV/PDF report.\n\nUsing mock data: ${AppConfig.USE_MOCK_DATA}\nROI Metrics: ${JSON.stringify(roiMetrics, null, 2)}`);
    
    // In a real implementation, you might do something like:
    // const csvContent = generateCSV(reportData);
    // downloadCSV(csvContent, 'volunteer-dashboard-report.csv');
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Time-based simulation data
  const [showSimulation, setShowSimulation] = useState(false);
  
  // Generate time-based simulation data
  const timeSimulationData = useMemo(() => {
    return generateTimeSimulationData({
      totalVolunteers: totalVolunteers,
      totalHours: totalVolunteerHours,
      studentsReached: roiMetrics.totalStudentsReached,
      retentionRate: engagementMetrics.retentionRate,
      companyInvestment: roiMetrics.companyInvestment
    });
  }, [totalVolunteers, totalVolunteerHours, roiMetrics, engagementMetrics]);
  
  // Generate chart data for time simulation
  const timeChartData = useMemo(() => {
    return generateTimeBasedChartData(timeSimulationData);
  }, [timeSimulationData]);

  return (
    <div className="space-y-6 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center">
        <SectionHeader 
          eyebrow="Dashboard" 
          title="Executive Overview" 
          subtitle="Key metrics and analytics for volunteer engagement" 
        />
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export Report
          </button>
          <NotificationIcon className="text-gray-400" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 dark:bg-gray-800 dark:text-white">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold dark:text-white">{totalVolunteers}</h3>
              <p className="text-gray-400 dark:text-gray-300">Total Volunteers</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 dark:bg-gray-800 dark:text-white">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
              <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold dark:text-white">{formatNumber(totalVolunteerHours)}</h3>
              <p className="text-gray-400 dark:text-gray-300">Total Hours</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 dark:bg-gray-800 dark:text-white">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold dark:text-white">{totalActivities}</h3>
              <p className="text-gray-400 dark:text-gray-300">Activities</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 dark:bg-gray-800 dark:text-white">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full dark:bg-orange-900">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold dark:text-white">{engagementMetrics.retentionRate}%</h3>
              <p className="text-gray-400 dark:text-gray-300">Return Rate</p>
            </div>
          </div>
        </Card>
      </div>

      {/* ROI Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 dark:bg-gray-800 dark:text-white">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">ROI Analysis</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">Students Reached</span>
              <span className="font-bold dark:text-white">{roiMetrics.totalStudentsReached}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">Impact per Hour</span>
              <span className="font-bold dark:text-white">{roiMetrics.avgImpactPerHour.toFixed(2)} students/hour</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">Total Program Value</span>
              <span className="font-bold dark:text-white">${roiMetrics.totalValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">Company Investment</span>
              <span className="font-bold dark:text-white">${roiMetrics.companyInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">ROI</span>
              <span className="font-bold dark:text-white">{roiMetrics.roi.toFixed(1)}%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 dark:bg-gray-800 dark:text-white">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Partnership Effectiveness</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">Total Participants</span>
              <span className="font-bold dark:text-white">{partnershipMetrics.totalParticipants}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">Avg Participants/Activity</span>
              <span className="font-bold dark:text-white">{partnershipMetrics.avgParticipantsPerActivity.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">Participation Rate</span>
              <span className="font-bold dark:text-white">{partnershipMetrics.participationRate}%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 dark:bg-gray-800 dark:text-white">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Long-term Engagement</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">Avg Activities/Volunteer</span>
              <span className="font-bold dark:text-white">{engagementMetrics.avgActivitiesPerVolunteer.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">Active Volunteers</span>
              <span className="font-bold dark:text-white">{engagementMetrics.activeVolunteers}/{leaderboard.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-300">Return Rate</span>
              <span className="font-bold dark:text-white">{engagementMetrics.retentionRate}%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 dark:bg-gray-800 dark:text-white">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Department Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="department" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }} 
                itemStyle={{ color: '#F9FAFB' }} 
              />
              <Legend />
              <Bar dataKey="hours" name="Total Hours" fill="#8884d8" />
              <Bar dataKey="activities" name="Activities Completed" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 dark:bg-gray-800 dark:text-white">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topDepartments}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {topDepartments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }} 
                itemStyle={{ color: '#F9FAFB' }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 dark:bg-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 dark:divide-gray-700">
            <thead className="bg-gray-800 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider dark:text-gray-300">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider dark:text-gray-300">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider dark:text-gray-300">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider dark:text-gray-300">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-900 dark:divide-gray-700 dark:bg-gray-900">
              {recentActivity.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200 dark:text-gray-200">{activity.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200 dark:text-gray-200">{activity.activity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200 dark:text-gray-200">{activity.hours}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200 dark:text-gray-200">{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Time-based Simulation */}
      <Card className="p-6 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold dark:text-white">Program Growth Simulation</h3>
          <button 
            onClick={() => setShowSimulation(!showSimulation)}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            {showSimulation ? 'Hide' : 'Show'} Simulation
          </button>
        </div>
        
        {showSimulation && (
          <div>
            <p className="text-gray-400 dark:text-gray-300 mb-4 text-sm">
              This simulation shows how the program metrics would evolve over time with increased participation and engagement.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="p-4 dark:bg-gray-700">
                <h4 className="font-medium mb-2 dark:text-white">Growth Over Time</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={timeChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }} 
                      itemStyle={{ color: '#F9FAFB' }} 
                    />
                    <Legend />
                    <Bar dataKey="volunteers" name="Volunteers" fill="#8884d8" />
                    <Bar dataKey="hours" name="Total Hours" fill="#82ca9d" />
                    <Bar dataKey="students" name="Students Reached" fill="#FFBB28" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              
              <Card className="p-4 dark:bg-gray-700">
                <h4 className="font-medium mb-2 dark:text-white">ROI Growth</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={timeChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }} 
                      itemStyle={{ color: '#F9FAFB' }} 
                    />
                    <Legend />
                    <Bar dataKey="roi" name="ROI (%)" fill="#FF8042" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            
            <div className="text-sm text-gray-400 dark:text-gray-300">
              <p className="mb-2">Simulation assumptions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>3-8 volunteering opportunities per month (with monthly variance)</li>
                <li>1-20 participants per opportunity (average 10)</li>
                <li>1:1 employee to student ratio</li>
                <li><strong>Return Rate</strong>: Percentage of employees who participate in more than one activity (measuring platform engagement)</li>
                <li><strong>ROI Calculation</strong>: (Total Value of Volunteer Hours / Company Investment) × 100, where value = hours × $25/hour</li>
              </ul>
            </div>
          </div>
        )}
      </Card>

      {/* Business Value Insights */}
      <Card className="p-6 dark:bg-gray-800 dark:text-white">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Business Value Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2 dark:text-white">Company Image Enhancement</h4>
            <p className="text-gray-400 dark:text-gray-300 text-sm">
              This platform demonstrates Thales' commitment to social responsibility and community engagement, enhancing our public reputation.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2 dark:text-white">Employee Engagement</h4>
            <p className="text-gray-400 dark:text-gray-300 text-sm">
              Employees are more engaged when they see the direct impact of their contributions to meaningful causes.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2 dark:text-white">Partnership Value</h4>
            <p className="text-gray-400 dark:text-gray-300 text-sm">
              Our partnership with non-profit organizations creates lasting impact while showcasing our values.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2 dark:text-white">Return on Investment</h4>
            <p className="text-gray-400 dark:text-gray-300 text-sm">
              With a {roiMetrics.roi.toFixed(2)}% ROI, the program provides measurable value beyond just community impact.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}