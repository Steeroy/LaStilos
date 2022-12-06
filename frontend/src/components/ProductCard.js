import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Icon } from '@iconify/react';

import '../App.css';

function ProductCard({ item }) {
  return (
    <div className="product__card">
      <Link to={`/product/${item.slug}`}>
        <div className="product__img-box">
          <img src={item.imgUrl} alt={item.name} />
        </div>
      </Link>

      <Link to={`/product/${item.slug}`}>
        <h6>{item.name}</h6>
      </Link>
      <h5>R{item.price}</h5>

      <Rating rating={item.rating} />

      <div className="addButtons">
        <button className="button__primary_small_icon">
          <span>Add to Cart</span>
          <Icon icon="material-symbols:shopping-bag-outline" />
        </button>
        <button className="button__small_heart">
          <Icon icon="mdi:cards-heart-outline" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
