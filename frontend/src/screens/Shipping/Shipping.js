import React, { useContext, useEffect, useState } from 'react';
import Helmet from '../../components/Helmet';
import { Icon } from '@iconify/react';

import '../../App.css';
import './Shipping.css';
import CheckoutSteps from '../../components/CheckoutSteps';
import {
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';

function Shipping() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingAddress },
    userInfo,
  } = state;

  const navigate = useNavigate();
  const [fullname, setFullname] = useState(shippingAddress.fullname || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [zip, setZip] = useState(shippingAddress.zip || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const checkoutHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullname,
        address,
        city,
        zip,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullname,
        address,
        city,
        zip,
      })
    );
    navigate('/payment');
  };

  return (
    <Helmet title="Shipping">
      <div className="shipping">
        <div className="page__banner">
          <div className="page__banner_text">
            <span>Delivery Details</span>
          </div>
        </div>

        <div className="shipping__info">
          <CheckoutSteps step1 step2></CheckoutSteps>

          <Row className="info__row">
            <Col md={8}>
              <Form>
                <FormGroup className="fullname">
                  <FormLabel>Fullname:</FormLabel>
                  <FormControl
                    type="text"
                    required
                    placeholder="E.g John Doe"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="street">
                  <FormLabel>Street Address:</FormLabel>
                  <FormControl
                    type="text"
                    required
                    value={address}
                    placeholder="E.g 123 ABC Road"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>

                <div className="zip__city">
                  <FormGroup>
                    <FormLabel>City:</FormLabel>
                    <FormControl
                      type="text"
                      required
                      placeholder="E.g Rowland"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Zip:</FormLabel>
                    <FormControl
                      type="text"
                      required
                      placeholder="E.g 6211"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </Form>
            </Col>

            <Col md={4} className="order__summary">
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
                    R{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}{' '}
                  </Col>
                </div>

                <div className="d-flex">
                  <Col md={6} className="titles">
                    Delivery:
                  </Col>
                  <Col md={6} className="outcomes">
                    R20
                  </Col>
                </div>
              </Row>
              <Row>
                <Col md={6} className="titles">
                  Subtotal:
                </Col>
                <Col md={6} className="outcomes">
                  R
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0) + 20}
                </Col>
              </Row>
              <Row>
                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  className="button__primary_icon"
                  onClick={checkoutHandler}
                >
                  <span>Proceed to Payment</span>
                  <Icon icon="material-symbols:arrow-right-alt-rounded" />
                </button>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </Helmet>
  );
}

export default Shipping;
