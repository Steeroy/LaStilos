import React from 'react';
import { Icon } from '@iconify/react';
import '../App.css';

function MenuCard({ icon, title, isActive }) {
  return (
    <div className={`menu__card ${isActive ? 'activeMenu' : ''}`}>
      <div className="icon__circle">
        <Icon icon={icon} />
      </div>

      <h5>{title}</h5>
    </div>
  );
}

export default MenuCard;
