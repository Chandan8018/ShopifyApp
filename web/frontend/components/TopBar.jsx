import React from "react";
import { NavLink } from "react-router-dom";

export function TopBar() {
  return (
    <div className='topbar-section'>
      <div className='logo-block'>
        <img className='logo' src='../assets/logo (1).png' alt='logo image' />
        <h1 className='text-bold h4'>Graphycal Dashboard</h1>
        <NavLink to='/'> Sales </NavLink>
        <NavLink to='/products'> Products </NavLink>
      </div>
    </div>
  );
}
