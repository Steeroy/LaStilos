import React, { useContext, useReducer, useState } from 'react';
import Helmet from '../../components/Helmet';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { Store } from '../../Store';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';

import './Profile.css';
import '../../App.css';
import { getError } from '../../utils';
import axios from 'axios';
import LoadingBox from '../../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

function Profile() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      if (password === confirmPassword) {
        const { data } = await axios.put(
          '/api/users/profile',
          {
            name,
            email,
            password,
          },
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'UPDATE_SUCCESS' });
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));

        toast.success(`Signed in as ${data.name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        dispatch({ type: 'UPDATE_FAIL' });
        toast.error(`Passwords dont match`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL' });
      toast.error(getError(err), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Helmet title="Profile">
      <div className="profile">
        <div className="page__banner">
          <div className="page__banner_text">
            <span>Profile</span>
          </div>
        </div>

        <div className="profile__info my-4">
          <Row>
            <Col md={4}>
              <div className="profile__img">
                <img src={userInfo.imgUrl} alt={userInfo.name} />
              </div>
            </Col>
            <Col md={8}>
              <Form onSubmit={submitHandler}>
                <FormGroup className="mb-3" controlId="name">
                  <FormLabel>Fullname</FormLabel>
                  <FormControl
                    value={name}
                    type="text"
                    required
                    placeholder="E.g John Doe"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mb-3" controlId="email">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    value={email}
                    type="email"
                    required
                    placeholder="E.g steezdoe@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mb-3" controlId="password">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mb-3" controlId="confirmpassword">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>

                <div className="mb-3">
                  <button type="submit" className="button__primary_icon">
                    <span>Update</span>
                    <Icon icon="dashicons:update" />
                  </button>
                </div>
                {loadingUpdate && <LoadingBox />}
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </Helmet>
  );
}

export default Profile;
