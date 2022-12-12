import React from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

import '../../App.css';
import './SignIn.css';
import Helmet from '../../components/Helmet';

function SignIn() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  return (
    <Helmet title="Sign In">
      <div className="sign__in container d-flex flex-column align-items-center justify-content-center">
        <h1 className="my-5">Sign In</h1>
        <Form>
          <FormGroup className="mb-3" controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              required
              placeholder="E.g steezdoe@example.com"
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl type="password" required />
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
