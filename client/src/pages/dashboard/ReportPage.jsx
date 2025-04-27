import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reportType, setReportType] = useState('enrollment');
  const [timeRange, setTimeRange] = useState('month');
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/reports/${reportType}?timeRange=${timeRange}`);
        setReportData(response.data.data || []);
      } catch (error) {
        console.error('Error fetching report data:', error);
        // For demo, let's add some mock data
        setMockData();
      } finally {
        setIsLoading(false);
      }
    };

    const setMockData = () => {
      if (reportType === 'enrollment') {
        setReportData([
          { date: '2023-01-01', count: 12 },
          { date: '2023-02-01', count: 18 },
          { date: '2023-03-01', count: 25 },
          { date: '2023-04-01', count: 15 },
          { date: '2023-05-01', count: 22 },
          { date: '2023-06-01', count: 30 },
        ]);
      } else if (reportType === 'revenue') {
        setReportData([
          { date: '2023-01-01', amount: 1200 },
          { date: '2023-02-01', amount: 1800 },
          { date: '2023-03-01', amount: 2500 },
          { date: '2023-04-01', amount: 1500 },
          { date: '2023-05-01', amount: 2200 },
          { date: '2023-06-01', amount: 3000 },
        ]);
      } else if (reportType === 'users') {
        setReportData([
          { date: '2023-01-01', count: 25, type: 'student' },
          { date: '2023-02-01', count: 30, type: 'student' },
          { date: '2023-03-01', count: 40, type: 'student' },
          { date: '2023-01-01', count: 5, type: 'tutor' },
          { date: '2023-02-01', count: 7, type: 'tutor' },
          { date: '2023-03-01', count: 10, type: 'tutor' },
        ]);
      }
    };

    fetchReportData();
  }, [reportType, timeRange]);

  const handleExportCSV = () => {
    // In a real app, implement CSV export
    alert('CSV Export functionality would be implemented here');
  };

  const handleExportPDF = () => {
    // In a real app, implement PDF export
    alert('PDF Export functionality would be implemented here');
  };

  const renderReportContent = () => {
    if (reportType === 'enrollment') {
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Enrollment Report</h3>
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    New Enrollments
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(row.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (reportType === 'revenue') {
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Report</h3>
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(row.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${row.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (reportType === 'users') {
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Users Report</h3>
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    New Registrations
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(row.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {row.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              id="reportType"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="enrollment">Enrollment Report</option>
              <option value="revenue">Revenue Report</option>
              <option value="users">User Registration Report</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <select
              id="timeRange"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div className="flex items-end space-x-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Export CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        renderReportContent()
      )}
    </div>
  );
};

export default Reports;