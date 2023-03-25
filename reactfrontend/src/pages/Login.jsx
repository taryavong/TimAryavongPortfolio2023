import React from 'react';
import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa';
import { login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({ // state allows you to store and manage the data in this component
    email: '',
    password: '',
  }); 

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message);
    };

    if(isSuccess || user) {
      navigate('/');
    };

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => { //any changed parameter gets placed in e
    setFormData((prevState) => ({ //setting the form data to an object
      ...prevState, // the ellipsis will spread data to other form values
      [e.target.name] : e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if(isLoading) {
    return <Spinner />
  };

  return(
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Login and create blogs</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email' 
              className='form-control' 
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password' 
              className='form-control' 
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Login;