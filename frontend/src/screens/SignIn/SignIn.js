import React, { useContext, useState } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';

import '../../App.css';
import './SignIn.css';
import Helmet from '../../components/Helmet';
import axios from 'axios';
import { Store } from '../../Store';
import { useEffect } from 'react';
import { getError } from '../../utils.js';

function SignIn() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [see, setSee] = useState(true);
  const [textPass, setTextPass] = useState('password');
  const [type, setType] = useState(false);

  const See = () => {
    if (textPass === 'password') {
      setTextPass('text');
      setSee(false);
      setType(true);
    } else {
      setTextPass('password');
      setSee(true);
      setType(false);
    }
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));

      toast.success(`User updated to ${data.name}`, {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Helmet title="Sign In">
      <div className="sign__in container d-flex flex-column align-items-center justify-content-center">
        <h1 className="my-5">Sign In</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup className="mb-3" controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              required
              placeholder="E.g steezdoe@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="password">
            <FormLabel>Password</FormLabel>
            <div className="password__group">
              <FormControl
                type={textPass}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Icon
                onClick={See}
                icon={see ? 'ic:outline-remove-red-eye' : 'mdi:eye-off-outline'}
              />
            </div>
          </FormGroup>
          <div className="mb-3">
            <button type="submit" className="button__primary_icon">
              <span>Sign In</span>
              <Icon icon="material-symbols:arrow-right-alt-rounded" />
            </button>
          </div>
          <div className="mb-3">
            New customer?{' '}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
        </Form>
      </div>
    </Helmet>
  );
}

export default SignIn;
