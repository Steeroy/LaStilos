import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../App.css';
import { Icon } from '@iconify/react';
import hero__banner from '../../assets/hero_banner.png';

import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="whole_hero">
        <div className="hero__section">
          <Row>
            <Col md={7} className="hero__content">
              <div className="hero__texts">
                <h1>
                  <span>Hey Bestie!</span> Get the <span>best</span> and the{' '}
                  <span>fastest</span> right at you door step
                </h1>
                <p>
                  We promise and guarantee to serve only the best and{' '}
                  <span>freshest</span> at the fastest time possible
                </p>
              </div>
              <div className="hero__buttons">
                <Link to="/menu">
                  <button className="button__primary_icon">
                    <span>Shop Now</span>
                    <Icon icon="ic:outline-shopping-cart" />
                  </button>
                </Link>
                <Link to="/orders">
                  <button className="button__secondary_icon">
                    <span>View Orders</span>
                    <Icon icon="mdi:order-bool-descending-variant" />
                  </button>
                </Link>
              </div>
            </Col>
            <Col md={5} className="hero__img_col">
              <div className="hero__img">
                <img src={hero__banner} alt="food" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Home;
