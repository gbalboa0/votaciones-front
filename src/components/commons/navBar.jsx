import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
        Binit
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavLink to="/Capacities/Create" className="nav-item nav-link">
              Capacities
            </NavLink>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
