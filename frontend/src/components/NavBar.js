import React, { useContext, useRef } from 'react';
import { Badge, Navbar, NavbarBrand, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import { Store } from '../Store';

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
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('favourites');
  };

  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  return (
    <Navbar className="navbar">
      <div className="nav__content">
        <LinkContainer to="/home">
          <NavbarBrand className="logo">
            <h2>LaStilos.</h2>
          </NavbarBrand>
        </LinkContainer>

        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
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
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </NavLink>

          {userInfo ? (
            <NavDropdown
              title={userInfo.name}
              id="basic-nav-dropdown"
              className="button__primary_icon"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>User Profile</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/orderhistory">
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Divider />
              <Link className="dropdown-item" to="/" onClick={signOutHandler}>
                Sign Out
              </Link>
            </NavDropdown>
          ) : (
            <Link to="/signin">
              <button className="button__primary_icon">
                <span>Sign In</span> <Icon icon="mdi:sign-in" />
              </button>
            </Link>
          )}

          <div className="mobile__menu" onClick={toggleMenu}>
            <Icon icon="charm:menu-hamburger" />
          </div>
        </div>
      </div>
    </Navbar>
  );
}
