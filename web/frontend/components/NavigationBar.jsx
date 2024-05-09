import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BarChartIcon from "@mui/icons-material/BarChart";

export function NavigationBar() {
  return (
    <div className='navmenu-section'>
      <ul>
        <li title='Home'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span
              style={{ display: "flex", justifyContent: "start", gap: "5px" }}
            >
              <HomeIcon />
              Home
            </span>
          </NavLink>
        </li>

        <li title='Graphs'>
          <NavLink
            to='/abandonedgraph'
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span
              style={{ display: "flex", justifyContent: "start", gap: "5px" }}
            >
              <BarChartIcon />
              Abandoned
            </span>
          </NavLink>
        </li>
        <li title='Graphs'>
          <NavLink
            to='/ordersgraph'
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span
              style={{ display: "flex", justifyContent: "start", gap: "5px" }}
            >
              <BarChartIcon />
              Orders
            </span>
          </NavLink>
        </li>
        <li title='Graphs'>
          <NavLink
            to='/refundsgraph'
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span
              style={{ display: "flex", justifyContent: "start", gap: "5px" }}
            >
              <BarChartIcon />
              Refunds
            </span>
          </NavLink>
        </li>
        <li title='Graphs'>
          <NavLink
            to='/fullfillmentsgraph'
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span
              style={{ display: "flex", justifyContent: "start", gap: "5px" }}
            >
              <BarChartIcon />
              Fullfillments
            </span>
          </NavLink>
        </li>

        <li title='About us'>
          <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span
              style={{ display: "flex", justifyContent: "start", gap: "5px" }}
            >
              <InfoIcon />
              About
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
