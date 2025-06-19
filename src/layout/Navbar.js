import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css'; // Importujte styl

export default function Navbar() {
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
        <NavLink exact className="btn btn-success ml-auto" to="/addfighter">Add Fighter</NavLink>
      </div>
    </nav>
  );
}
