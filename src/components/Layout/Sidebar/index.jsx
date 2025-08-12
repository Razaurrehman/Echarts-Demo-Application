import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <nav
      className={`col-md-3 col-lg-2 bg-light sidebar p-3 ${isOpen ? 'show' : ''}`}
      id="sidebar"
    >
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/bar-chart">Bar Chart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/line-chart">Line Chart</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/area-chart">Area Chart</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/sankey-diagram">Sankey Diagram</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
