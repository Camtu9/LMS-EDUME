// import React, { useState } from 'react';
// import { FaUser, FaLock, FaBookOpen } from 'react-icons/fa';
// import MyEnrollments from './students/MyEnrollments';

// const UserPage = () => {
//   const [selectedTab, setSelectedTab] = useState('userInfo');
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   const handleTabChange = (key: string) => setSelectedTab(key);

//   const tabContent = () => {
//     switch (selectedTab) {
//       case 'userInfo':
//         return <div className="text-gray-500">User Info Content</div>;
//       case 'changePassword':
//         return <div className="text-gray-500">Change Password Content</div>;
//       case 'orderCourse':
//         return <MyEnrollments />;
//       default:
//         return null;
//     }
//   };

//   if (!isLoggedIn) {
//     window.location.href = '/SignIn';
//     return null;
//   }

//   const tabs = [
//     { key: 'userInfo', label: 'User Information', icon: <FaUser /> },
//     { key: 'changePassword', label: 'Change Password', icon: <FaLock /> },
//     { key: 'orderCourse', label: 'My Enrollments', icon: <FaBookOpen /> },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row gap-6 w-[90%] mx-auto my-6">
//       <div className="md:w-1/4 w-full bg-white p-5 rounded-xl shadow-md">
//         {tabs.map((tab) => (
//           <div
//             key={tab.key}
//             onClick={() => handleTabChange(tab.key)}
//             className={`flex items-center gap-3 px-4 py-3 mb-3 rounded-lg cursor-pointer transition 
//               ${
//                 selectedTab === tab.key
//                   ? 'bg-blue-50 text-blue-500 font-semibold shadow'
//                   : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
//               }`}
//           >
//             <span className="text-lg">{tab.icon}</span>
//             <span>{tab.label}</span>
//           </div>
//         ))}
//       </div>

//       <div className="md:w-3/4 w-full bg-white p-5 rounded-xl shadow-md">
//         {tabContent()}
//       </div>
//     </div>
//   );
// };

// export default UserPage;
import React, { useEffect, useState } from 'react';
import { FaUser, FaLock, FaBookOpen } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import MyEnrollments from './students/MyEnrollments';
import UserInfor from '../components/UserInfor';

const UserPage = () => {
  const location = useLocation();
  const initialTab = location.state?.tab;
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleTabChange = (key: string) => setSelectedTab(key);

  const tabContent = () => {
    switch (selectedTab) {
      case 'userInfo':
        return <UserInfor/>;
      case 'changePassword':
        return <div className="text-gray-500">Change Password Content</div>;
      case 'orderCourse':
        return <MyEnrollments />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (location.state?.tab) {
      setSelectedTab(location.state.tab);
    }
  }, [location.state?.tab]);

  if (!isLoggedIn) {
    window.location.href = '/SignIn';
    return null;
  }

  const tabs = [
    { key: 'userInfo', label: 'User Information', icon: <FaUser /> },
    { key: 'changePassword', label: 'Change Password', icon: <FaLock /> },
    { key: 'orderCourse', label: 'My Enrollments', icon: <FaBookOpen /> },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 w-[90%] mx-auto my-6">
      <div className="md:w-1/4 w-full bg-white p-5 rounded-xl shadow-md">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`flex items-center gap-3 px-4 py-3 mb-3 rounded-lg cursor-pointer transition 
              ${
                selectedTab === tab.key
                  ? 'bg-blue-50 text-blue-500 font-semibold shadow'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </div>
        ))}
      </div>

      <div className="md:w-3/4 w-full bg-white p-5 rounded-xl shadow-md">
        {tabContent()}
      </div>
    </div>
  );
};

export default UserPage;
