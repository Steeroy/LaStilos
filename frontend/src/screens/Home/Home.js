import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../App.css';
import { Icon } from '@iconify/react';
import hero__banner from '../../assets/hero_banner.png';

import './Home.css';
import '../../App.css';
import MenuCard from '../../components/MenuCard';

import data from '../../data.js';
import ProductCard from '../../components/ProductCard';

function Home() {
  const [category, setCategory] = useState('all');
  const [allProducts, setAllProducts] = useState(data.products);

  useEffect(() => {
    //Menu card active
    const menuCards = document
      .querySelector('.menu__row')
      .querySelectorAll('.menu__card');

    function setMenuActive() {
      menuCards.forEach((n) => n.classList.remove('activeMenu'));
      this.classList.add('activeMenu');
      setCategory(this.id);
    }

    menuCards.forEach((n) => n.addEventListener('click', setMenuActive));

    if (category === 'all') {
      setAllProducts(data.products);
    }

    if (category === 'burger') {
      const filteredProducts = data.products.filter(
        (item) => item.type === 'burger'
      );
      setAllProducts(filteredProducts);
    }

    if (category === 'pizza') {
      const filteredProducts = data.products.filter(
        (item) => item.type === 'pizza'
      );
      setAllProducts(filteredProducts);
    }

    if (category === 'bread') {
      const filteredProducts = data.products.filter(
        (item) => item.type === 'bread'
      );
      setAllProducts(filteredProducts);
    }

    if (category === 'drink') {
      const filteredProducts = data.products.filter(
        (item) => item.type === 'drink'
      );
      setAllProducts(filteredProducts);
    }

    if (category === 'salad') {
      const filteredProducts = data.products.filter(
        (item) => item.type === 'salad'
      );
      setAllProducts(filteredProducts);
    }

    if (category === 'dessert') {
      const filteredProducts = data.products.filter(
        (item) => item.type === 'dessert'
      );
      setAllProducts(filteredProducts);
    }
  }, [category]);

  return (
    <div className="home">
      {/* This is the hero section */}
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

      {/* This is the our services section */}
      <section className="services__section">
        <h2 className="section__title">What we offer</h2>

        <div className="services">
          <div className="service">
            <Icon icon="mdi:clock-fast" />
            <div className="service__content">
              <h5>Easy Order</h5>
              <p>Just a few clicks, you’re served.</p>
            </div>
          </div>
          <div className="service__separator"></div>
          <div className="service">
            <Icon icon="carbon:delivery" />
            <div className="service__content">
              <h5>Fast Delivery</h5>
              <p>Quick, you won’t even blink</p>
            </div>
          </div>
          <div className="service__separator"></div>
          <div className="service">
            <Icon icon="material-symbols:verified-user-outline-rounded" />
            <div className="service__content">
              <h5>Best Quality</h5>
              <p>Cooked with the best ingredients</p>
            </div>
          </div>
        </div>
      </section>

      <section className="menu__section">
        <h2 className="section__title">Our Menu</h2>

        <div className="menu__container">
          <div className="menu__row">
            {data.menus.map((item) => (
              <MenuCard
                icon={item.icon}
                title={item.title}
                isActive={item.slug === 'all' ? true : false}
                key={item.slug}
                itemId={item.slug}
              />
            ))}
          </div>
        </div>

        <div className="products__container">
          <Row>
            {allProducts.map((item) => (
              <Col md={2} className="product__col" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </div>
  );
}

export default Home;
