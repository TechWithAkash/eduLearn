// import React, { useState, useEffect } from 'react';
// import { api } from '../../../services/api';
// import LoadingSpinner from '../../common/LoadingSpinner';

// const Reports = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [reportType, setReportType] = useState('enrollment');
//   const [timeRange, setTimeRange] = useState('month');
//   const [reportData, setReportData] = useState([]);

//   useEffect(() => {
//     const fetchReportData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await api.get(`/reports/${reportType}?timeRange=${timeRange}`);
//         setReportData(response.data.data || []);
//       } catch (error) {
//         console.error('Error fetching report data:', error);
//         // For demo, let's add some mock data
//         setMockData();
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const setMockData = () => {
//       if (reportType === 'enrollment') {
//         setReportData([
//           { date: '2023-01-01', count: 12 },
//           { date: '2023-02-01', count: 18 },
//           { date: '2023-03-01', count: 25 },
//           { date: '2023-04-01', count: 15 },
//           { date: '2023-05-01', count: 22 },
//           { date: '2023-06-01', count: 30 },
//         ]);
//       } else if (reportType === 'revenue') {
//         setReportData([
//           { date: '2023-01-01', amount: 1200 },
//           { date: '2023-02-01', amount: 1800 },
//           { date: '2023-03-01', amount: 2500 },
//           { date: '2023-04-01', amount: 1500 },
//           { date: '2023-05-01', amount: 2200 },
//           { date: '2023-06-01', amount: 3000 },
//         ]);
//       } else if (reportType === 'users') {
//         setReportData([
//           { date: '2023-01-01', count: 25, type: 'student' },
//           { date: '2023-02-01', count: 30, type: 'student' },
//           { date: '2023-03-01', count: 40, type: 'student' },
//           { date: '2023-01-01', count: 5, type: 'tutor' },
//           { date: '2023-02-01', count: 7, type: 'tutor' },
//           { date: '2023-03-01', count: 10, type: 'tutor' },
//         ]);
//       }
//     };

//     fetchReportData();
//   }, [reportType, timeRange]);

//   const handleExportCSV = () => {
//     // In a real app, implement CSV export
//     alert('CSV Export functionality would be implemented here');
//   };

//   const handleExportPDF = () => {
//     // In a real app, implement PDF export
//     alert('PDF Export functionality would be implemented here');
//   };

//   const renderReportContent = () => {
//     if (reportType === 'enrollment') {
//       return (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Enrollment Report</h3>
//           <div className="bg-white rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     New Enrollments
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {reportData.map((row, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(row.date).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {row.count}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     } else if (reportType === 'revenue') {
//       return (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Report</h3>
//           <div className="bg-white rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Revenue
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {reportData.map((row, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(row.date).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       ${row.amount.toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     } else if (reportType === 'users') {
//       return (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Users Report</h3>
//           <div className="bg-white rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     User Type
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     New Registrations
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {reportData.map((row, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(row.date).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
//                       {row.type}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {row.count}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     }
    
//     return null;
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports</h1>
      
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
//               Report Type
//             </label>
//             <select
//               id="reportType"
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md"
//               value={reportType}
//               onChange={(e) => setReportType(e.target.value)}
//             >
//               <option value="enrollment">Enrollment Report</option>
//               <option value="revenue">Revenue Report</option>
//               <option value="users">User Registration Report</option>
//             </select>
//           </div>
          
//           <div>
//             <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
//               Time Range
//             </label>
//             <select
//               id="timeRange"
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md"
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//             >
//               <option value="week">Last Week</option>
//               <option value="month">Last Month</option>
//               <option value="year">Last Year</option>
//               <option value="all">All Time</option>
//             </select>
//           </div>
          
//           <div className="flex items-end space-x-3">
//             <button
//               onClick={handleExportCSV}
//               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//             >
//               Export CSV
//             </button>
//             <button
//               onClick={handleExportPDF}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Export PDF
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {isLoading ? (
//         <div className="text-center py-10">
//           <LoadingSpinner />
//         </div>
//       ) : (
//         renderReportContent()
//       )}
//     </div>
//   );
// };

// export default Reports;

import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../../services/api';
import LoadingSpinner from '../../common/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reportType, setReportType] = useState('enrollment');
  const [timeRange, setTimeRange] = useState('month');
  const [reportData, setReportData] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    total: 0,
    average: 0,
    percentChange: 0
  });

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setIsLoading(true);
        
        // Make API call to get report data
        const response = await api.get(`/reports/${reportType}?timeRange=${timeRange}`);
        
        if (response.data && response.data.success) {
          setReportData(response.data.data || []);
          
          // Calculate summary statistics
          calculateSummaryStats(response.data.data || []);
        } else {
          throw new Error("Failed to fetch report data");
        }
      } catch (error) {
        console.error('Error fetching report data:', error);
        toast.error('Could not load report data. Using sample data instead.');
        
        // Use mock data as fallback
        const mockData = generateMockData();
        setReportData(mockData);
        calculateSummaryStats(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, [reportType, timeRange]);

  const calculateSummaryStats = (data) => {
    if (!data || data.length === 0) {
      setSummaryStats({ total: 0, average: 0, percentChange: 0 });
      return;
    }

    let total = 0;
    let valueKey = reportType === 'revenue' ? 'amount' : 'count';
    
    // For user reports, we need to sum all user types
    if (reportType === 'users') {
      // Group by date and sum counts
      const dateGroups = data.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += item.count;
        return acc;
      }, {});
      
      total = Object.values(dateGroups).reduce((sum, count) => sum + count, 0);
    } else {
      total = data.reduce((sum, item) => sum + item[valueKey], 0);
    }
    
    const average = total / (data.length || 1);
    
    // Calculate percent change from first to last period
    let percentChange = 0;
    if (data.length >= 2) {
      if (reportType === 'users') {
        // For users, we need to compare the most recent dates
        const dates = [...new Set(data.map(item => item.date))].sort();
        const firstDate = dates[0];
        const lastDate = dates[dates.length - 1];
        
        const firstValue = data
          .filter(item => item.date === firstDate)
          .reduce((sum, item) => sum + item.count, 0);
          
        const lastValue = data
          .filter(item => item.date === lastDate)
          .reduce((sum, item) => sum + item.count, 0);
          
        percentChange = firstValue > 0 
          ? ((lastValue - firstValue) / firstValue) * 100 
          : 0;
      } else {
        const firstValue = data[0][valueKey];
        const lastValue = data[data.length - 1][valueKey];
        percentChange = firstValue > 0 
          ? ((lastValue - firstValue) / firstValue) * 100 
          : 0;
      }
    }

    setSummaryStats({
      total,
      average: parseFloat(average.toFixed(2)),
      percentChange: parseFloat(percentChange.toFixed(2))
    });
  };

  // Generate mock data if API fails
  const generateMockData = () => {
    const now = new Date();
    const mockData = [];
    
    if (reportType === 'enrollment') {
      // Last 6 months of enrollment data
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        mockData.push({
          date: date.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 30) + 10
        });
      }
    } else if (reportType === 'revenue') {
      // Last 6 months of revenue data
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        mockData.push({
          date: date.toISOString().split('T')[0],
          amount: Math.floor(Math.random() * 2000) + 1000
        });
      }
    } else if (reportType === 'users') {
      // Last 3 months of user registration data with separate student and tutor counts
      for (let i = 2; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const formattedDate = date.toISOString().split('T')[0];
        
        mockData.push({
          date: formattedDate,
          type: 'student',
          count: Math.floor(Math.random() * 25) + 15
        });
        
        mockData.push({
          date: formattedDate,
          type: 'tutor',
          count: Math.floor(Math.random() * 8) + 3
        });
        
        mockData.push({
          date: formattedDate,
          type: 'admin',
          count: Math.floor(Math.random() * 2) + 1
        });
      }
    }
    
    return mockData;
  };

  // Chart data preparation
  const chartData = useMemo(() => {
    if (!reportData || reportData.length === 0) return null;
    
    let labels = [];
    let datasets = [];
    
    if (reportType === 'enrollment') {
      // Sort data by date
      const sortedData = [...reportData].sort((a, b) => new Date(a.date) - new Date(b.date));
      
      labels = sortedData.map(item => {
        const date = new Date(item.date);
        return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      });
      
      datasets = [
        {
          label: 'New Enrollments',
          data: sortedData.map(item => item.count),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1
        }
      ];
    } else if (reportType === 'revenue') {
      // Sort data by date
      const sortedData = [...reportData].sort((a, b) => new Date(a.date) - new Date(b.date));
      
      labels = sortedData.map(item => {
        const date = new Date(item.date);
        return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      });
      
      datasets = [
        {
          label: 'Revenue ($)',
          data: sortedData.map(item => item.amount),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.1
        }
      ];
    } else if (reportType === 'users') {
      // Get unique dates and types
      const uniqueDates = [...new Set(reportData.map(item => item.date))].sort();
      const uniqueTypes = [...new Set(reportData.map(item => item.type))];
      
      // Format dates for labels
      labels = uniqueDates.map(date => {
        const d = new Date(date);
        return `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
      });
      
      // Create a dataset for each user type
      const colors = {
        student: { border: 'rgb(75, 192, 192)', background: 'rgba(75, 192, 192, 0.5)' },
        tutor: { border: 'rgb(255, 159, 64)', background: 'rgba(255, 159, 64, 0.5)' },
        admin: { border: 'rgb(153, 102, 255)', background: 'rgba(153, 102, 255, 0.5)' }
      };
      
      datasets = uniqueTypes.map(type => {
        const typeData = uniqueDates.map(date => {
          const matchingItem = reportData.find(item => item.date === date && item.type === type);
          return matchingItem ? matchingItem.count : 0;
        });
        
        return {
          label: type.charAt(0).toUpperCase() + type.slice(1),
          data: typeData,
          borderColor: colors[type]?.border || 'rgb(201, 203, 207)',
          backgroundColor: colors[type]?.background || 'rgba(201, 203, 207, 0.5)'
        };
      });
    }
    
    return { labels, datasets };
  }, [reportData, reportType]);

  // Export CSV data preparation
  const csvData = useMemo(() => {
    if (!reportData || reportData.length === 0) return [];
    
    let headers = [];
    let data = [];
    
    if (reportType === 'enrollment') {
      headers = ['Date', 'New Enrollments'];
      data = reportData.map(item => [
        new Date(item.date).toLocaleDateString(),
        item.count
      ]);
    } else if (reportType === 'revenue') {
      headers = ['Date', 'Revenue ($)'];
      data = reportData.map(item => [
        new Date(item.date).toLocaleDateString(),
        item.amount
      ]);
    } else if (reportType === 'users') {
      headers = ['Date', 'User Type', 'New Registrations'];
      data = reportData.map(item => [
        new Date(item.date).toLocaleDateString(),
        item.type,
        item.count
      ]);
    }
    
    return [headers, ...data];
  }, [reportData, reportType]);

  // Export PDF
  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Add title
      const title = reportType === 'enrollment' 
        ? 'Enrollment Report' 
        : reportType === 'revenue' 
          ? 'Revenue Report' 
          : 'User Registration Report';
      
      doc.setFontSize(18);
      doc.text(title, 14, 22);
      
      doc.setFontSize(12);
      doc.text(`Time Range: ${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}`, 14, 32);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);
      
      // Add summary
      doc.setFontSize(14);
      doc.text('Summary', 14, 50);
      
      doc.setFontSize(10);
      if (reportType === 'enrollment') {
        doc.text(`Total Enrollments: ${summaryStats.total}`, 14, 60);
        doc.text(`Average Enrollments: ${summaryStats.average} per period`, 14, 66);
        doc.text(`Growth Rate: ${summaryStats.percentChange}%`, 14, 72);
      } else if (reportType === 'revenue') {
        doc.text(`Total Revenue: $${summaryStats.total.toLocaleString()}`, 14, 60);
        doc.text(`Average Revenue: $${summaryStats.average.toLocaleString()} per period`, 14, 66);
        doc.text(`Growth Rate: ${summaryStats.percentChange}%`, 14, 72);
      } else {
        doc.text(`Total New Users: ${summaryStats.total}`, 14, 60);
        doc.text(`Average New Users: ${summaryStats.average} per period`, 14, 66);
        doc.text(`Growth Rate: ${summaryStats.percentChange}%`, 14, 72);
      }
      
      // Add table
      doc.setFontSize(14);
      doc.text('Detailed Data', 14, 90);
      
      let columns = [];
      let rows = [];
      
      if (reportType === 'enrollment') {
        columns = [
          { header: 'Date', dataKey: 'date' },
          { header: 'New Enrollments', dataKey: 'count' }
        ];
        rows = reportData.map(item => ({
          date: new Date(item.date).toLocaleDateString(),
          count: item.count
        }));
      } else if (reportType === 'revenue') {
        columns = [
          { header: 'Date', dataKey: 'date' },
          { header: 'Revenue ($)', dataKey: 'amount' }
        ];
        rows = reportData.map(item => ({
          date: new Date(item.date).toLocaleDateString(),
          amount: `$${item.amount.toLocaleString()}`
        }));
      } else {
        columns = [
          { header: 'Date', dataKey: 'date' },
          { header: 'User Type', dataKey: 'type' },
          { header: 'New Registrations', dataKey: 'count' }
        ];
        rows = reportData.map(item => ({
          date: new Date(item.date).toLocaleDateString(),
          type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
          count: item.count
        }));
      }
      
      doc.autoTable({
        startY: 100,
        head: [columns.map(col => col.header)],
        body: rows.map(row => columns.map(col => row[col.dataKey]))
      });
      
      // Save the PDF
      doc.save(`${reportType}_report_${timeRange}.pdf`);
      
      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
    }
  };

  const renderSummaryCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 uppercase">
            {reportType === 'enrollment' ? 'Total Enrollments' : 
             reportType === 'revenue' ? 'Total Revenue' : 'Total New Users'}
          </p>
          <p className="text-2xl font-bold mt-1">
            {reportType === 'revenue' ? `$${summaryStats.total.toLocaleString()}` : summaryStats.total}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
          <p className="text-sm text-gray-500 uppercase">
            {reportType === 'enrollment' ? 'Average Enrollments' : 
             reportType === 'revenue' ? 'Average Revenue' : 'Average New Users'}
          </p>
          <p className="text-2xl font-bold mt-1">
            {reportType === 'revenue' ? `$${summaryStats.average.toLocaleString()}` : summaryStats.average}
            <span className="text-sm font-normal text-gray-500 ml-1">per period</span>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-purple-500">
          <p className="text-sm text-gray-500 uppercase">Growth Rate</p>
          <p className={`text-2xl font-bold mt-1 ${
            summaryStats.percentChange > 0 ? 'text-green-600' : 
            summaryStats.percentChange < 0 ? 'text-red-600' : 'text-gray-600'
          }`}>
            {summaryStats.percentChange > 0 ? '+' : ''}
            {summaryStats.percentChange}%
          </p>
        </div>
      </div>
    );
  };

  const renderChart = () => {
    if (!chartData) return null;
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: reportType === 'enrollment' 
            ? 'Enrollment Trends' 
            : reportType === 'revenue' 
              ? 'Revenue Trends' 
              : 'User Registration Trends'
        },
      },
    };
    
    if (reportType === 'users') {
      return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <Bar options={options} data={chartData} height={80} />
        </div>
      );
    }
    
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <Line options={options} data={chartData} height={80} />
      </div>
    );
  };

  const renderReportTable = () => {
    if (reportType === 'enrollment') {
      return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
      );
    } else if (reportType === 'revenue') {
      return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
      );
    } else if (reportType === 'users') {
      return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
      );
    }
    
    return null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports Dashboard</h1>
        
        <div className="text-sm text-gray-500">
          <span className="mr-2">Last updated:</span>
          <span className="font-medium">{new Date().toLocaleString()}</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              id="reportType"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div className="flex items-end space-x-3">
            {csvData.length > 0 && (
              <CSVLink 
                data={csvData}
                filename={`${reportType}_report_${timeRange}.csv`}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                target="_blank"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </CSVLink>
            )}
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export PDF
            </button>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {renderSummaryCards()}
          {renderChart()}
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {reportType === 'enrollment' 
                ? 'Enrollment Details' 
                : reportType === 'revenue' 
                  ? 'Revenue Details' 
                  : 'User Registration Details'}
            </h3>
            {renderReportTable()}
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;