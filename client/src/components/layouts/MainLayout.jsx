// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Header from '../../common/Header';
// import Footer from '../../common/Footer';

// const MainLayout = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default MainLayout;


import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../common/Header';
import Footer from '../../common/Footer';

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.includes('/login') || 
                      location.pathname.includes('/register') ||
                      location.pathname.includes('/forgot-password');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}
      <main className={`flex-grow ${isAuthPage ? 'bg-gray-50' : ''}`}>
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default MainLayout;