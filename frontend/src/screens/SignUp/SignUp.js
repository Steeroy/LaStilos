import React, { useContext, useState } from 'react';
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';

import '../../App.css';
import './SignUp.css';
import Helmet from '../../components/Helmet';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';

function SignUp() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [imgUrl, setImgUrl] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [see, setSee] = useState(true);
  const [textPass, setTextPass] = useState('password');

  const See = () => {
    if (textPass === 'password') {
      setTextPass('text');
      setSee(false);
    } else {
      setTextPass('password');
      setSee(true);
    }
  };

  const { dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append('file', image);

      const presetString = await axios.get('/api/preset');

      formdata.append('upload_preset', presetString.data);

      await axios
        .post(
          'https://api.cloudinary.com/v1_1/dxpeznnto/image/upload',
          formdata
        )
        .then((response) => {
          setImgUrl(response.data.url);
        });

      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password,
        imgUrl,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));

      toast.success(`Signed in as ${data.name}`, {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate(redirect);
    } catch (err) {
      toast.error(getError(err), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <Helmet title="Sign In">
      <div className="sign__in container d-flex flex-column align-items-center justify-content-center">
        <h1 className="my-5">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup className="mb-3" controlId="profile-image">
            <FormLabel>Profile Image</FormLabel>
            <FormControl
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              required
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="name">
            <FormLabel>Fullname</FormLabel>
            <FormControl
              type="text"
              required
              placeholder="E.g John Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
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
              <span>Sign Up</span>
              <Icon icon="material-symbols:arrow-right-alt-rounded" />
            </button>
          </div>
          <div className="mb-3">
            Have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
          </div>
        </Form>
      </div>
    </Helmet>
  );
}

export default SignUp;
