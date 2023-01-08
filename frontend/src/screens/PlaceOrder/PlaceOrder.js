import React, { useContext, useEffect, useReducer } from 'react';
import Helmet from '../../components/Helmet';
import { toast } from 'react-toastify';

import './PlaceOrder.css';
import '../../App.css';
import CheckoutSteps from '../../components/CheckoutSteps';
import LoadingBox from '../../components/LoadingBox';
import { Col, Row } from 'react-bootstrap';
import { Store } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getError } from '../../utils.js';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };

    case 'CREATE_SUCCESS':
      return { ...state, loading: false };

    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

function PlaceOrder() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart,
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  cart.delivery = round2(20);
  cart.totalPrice = cart.itemsPrice + cart.delivery;

  useEffect(() => {
    if (!paymentMethod) {
      navigate('/payment?redirect=/placeorder');
    }
  }, [paymentMethod, navigate]);

  const submitHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          delivery: cart.delivery,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };
  return (
    <Helmet title="Place Order">
      <div className="placeorder">
        <div className="page__banner">
          <div className="page__banner_text">
            <span>Place Order Details</span>
          </div>
        </div>

        <div className="placeorder__details">
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

          <Row className="product__info">
            <Col md={6} className="products_col">
              <div className="products">
                <h4>Products</h4>
                <div className="cart__items">
                  {cartItems.map((item) => (
                    <Row
                      className="item__row d-flex align-items-center"
                      key={item._id}
                    >
                      <Col md={3} className="item__image">
                        <img src={item.imgUrl} alt={item.name} />
                      </Col>
                      <Col md={6}>
                        <h5>{item.name}</h5>
                      </Col>
                      <Col md={3}>R{item.quantity * item.price}</Col>
                    </Row>
                  ))}
                </div>
                <Link to="/cart">
                  <h6>Edit</h6>
                </Link>
              </div>
              <div className="address">
                <h4>Address</h4>
                <div className="address_details">
                  <p>{shippingAddress.fullname}</p>
                  <p>{shippingAddress.address}</p>
                  <p>{shippingAddress.city}</p>
                  <p>{shippingAddress.zip}</p>
                </div>
                <Link to="/shipping">
                  <h6>Edit</h6>
                </Link>
              </div>
            </Col>
            <Col md={6} className="payment_col order__summary">
              <div className="payment__type">
                <Row>
                  <Col md={6}>
                    <h3>Payment Method:</h3>
                  </Col>
                  <Col md={4}>
                    <span>{paymentMethod}</span>
                  </Col>
                  <Col md={2}>
                    <Link to="/payment">
                      <h6>Edit</h6>
                    </Link>
                  </Col>
                </Row>
              </div>
              <Row>
                <h4>Order Summary</h4>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col md={6} className="titles">
                    Cart items:
                  </Col>
                  <Col md={6} className="outcomes">
                    {cartItems.reduce((a, c) => a + c.quantity, 0)} items
                  </Col>
                </div>

                <div className="d-flex">
                  <Col md={6} className="titles">
                    Cart total:
                  </Col>
                  <Col md={6} className="outcomes">
                    R{cart.itemsPrice.toFixed(2)}{' '}
                  </Col>
                </div>

                <div className="d-flex">
                  <Col md={6} className="titles">
                    Delivery:
                  </Col>
                  <Col md={6} className="outcomes">
                    R{cart.delivery.toFixed(2)}
                  </Col>
                </div>
              </Row>

              <Row>
                <Col md={6} className="titles">
                  Subtotal:
                </Col>
                <Col md={6} className="outcomes">
                  R{cart.totalPrice.toFixed(2)}
                </Col>
              </Row>

              <Row>
                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  className="button__primary_icon"
                  onClick={submitHandler}
                >
                  <span>Place Order</span>
                  <Icon icon="material-symbols:arrow-right-alt-rounded" />
                </button>
              </Row>
              {loading && <LoadingBox></LoadingBox>}
            </Col>
          </Row>
        </div>
      </div>
    </Helmet>
  );
}

export default PlaceOrder;
