import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import LineChart from './pages/LineChart';
import AreaChart from './pages/AreaChart';
import SankeyDiagram from './pages/SankeyDiagram';
import BarChart from './pages/BarChart';
// import routes from './routes/routes';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Optional: Auto-close sidebar on window resize (if user resized to desktop)
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false); // Close sidebar on small screens
    }
  };

  // Run once in case user starts on small screen
  handleResize();

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div className="container-fluid">
        <div className="row">
          <Sidebar isOpen={sidebarOpen} />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
             <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bar-chart" element={<BarChart />} />
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/area-chart" element={<AreaChart />} />
              <Route path="/sankey-diagram" element={<SankeyDiagram />} />
            </Routes>
            {/* <Routes>
              {routes.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
              ))}
            </Routes> */}
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
