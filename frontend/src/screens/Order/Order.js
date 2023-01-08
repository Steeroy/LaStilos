import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Helmet from '../../components/Helmet';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { Store } from '../../Store';
import { getError } from '../../utils';
import { toast } from 'react-toastify';

import './Order.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };
    default:
      return state;
  }
};

function Order() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: '',
      successPay: false,
      loadingPay: false,
    });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid', {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err), {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  const onError = (err) => {
    toast.error(getError(err), {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate('/signin');
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);

  return (
    <Helmet title="Order">
      <div className="order">
        <div className="page__banner">
          <div className="page__banner_text">
            <span>Order Details</span>
          </div>
        </div>

        <div className="order__details">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="order__info">
              <h1 className="mb-3">Order {orderId}</h1>
              <Row>
                <Col md={8}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Shipping</Card.Title>
                      <Card.Text>
                        <strong>Name:</strong> {order.shippingAddress.fullname}{' '}
                        <br />
                        <strong>Address: </strong>
                        {order.shippingAddress.address},{' '}
                        {order.shippingAddress.city},{' '}
                        {order.shippingAddress.zip}
                      </Card.Text>
                      {order.isDelivered ? (
                        <MessageBox variant="success">
                          Delivered at {order.deliveredAt}
                        </MessageBox>
                      ) : (
                        <MessageBox variant="danger">Not Delivered</MessageBox>
                      )}
                    </Card.Body>
                  </Card>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Payment</Card.Title>
                      <Card.Text>
                        <strong>Method:</strong> {order.paymentMethod}
                      </Card.Text>
                      {order.isPaid ? (
                        <MessageBox variant="success">
                          Paid at {order.paidAt}
                        </MessageBox>
                      ) : (
                        <MessageBox variant="danger">Not Paid</MessageBox>
                      )}
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Items</Card.Title>
                      <ListGroup variant="flush">
                        {order.orderItems.map((item) => (
                          <ListGroupItem key={item._id}>
                            <Row className="align-items-center">
                              <Col md={6}>
                                <img
                                  src={item.imgUrl}
                                  alt={item.name}
                                  className="img-fluid rounded img-thumbnail"
                                />{' '}
                                <Link to={`/product/${item.slug}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={3}>
                                <span>{item.quantity}</span>
                              </Col>
                              <Col md={3}>R{item.price}</Col>
                            </Row>
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Order Summary</Card.Title>
                      <ListGroup variant="flush">
                        <ListGroupItem>
                          <Row>
                            <Col>Items:</Col>
                            <Col>R{order.itemsPrice.toFixed(2)}</Col>
                          </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                          <Row>
                            <Col>Delivery:</Col>
                            <Col>R{order.delivery.toFixed(2)}</Col>
                          </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                          <Row>
                            <Col>
                              <strong>Order Total:</strong>
                            </Col>
                            <Col>
                              <strong>R{order.totalPrice.toFixed(2)}</strong>
                            </Col>
                          </Row>
                        </ListGroupItem>
                        {!order.isPaid && (
                          <ListGroupItem>
                            {isPending ? (
                              <LoadingBox />
                            ) : order.paymentMethod === 'PayPal' ? (
                              <div>
                                <PayPalButtons
                                  createOrder={createOrder}
                                  onApprove={onApprove}
                                  onError={onError}
                                ></PayPalButtons>
                              </div>
                            ) : (
                              ' '
                            )}
                            {loadingPay && <LoadingBox />}
                          </ListGroupItem>
                        )}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </Helmet>
  );
}

export default Order;
