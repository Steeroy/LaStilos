import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Icon } from '@iconify/react';

import '../App.css';
import axios from 'axios';
import { Store } from '../Store';

function ProductCard({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const [clicked, setClicked] = useState('no');

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.inStock < quantity) {
      window.alert('Sorry. Product out of stock');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const addToFavouritesHandler = (item) => {
    ctxDispatch({ type: 'ADD_FAVOURITE', payload: item });
    setClicked('yes');
  };

  const removeToFavouritesHandler = (item) => {
    ctxDispatch({ type: 'REMOVE_FAVOURITE', payload: item });
    setClicked('no');
  };

  return (
    <div className="product__card">
      <Link to={`/product/${product.slug}`}>
        <div className="product__img-box">
          <img src={product.imgUrl} alt={product.name} />
        </div>
      </Link>

      <Link to={`/product/${product.slug}`}>
        <h6>{product.name}</h6>
      </Link>
      <h5>R{product.price}</h5>

      <Rating rating={product.rating} />

      <div className="addButtons">
        <button
          className="button__primary_small_icon"
          onClick={() => addToCartHandler(product)}
        >
          <span>Add to Cart</span>
          <Icon icon="material-symbols:shopping-bag-outline" />
        </button>
        <button
          className="button__small_heart"
          onClick={() =>
            clicked === 'no'
              ? addToFavouritesHandler(product)
              : removeToFavouritesHandler(product)
          }
        >
          <Icon icon="mdi:cards-heart-outline" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
