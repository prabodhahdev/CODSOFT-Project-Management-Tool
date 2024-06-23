import React from 'react';
import { Link } from 'react-router-dom';
import './SideNavBar.css';

const SideNavBar = () => {
  return (
    <div className='sidenavBar'>
      <ul>
        <li>
          <Link to="/main">Dashboard</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
        <li>
          <Link to="/tasks">Completed</Link>
        </li>
        <li>
          <Link to="/tasks">To do</Link>
        </li>
        <li>
          <Link to="/tasks">In Progress</Link>
        </li>
        <li>
          <Link to="/users">Members</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNavBar;
