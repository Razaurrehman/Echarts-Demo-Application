import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom w-100">
      <div className="container-fluid">
        <button
          className="btn btn-outline-primary d-md-none"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <a className="navbar-brand ms-3" href="#">My App</a>
      </div>
    </nav>
  );
};

export default Header;
