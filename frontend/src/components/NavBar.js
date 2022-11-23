import React from 'react';
import { Navbar, NavbarBrand } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import '../App.css';
import { NavLink } from 'react-router-dom';

const nav__links = [
  {
    display: 'Home',
    path: '/home',
  },
  {
    display: 'Menu',
    path: '/menu',
  },
  {
    display: 'About Us',
    path: '/about',
  },
  {
    display: 'Contact Us',
    path: '/contact',
  },
];

export default function NavBar() {
  return (
    <Navbar className="navbar">
      <div className="nav__content">
        <LinkContainer to="/home">
          <NavbarBrand className="logo">
            <h2>LaStilos.</h2>
          </NavbarBrand>
        </LinkContainer>

        <div className="navigation">
          <div className="menu d-flex gap-5">
            {nav__links.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? 'menu__active' : ''
                }
              >
                {item.display}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="right d-flex align-items-center gap-4">
          <NavLink to="/favorites">
            <Icon icon="mdi:cards-heart-outline" />
          </NavLink>

          <NavLink to="/cart">
            <Icon icon="ri:shopping-basket-2-line" />
          </NavLink>

          <Link to="/signin">
            <button className="button__primary_icon">
              <span>Sign In</span> <Icon icon="mdi:sign-in" />
            </button>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}
