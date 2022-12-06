import React from 'react';
import '../App.css';
import { Icon } from '@iconify/react';

export default function Footer() {
  return (
    <div className="footer">
      <div className="top__footer">
        <div className="useful__links">
          <h5>Useful links</h5>

          <div>
            <p>About Us</p>
            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
            <p>FAQs</p>
          </div>
        </div>

        <div className="get_in_touch">
          <h5>Get in touch with us</h5>

          <div className="contact__links">
            <div className="address">
              <h6>Address</h6>
              <p>
                Motherwell, Port Elizabeth <br />
                Eastern Cape, 6211
              </p>
            </div>

            <div className="call__us">
              <h6>Call Us</h6>
              <p>071 234 5678</p>
            </div>

            <div className="email">
              <h6>Email</h6>
              <p>steeroy10@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="newsletter">
          <span className="logo__text">La Stilos.</span>

          <div className="subscribe__text">
            <h3>Subscribe to our newsletter</h3>
            <p>Get our latest menus and specials</p>
          </div>

          <div className="input__subscribe">
            <input placeholder="Enter your email" type="email" />
            <button className="button__primary_small_icon">
              <span>Subscribe</span>
              <Icon icon="material-symbols:arrow-right-alt-rounded" />
            </button>
          </div>
        </div>
      </div>

      <div className="footer__separator"></div>
      <div className="copyright__section">
        <p>Copyright 2022 | All rights reserved</p>
        <p>Designed & Programmed by Siyanda Mvunyiswa</p>

        <div className="socials">
          <Icon icon="ph:twitter-logo-bold" />
          <Icon icon="ph:instagram-logo-bold" />
          <Icon icon="tabler:brand-facebook" />
        </div>
      </div>
    </div>
  );
}
