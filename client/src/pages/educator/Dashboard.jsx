import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/students/Loading";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="min-h-screen flex flex-col p-4 md:p-8 space-y-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Enrollments */}
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all">
          <img
            src={assets.patients_icon}
            alt="Total Enrollments"
            className="h-16 w-16 mb-4"
          />
          <p className="text-4xl font-semibold text-blue-600">
            {dashboardData.enrolledStudentsData.length}
          </p>
          <p className="text-sm text-gray-500">Total Enrollments</p>
        </div>

        {/* Total Courses */}
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all">
          <img
            src={assets.appointments_icon}
            alt="Total Courses"
            className="h-16 w-16 mb-4"
          />
          <p className="text-4xl font-semibold text-green-600">
            {dashboardData.enrolledStudentsData.length}
          </p>
          <p className="text-sm text-gray-500">Total Courses</p>
        </div>

        {/* Total Earnings */}
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all">
          <img
            src={assets.earning_icon}
            alt="Total Earnings"
            className="h-16 w-16 mb-4"
          />
          <p className="text-4xl font-semibold text-yellow-600">
            {dashboardData.enrolledStudentsData.length}
          </p>
          <p className="text-sm text-gray-500">Total Earnings</p>
        </div>
      </div>
      <div>
        <h2 className="pb-2 text-lg font-medium">Latest Enrollments</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border-gray-500/20">
          <table className="table-fixed md:table-auto w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                  #
                </th>
                <th className="px-4 py-3 font-semibold text-center">
                  Student Name
                </th>
                <th className="px-4 py-3 font-semibold text-center">
                  Course Title
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} className="border-b border-gray-500/20">
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {index + 1}
                  </td>
                  <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                    <img
                      src={item.student.imageUrl}
                      className="w-9 h-9 rounded-full"
                    />
                    <span className="truncate">{item.student.name}</span>
                  </td>
                  <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
