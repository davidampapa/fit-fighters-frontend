import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../App.css';

export default function Navbar() {
  const location = useLocation();

  let actionButton = null;
  if (location.pathname.startsWith('/fighters')) {
    actionButton = (
      <NavLink className="btn btn-success ml-auto" to="/addfighter">
        Add Fighter
      </NavLink>
    );
  } else if (location.pathname.startsWith('/fights')) {
    actionButton = (
      <NavLink className="btn btn-success ml-auto" to="/addfight">
        Add Fight
      </NavLink>
    );
  } else if (location.pathname.startsWith('/places')) {
    actionButton = (
      <NavLink className="btn btn-success ml-auto" to="/addplace">
        Add Place
      </NavLink>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">FitFighters</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/fights" activeClassName="active">Fights</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/fighters" activeClassName="active">Fighters</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/places" activeClassName="active">Places</NavLink>
            </li>
          </ul>
        </div>
        {actionButton}
      </div>
    </nav>
  );
}
